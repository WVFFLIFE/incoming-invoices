import {
  BaseInvoiceModel,
  EnhancedBankAccountModel,
} from 'models';

import {
  floatify,
  isPaidInvoice,
  isPendingInvoice,
  isRejectedInvoice,
  isUnpaidInvoice,
  searchByType
} from 'helpers';
import _uniqBy from 'lodash/uniqBy';
import _get from 'lodash/get';
import _toLower from 'lodash/toLower';

interface SearchConfigItem {
  key: string,
  type: 'string' | 'float' | 'date'
}

const invoiceSearchConfig: SearchConfigItem[] = [
  { key: 'Seller', type: 'string', },
  { key: 'InvoiceNumber', type: 'string', },
  { key: 'AccountingDate', type: 'date', },
  { key: 'DueDate', type: 'date', },
  { key: 'PaymentDate', type: 'date', },
  { key: 'Amount', type: 'float', },
];

const bankAccountSearchConfig: SearchConfigItem[] = [
  { key: 'Name', type: 'string'},
  { key: 'Operator.Name', type: 'string' },
  { key: 'Description', type: 'string' },
  { key: 'TotalAmount', type: 'float' },
]

function filterByPaymentSearchTerm<T extends {}>(
  config: SearchConfigItem[], 
  el: T, 
  searchTerm: string
) {
  return config.some(({ key, type }) => {
    let str = searchByType(_get(el, key), type) || '';
    return str.includes(_toLower(searchTerm));
  })
}

function countTotalAmount(invoices: BaseInvoiceModel[]) {
  return invoices.reduce((acc, next) => {
    return floatify(acc + (next.Amount || 0));
  }, 0);
}

function filterByQuickFilter(
  invoice: BaseInvoiceModel,
  quickFilter: string
) {
  switch(quickFilter) {
    case 'pending':
      return isPendingInvoice(invoice);
    case 'paid':
      return isPaidInvoice(invoice);
    case 'rejected':
      return isRejectedInvoice(invoice);
    case 'unpaid':
      return isUnpaidInvoice(invoice);
    default:
      return true;
  }
}

export function filterBankAccountsInvoices(
  bankAccounts: EnhancedBankAccountModel[],
  quickFilter: string,
  searchTerm: string
) {
  return bankAccounts
    .map(bankAccount => {
      const filteredInvoices = bankAccount.Invoices.filter(invoice => {
        return filterByQuickFilter(invoice, quickFilter) && 
          filterByPaymentSearchTerm(invoiceSearchConfig, invoice, searchTerm)
      });

      return {
        ...bankAccount,
        Invoices: filteredInvoices,
        TotalAmount: countTotalAmount(filteredInvoices)
      }
    })
    .filter(bankAccount => {
      if (searchTerm) {
        return bankAccount.Invoices.length || 
          filterByPaymentSearchTerm(bankAccountSearchConfig, bankAccount, searchTerm)
      }

      return true;
    })
}

export function getTotalCounts(
  bankAccounts: EnhancedBankAccountModel[]
) {
  const invoices =
    _uniqBy(bankAccounts.map(bankAccount => bankAccount.Invoices).flat(), 'Id');

  return {
    totalInvoices: invoices.length,
    totalAmount: countTotalAmount(invoices)
  }
}
