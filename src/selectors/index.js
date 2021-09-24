import { createSelectorCreator, defaultMemoize, createSelector } from 'reselect';
import _ from 'lodash';
import {
  isAfter,
  isBefore,
  isTomorrow,
  endOfMonth,
  endOfWeek,
  isToday,
  isThisWeek,
  isThisMonth,
  isThisYear,
  isSameDay,
  isWithinInterval,
  startOfDay,
  endOfDay
} from 'date-fns';
import {
  searchByType,
  orderByType,
  isRejectedInvoice,
  isBalanceInadequate,
  isOverdue,
  isOverdueSoon,
  isUrgentDate,
  findBankAccount,
  initTime
} from 'helpers';

const paymentSearchConfig = [
  { key: 'Payer.Name', type: 'string', options: null },
  { key: 'Seller', type: 'string', options: null },
  { key: 'DueDate', type: 'date', options: null },
  { key: 'Amount', type: 'float', options: null },
  { key: 'BankAccounts', type: 'array', options: { comparator: 'BuyerBankAccountId', extractKey: 'Name' } },
  { key: 'InvoiceNumber', type: 'string', options: null },
  { key: 'InvoiceStatus.Label', type: 'string', options: null },
  { key: 'InvoiceDate', type: 'string', options: null },
  { key: 'AccountingDate', type: 'date', options: null },
  { key: 'Comment', type: 'string', options: null }
]

const getCooperativesGroup = cooperatives => {
  return _.reduce(cooperatives, (acc, next) => {
    const flag = isBalanceInadequate(next);

    if (flag) {
      acc.inadequate.push(next);
    } else {
      acc.adequate.push(next);
    }

    return acc;

  }, {
    adequate: [],
    inadequate: []
  });
}

// Balances

const filterAll = el => el;
const filterByInadequateBalance = el => {
  if (el.UrgentBalance === 0) return;

  if (typeof el?.AllowedBalance === 'number') {
    return el.AllowedBalance < el.UrgentBalance
  }

  if (typeof el?.Balance === 'number') {
    return el.Balance < el.UrgentBalance
  }

  return el;
}

function filterByPaymentSearchTerm(config, el, searchTerm) {
  return config.some(({ key, type, options }) => {
    return searchByType(
      _.get(el, key),
      type,
      _.get(el, options?.comparator),
      options?.extractKey
    ).includes(
      _.toLower(searchTerm)
    )
  })
}

function filterBySearchTerm(el, field, searchTerm) {
  return _
    .toLower(
      _.get(el, field)
    )
    .includes(
      _.toLower(searchTerm)
    )
}

function getCooperativesFilterFn(filter) {
  switch (filter) {
    case 'all':
      return filterAll
    case 'inadequateBalance':
      return filterByInadequateBalance
    default:
      return filterAll
  }
}

// Settings
export const selectedCooperativeSelector = state => state.settings.selectedCooperatives;
export const currentTabSelector = state => state.settings.currentTab;

// cooperatives
export const paginationParamsBalancesSelector = state => state.balances.paginationParams;
export const cooperativesSelector = state => state.balances.cooperatives;
export const sortBalancesSelector = state => state.balances.sortParams;
export const loadingBalancesSelector = state => state.balances.loading;
export const filterBalancesSelector = state => state.balances.filter;
export const searchTermBalancesSelector = state => state.balances.searchTerm;
export const substituteSelector = state => state.balances.substitute;
export const balancesErrorSelector = state => state.balances.error;

export const getBalancesError = createSelector(
  balancesErrorSelector,
  error => error
)

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
);

export const getCooperativesOptions = createSelector(
  cooperativesSelector,
  currentTabSelector,
  (cooperatives, currentTab) => {
    let mapedCooperatives = _.map(cooperatives, function (cooperative) {
      return _.omit(
        cooperative,
        'BankAccounts'
      )
    });

    return currentTab === 'payment'
      ? _.orderBy(
        mapedCooperatives,
        [
          c => isBalanceInadequate(c),
          c => _.toLower(c.Name)
        ],
        [
          'desc',
          'asc'
        ]
      )
      : currentTab === 'paid'
        ? _.orderBy(
          mapedCooperatives,
          [c => _.toLower(c.Name)],
          ['asc']
        )
        : mapedCooperatives
  }
)

const defaultSortInadequateBalance = cooperatives => {
  return _.orderBy(
    cooperatives,
    [c => _.toLower(c.Name)],
    ['asc']
  )
}

const defaultSortAdequateBalance = cooperatives => {
  return (
    _.orderBy(
      cooperatives,
      [
        c => c.UrgentBalance,
        c => _.toLower(c.Name)
      ],
      [
        'desc',
        'asc'
      ]
    )
  )
}

const sortList = (list, sort) => {
  return _.orderBy(
    list,
    c => orderByType(_.get(c, sort.key), sort.type),
    [sort.order || 'asc']
  )
}

const getSortedCooperatives = createDeepEqualSelector(
  cooperativesSelector,
  sortBalancesSelector,
  (cooperatives, sort) => {
    const { adequate, inadequate } = getCooperativesGroup(cooperatives)

    return sort.key === 'Default'
      ? [
        ...defaultSortInadequateBalance(inadequate),
        ...defaultSortAdequateBalance(adequate)
      ]
      : sortList(cooperatives, sort)
  }
)

const getFilteredCooperatives = createDeepEqualSelector(
  getSortedCooperatives,
  filterBalancesSelector,
  searchTermBalancesSelector,
  (cooperatives, filter, searchTerm) => {
    const filterFn = getCooperativesFilterFn(filter);
    return cooperatives.filter(cooperative => (
      filterFn(cooperative) && filterBySearchTerm(cooperative, 'Name', searchTerm)
    ));
  }
)

export const getCooperatives = createDeepEqualSelector(
  getFilteredCooperatives,
  paginationParamsBalancesSelector,
  (cooperatives, paginationParams) => {
    const { currentPage, rowsPerPage } = paginationParams;

    return cooperatives
      .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
  }
)

export const getSelectedSubstitute = createDeepEqualSelector(
  substituteSelector,
  (substitute) => substitute.value
)

export const getTotalCooperativesItemsSelector = createSelector(
  getFilteredCooperatives,
  (cooperatives) => cooperatives.length
)

// Payments
const filterByOverdueStatus = el => isOverdue(new Date(), new Date(el.DueDate));
const filterByRejectedStatus = el => isRejectedInvoice(el);
const filterByOverdueSoon = el => isOverdueSoon(new Date(el.DueDate));
const filterByComents = el => Boolean(el.Comment);
const filterByWarnings = el => {
  const validation = el.Validation ? el.Validation[0] : null;

  return validation ? validation.ResponseCode === 2 || validation.ResponseCode === 3 : false
}
const filterByAccountingDate = (invoice, { start, end }) => {
  if (!invoice.AccountingDate) {
    return false;
  }

  if (start) {
    if (end) {
      return isWithinInterval(
        new Date(invoice.AccountingDate),
        { start: startOfDay(start), end: endOfDay(end) }
      )
    }

    return isSameDay(new Date(invoice.AccountingDate), initTime(start))
  }

  return true;
}

const filterByPaymentDate = (invoice, { start, end }) => {
  if (!invoice.PaymentDate) {
    return false
  }

  if (start) {
    if (end) {
      return isWithinInterval(
        new Date(invoice.PaymentDate),
        { start: startOfDay(start), end: endOfDay(end) }
      )
    }

    return isSameDay(new Date(invoice.PaymentDate), initTime(start))
  }

  return true;
} 

function getPaymentsFilterFn(filter) {
  switch (filter) {
    case 'all':
      return () => true
    case 'urgent':
      return (el) => {
        return isUrgentDate(new Date(), new Date(el.DueDate))
      }
    case 'upToTomorrow':
      return el => {
        return isTomorrow(new Date(el.DueDate)) || isAfter(new Date(), new Date(el.DueDate))
      }
    case 'endOfMonth':
      return el => {
        return isBefore(new Date(el.DueDate), endOfMonth(new Date()));
      }
    case 'endOfWeek':
      return el => {
        return isBefore(new Date(el.DueDate), endOfWeek(new Date()))
      }
    default:
      return filterAll
  }
}

const invoicesSelector = state => state.payments.invoices;
export const paginationParamsPaymentsSelector = state => state.payments.paginationParams;
export const loadingPaymentsSelector = state => state.payments.loading;
export const sortPaymentsSelector = state => state.payments.sortParams;
export const searchTermPaymentsSelector = state => state.payments.searchTerm;
export const selectedInvoicesSelector = state => state.payments.selectedInvoices;
export const filterPaymentsSelector = state => state.payments.filter;
export const customPaymentsFiltersSelector = state => state.payments.customFilters;
export const updateMessagesSelector = state => state.payments.updateParams;
export const paidParamsSelector = state => state.payments.paidParams;
export const checkDateParamsSelector = state => state.payments.checkDateParams;
export const updateDateParamsSelector = state => state.payments.updateDateParams;
export const getPaymentsError = state => state.payments.error;

export const isEditDisabledSelector = createSelector(
  invoicesSelector,
  selectedInvoicesSelector,
  (invoices, selectedInvoices) => {
    return selectedInvoices.some(selectedInvoice => {
      const currentInvoice = invoices.find(invoice => invoice.Id === selectedInvoice) || null;

      return currentInvoice?.AllowedEdit === false
    })
  }
)

export const isPayDisabledSelector = createDeepEqualSelector(
  invoicesSelector,
  selectedInvoicesSelector,
  (invoices, selectedInvoices) => {
    return selectedInvoices.some(selectedInvoice => {
      const currentInvoice = invoices.find(invoice => invoice.Id === selectedInvoice) || null;

      return currentInvoice?.AllowedPay === false
    })
  }
)

export const getUpdateParams = createDeepEqualSelector(
  invoicesSelector,
  updateMessagesSelector,
  (invoices, updateParams) => {
    const { updateMessages, popupOpen } = updateParams;
    return {
      popupOpen,
      updateMessages: updateMessages
        .filter(updateMessage => !updateMessage.IsUpdated)
        .map(updateMessage => {
          const invoice = invoices.find(invoice => invoice.Id === updateMessage.Id);

          return {
            ...updateMessage,
            Data: {
              Name: invoice.Payer?.Name,
              Description: invoice.Seller,
              DueDate: invoice.DueDate,
              Amount: invoice.Amount
            }
          }
        })
    }
  }
)

export const getFilteredPaymentsByCooperatives = createDeepEqualSelector(
  invoicesSelector,
  selectedCooperativeSelector,
  (invoices, selectedCooperatives) => {
    return invoices.filter(invoice => _.some(selectedCooperatives, { Id: invoice.Payer.Id }))
  }
)

const defaultSortPayments = payments => {
  return _.orderBy(
    payments,
    [
      c => _.toLower(c.Payer.Name),
      c => c.DueDate ? new Date(c.DueDate).getTime() : -Infinity,
    ],
    [
      'asc',
      'asc',
    ]
  )
}

export const getSortedPayments = createDeepEqualSelector(
  getFilteredPaymentsByCooperatives,
  sortPaymentsSelector,
  (payments, sort) => {
    if (sort) {
      return sort.key === 'Default'
        ? defaultSortPayments(payments)
        : sortList(payments, sort)
    }
  }
)

export const getTotalSelectedAmount = createSelector(
  invoicesSelector,
  selectedInvoicesSelector,
  (invoices, selectedInvoices) => {
    return invoices.reduce((acc, next) => {
      if (
        selectedInvoices.includes(next.Id) &&
        typeof next?.Amount === 'number'
      ) {
        return Number(parseFloat(acc + next.Amount).toFixed(2));
      } else {
        return Number(parseFloat(acc + 0).toFixed(2));
      }
    }, 0);
  }
)

export const getPaymentError = createSelector(
  invoicesSelector,
  selectedInvoicesSelector,
  selectedCooperativeSelector,
  (invoices, selectedInvoices, selectedCooperatives) => {
    const isNotSelectedBankAccount = invoice => !invoice.BuyerBankAccountId;

    if (selectedCooperatives.length === 1 && selectedInvoices.length) {
      const selectedInvoicesData = invoices.filter(invoice => selectedInvoices.includes(invoice.Id));

      if (_.some(selectedInvoicesData, isNotSelectedBankAccount)) {
        return true;
      } else {
        const accounts = selectedInvoicesData.reduce((acc, next) => {
          const currentBankAccount = findBankAccount(next.BuyerBankAccountId, next.BankAccounts);
          const bankAccountBalance = currentBankAccount.AllowedBalance || currentBankAccount.Balance;
          const { Id } = currentBankAccount;

          if (_.has(acc, Id)) {
            acc[Id] = {
              ...acc[Id],
              Amount: parseFloat(acc[Id].Amount + next.Amount)
            }
          } else {
            acc[Id] = {
              Amount: next.Amount,
              Balance: bankAccountBalance
            }
          }
          return acc;
        }, {});
        
        return _.some(accounts, account => account.Amount > account.Balance)
      }
    }

    return false;
  }
)

const getCustomPaymentsFilter = createDeepEqualSelector(
  getSortedPayments,
  customPaymentsFiltersSelector,
  (invoices, customFilters) => {
    return invoices.filter(invoice => {
      let res = [];

      if (customFilters.overdue) {
        res.push(
          filterByOverdueStatus(invoice)
        )
      }

      if (customFilters.rejected) {
        res.push(
          filterByRejectedStatus(invoice)
        )
      }

      if (customFilters.overdueSoon) {
        res.push(
          filterByOverdueSoon(invoice)
        )
      }

      if (customFilters.withComments) {
        res.push(
          filterByComents(invoice)
        )
      }

      if (customFilters.withWarnings) {
        res.push(
          filterByWarnings(invoice)
        )
      }

      if (customFilters.accountingDate.start) {
        res.push(
          filterByAccountingDate(invoice, customFilters.accountingDate)
        )
      }

      if (customFilters.paymentDate.start) {
        res.push(
          filterByPaymentDate(invoice, customFilters.paymentDate)
        )
      }

      return res.length === 0 ? true : res.some(o => o === true)
    })
  }
)

export const getFilteredPayments = createDeepEqualSelector(
  getCustomPaymentsFilter,
  searchTermPaymentsSelector,
  filterPaymentsSelector,
  (invoices, searchTerm, filter) => {
    const filterFn = getPaymentsFilterFn(filter);

    return invoices.filter(invoice => {
      return filterByPaymentSearchTerm(paymentSearchConfig, invoice, searchTerm) && filterFn(invoice)
    })
  }
)

const defaultSortingSelector = (state) => state.payments.defaultSorting;
const defaultSortedInvoices = createDeepEqualSelector(
  getFilteredPayments,
  (invoices) => {
    console.log(invoices, "INVOICES DEFAULT SORTED");
    let rejectedWithComment = [], 
      rejected = [],
      withComment = [],
      others = [];

    for (let invoice of invoices) {
      if (
        isRejectedInvoice(invoice) &&
        invoice.Comment
      ) {
        rejectedWithComment.push(invoice);
        continue;
      }

      if (isRejectedInvoice(invoice)) {
        rejected.push(invoice);
        continue;
      }

      if (invoice.Comment) {
        withComment.push(invoice);
        continue;
      }
      
      others.push(invoice);
    };

    console.log(rejectedWithComment, rejected, withComment, others);

    return _.concat(
      _.orderBy(
        rejectedWithComment,
        (invoice) => orderByType(_.get(invoice, 'DueDate'), 'date'),
        ['asc']
      ),
      _.orderBy(
        rejected,
        (invoice) => orderByType(_.get(invoice, 'DueDate'), 'date'),
        ['asc']
      ),
      _.orderBy(
        withComment,
        (invoice) => orderByType(_.get(invoice, 'DueDate'), 'date'),
        ['asc']
      ),
      _.orderBy(
        others,
        [
          (invoice) => orderByType(_.get(invoice, 'Payer.Name'), 'string'),
          (invoice) => orderByType(_.get(invoice, 'DueDate'), 'date'),
        ],
        ['asc', 'asc']
      )
    )
  }
)

export const getPayments = createDeepEqualSelector(
  getFilteredPayments,
  defaultSortedInvoices,
  defaultSortingSelector,
  paginationParamsPaymentsSelector,
  (invoices, defaultInvoices, defaultSorting, paginationParams) => {
    const { currentPage, rowsPerPage } = paginationParams;

    let currentInvoices = defaultSorting
      ? defaultInvoices
      : invoices;

    return currentInvoices
      .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
  }
);

export const getPaymentsAbleToSelect = createDeepEqualSelector(
  getFilteredPayments,
  payments => {
    return payments
      .filter(payment => {
        return !isBalanceInadequate(payment.RelatedCooperative) && (payment.AllowedEdit || payment.AllowedPay)
      })
      .map(payment => payment.Id)
  }
)

export const getTotalPaymentsItemsSelector = createSelector(
  getFilteredPayments,
  invoices => invoices.length
)

export const getClosedPeriodEndDate = createSelector(
  selectedCooperativeSelector,
  cooperatives => {
    if (_.size(cooperatives) === 1) {
      let currentCooperative = _.map(cooperatives)[0];
      return currentCooperative?.ClosedPeriodEndDate
        ? new Date(currentCooperative.ClosedPeriodEndDate)
        : null;
    }

    return null;
  }
)

// Paid Invoices

function getPaidInvoicesFilterFn(filter) {
  switch (filter) {
    case 'all':
      return el => el
    case 'today':
      return el => el.PaymentDate ? isToday(new Date(el.PaymentDate)) : false
    case 'thisWeek':
      return el => el.PaymentDate ? isThisWeek(new Date(el.PaymentDate)) : false
    case 'thisMonth':
      return el => el.PaymentDate ? isThisMonth(new Date(el.PaymentDate)) : false
    case 'thisYear':
      return el => el.PaymentDate ? isThisYear(new Date(el.PaymentDate)) : false
    case 'future':
      return el => el.PaymentDate ? isAfter(new Date(el.PaymentDate), new Date()) : false
    default:
      return el => el
  }
}

const filterByPaidStatus = el => el.InvoiceStatus.Value === 100000003;
const filterByPendingStatus = el => el.InvoiceStatus.Value === 100000001;

const paidInvoiceSelector = state => state.paidInvoices.data;
export const paidInvoicesPaginationParamsSelector = state => state.paidInvoices.paginationParams;
export const loadingPaidInvoicesSelector = state => state.paidInvoices.loading;
export const sortPaidInvoicesSelector = state => state.paidInvoices.sortParams;
export const searchTermPaidInvoicesSelector = state => state.paidInvoices.searchTerm;
export const paidInvoicesFilterSelector = state => state.paidInvoices.filter;

export const customPaidInvoicesFiltersSelector = state => state.paidInvoices.customFilters;

export const getFilteredPaidInvoicesByCooperatives = createDeepEqualSelector(
  paidInvoiceSelector,
  selectedCooperativeSelector,
  (paidInvoices, selectedCooperatives) => {
    if (!selectedCooperatives.length) {
      return [];
    }
    return paidInvoices.filter(invoice => {
      return selectedCooperatives && selectedCooperatives.length > 0
        ? _.find(selectedCooperatives, { Id: invoice.Payer.Id })
        : true
    })
  }
)

const getCustomPaidInvoicesFilter = createDeepEqualSelector(
  getFilteredPaidInvoicesByCooperatives,
  customPaidInvoicesFiltersSelector,
  (paidInvoices, customFilters) => {
    return paidInvoices.filter(paidInvoice => {
      let res = [];

      if (customFilters.pending) {
        res.push(
          filterByPendingStatus(paidInvoice)
        )
      }

      if (customFilters.rejected) {
        res.push(
          filterByRejectedStatus(paidInvoice)
        )
      }

      if (customFilters.paid) {
        res.push(
          filterByPaidStatus(paidInvoice)
        )
      }

      if (customFilters.withComments) {
        res.push(
          filterByComents(paidInvoice)
        )
      }

      if (customFilters.accountingDate.start) {
        if (
          paidInvoice.InvoiceStatus?.Value === 100000001 ||
          paidInvoice?.InvoiceStatus?.Value === 100000003
        ) {
          res.push(
            filterByAccountingDate(paidInvoice, customFilters.accountingDate)
          )
        }
        
      }

      if (customFilters.paymentDate.start) {
        if (
          paidInvoice?.InvoiceStatus?.Value === 100000001 ||
          paidInvoice?.InvoiceStatus?.Value === 100000003
        ) {
          res.push(
            filterByPaymentDate(paidInvoice, customFilters.paymentDate)
          )
        }
      }

      return res.length === 0 ? true : res.some(o => o === true)
    })
  }
)

const getFilteredPaidInvoices = createDeepEqualSelector(
  getCustomPaidInvoicesFilter,
  paidInvoicesFilterSelector,
  searchTermPaidInvoicesSelector,
  (paidInvoices, filter, searchTerm) => {
    const filterFn = getPaidInvoicesFilterFn(filter);

    return paidInvoices.filter(paidInvoice => (
      filterFn(paidInvoice) && 
      filterByPaymentSearchTerm(paymentSearchConfig, paidInvoice, searchTerm)
    ));
  }
)

const getSortedPaidInvoices = createDeepEqualSelector(
  getFilteredPaidInvoices,
  sortPaidInvoicesSelector,
  (paidInvoices, sort) => {
    if (sort) {
      return _.orderBy(
        paidInvoices,
        c => orderByType(_.get(c, sort.key), sort.type),
        [sort.order || 'asc']
      )
    }
  }
)

export const getPaidInvoices = createDeepEqualSelector(
  getSortedPaidInvoices,
  paidInvoicesPaginationParamsSelector,
  (paidInvoices, paginationParams) => {
    const { currentPage, rowsPerPage } = paginationParams;

    return paidInvoices
      .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
  }
)

export const getTotalPaidInvoicesSelector = createSelector(
  getFilteredPaidInvoices,
  paidInvoices => paidInvoices.length
)

export const getPaidError = state => state.paidInvoices.error;

// modals

const rejectedByUserParamsResponsesSelector = state => state.modals.rejectedByUserParams.responses;

export const getVisibilityRejectedByUserModal = state => state.modals.rejectedByUserParams.open;
export const getRejectedInvoices = createDeepEqualSelector(
  rejectedByUserParamsResponsesSelector,
  responses => {
    return responses.map(response => {
      return {
        Id: response.RelatedInvoice.Id,
        Name: response.RelatedInvoice.Payer.Name,
        Amount: response.RelatedInvoice.Amount
      }
    })
  }
)

export const getPaidStatusResponses = state => state.modals.paidStatusParams.responses
export const getVisibilityPaidStatusModal = state => state.modals.paidStatusParams.open;