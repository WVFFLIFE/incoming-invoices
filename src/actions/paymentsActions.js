import * as actionTypes from 'actionTypes';
import HttpClient from 'services';
import {
  get,
  map,
  omit,
  has,
  set,
  size
} from 'lodash';
import { batch } from 'react-redux';
import {
  setRelatedCooperative,
  isDisabledDate,
  toDateResponse
} from 'helpers';
import { 
  openRejectedByUserModal,
  setPaidStatusResponse,
  openPaidStatusModal,
} from './modalsActions';
import {
  fetchCooperatives
} from './balancesActions';

const getFilteredResponses = Responses => {
  let rejectedByUserResponse = [],
      notRejectedByUserResponse = [];

  Responses.forEach(Response => {
    if (Response.MessageCode === 4) {
      rejectedByUserResponse.push(Response)
    } else {
      notRejectedByUserResponse.push(Response)
    }
  })

  return {
    rejectedByUserResponse,
    notRejectedByUserResponse
  }
}

export const fetchPayments = () => {
  return (dispatch, getState) => {
    const { substitute } = getState().balances;
    const { cooperatives } = getState().balances;
    dispatch({ type: actionTypes.FETCH_PAYMENTS_REQUEST });

    HttpClient
      .getPurchaseInvoices(substitute.value?.Id)
      .then(data => {
        const { PurchaseInvoices, IsSuccess, Error } = data;
        
        console.log(PurchaseInvoices);

        if (IsSuccess) {
          dispatch({
            type: actionTypes.FETCH_PAYMENTS_SUCCESS,
            payload: setRelatedCooperative(PurchaseInvoices, cooperatives)
          })
        } else {
          dispatch({ type: actionTypes.PAYMENTS_REQUEST_FAILED, payload: Error })
        }

        dispatch({
          type: actionTypes.FETCH_PAYMENTS_SUCCESS,
          payload: setRelatedCooperative(PurchaseInvoices, cooperatives)
        })
      })
      .catch(err => {
        dispatch({ type: actionTypes.PAYMENTS_REQUEST_FAILED, payload: `System error: ${err}` })
      })
  }
}

export const changeCurrentPage = (page) => ({
  type: actionTypes.SET_CURRENT_PAYMENTS_PAGE,
  payload: page - 1
})

export const changeRowsPerPage = (rowsPerPage) => ({
  type: actionTypes.SET_AMOUNT_OF_PAYMENTS_PER_PAGE,
  payload: rowsPerPage
})

export const setSortParams = (sortKey, sortType = 'string') => {
  return (dispatch, getState) => {
    const { sortParams } = getState().payments;
    const order = get(sortParams, 'order');

    dispatch({
      type: actionTypes.SET_PAYMENTS_SORT_PARAMS,
      payload: {
        key: sortKey,
        order: order === 'desc' ? 'asc' : 'desc',
        type: sortType
      }
    })
  }
}

export const setSearchTerm = searchTerm => ({
  type: actionTypes.SET_PAYMENTS_SEARCH_TERM,
  payload: searchTerm
})

export const setSelectedPayment = selected => {
  return (dispatch, getState) => {
    const { selectedInvoices } = getState().payments;

    if (selectedInvoices.includes(selected)) {
      dispatch({
        type: actionTypes.SELECT_PAYMENT,
        payload: selectedInvoices.filter(invoice => invoice !== selected)
      })
    } else {
      dispatch({
        type: actionTypes.SELECT_PAYMENT,
        payload: [...selectedInvoices, selected]
      })
    }
  }
}

export const selectAllPayments = (payments) => ({
  type: actionTypes.SELECT_ALL_PAYMENTS,
  payload: payments
})

export const setFilter = filter => ({
  type: actionTypes.SET_PAYMENTS_FILTER,
  payload: filter
})

export const setCustomFilters = filters => ({
  type: actionTypes.SET_PAYMENTS_FILTER_CONFIG,
  payload: filters
})

const checkDateBeforeEdit = (newDate, selectedInvoices, invoices) => {
  const currentInvoices = invoices.filter(invoice => selectedInvoices.includes(invoice.Id));
  return currentInvoices.reduce((acc, next) => {
    const { RelatedCooperative } = next;
    const { successList, rejectList } = acc;

    const flag = !isDisabledDate(newDate, new Date(RelatedCooperative?.ClosedPeriodEndDate));

    if (flag) {
      return has(successList, next.Id)
        ? acc
        : {
          ...acc,
          successList: set(successList, next.Id, next)
        }
    } else {
      return has(rejectList, next.Id)
        ? acc
        : {
          ...acc,
          rejectList: set(rejectList, next.Id, next)
        }
    }
  }, {
    successList: {},
    rejectList: {}
  });
}

const requestAccountingDate = (body, date) => {
  return (dispatch, getState) => {
    const { substitute } = getState().balances;

    dispatch({
      type: actionTypes.UPDATE_REQUEST
    })

    HttpClient
      .updateInvoicesAccountingDate(body, toDateResponse(date), substitute?.value?.Id)
      .then(data => {
        const { UpdateMessages, IsSuccess, Error } = data;

        if (IsSuccess) {
          dispatch({
            type: actionTypes.UPDATE_SUCCESS,
            payload: UpdateMessages
          })
        } else {
          dispatch({ type: actionTypes.PAYMENTS_REQUEST_FAILED, payload: Error })
        }
      })
      .catch(err => {
        dispatch({ type: actionTypes.PAYMENTS_REQUEST_FAILED, payload: `System error: ${err}` })
      })
  }
}

export const updateInvoiceAccountingDate = (newDate, id) => {
  return dispatch => {
    dispatch(
      requestAccountingDate(
        [id],
        newDate
      )
    )
  }
}

export const updateInvoicesListAccountingDate = (newDate, checkDate = true) => {
  return (dispatch, getState) => {
    const { selectedInvoices, invoices, editAccountingDate } = getState().payments;
    let { rejectList, successList } = checkDateBeforeEdit(checkDate ? newDate : editAccountingDate, selectedInvoices, invoices);
    if (checkDate) {
      if (size(rejectList)) {
        batch(() => {
          dispatch({
            type: actionTypes.SET_PAYMENTS_EDIT_ACCOUNTING_DATE,
            payload: newDate
          });
          dispatch({
            type: actionTypes.SHOW_UPDATE_DATE_ERROR_POPUP,
            payload: Array.from(new Set(map(rejectList, c => c.RelatedCooperative.Name)))
          })
        })
      } else {
        dispatch(requestAccountingDate(
          selectedInvoices,
          newDate
        ))
      }
    } else {
      if (size(successList)) {
        dispatch(requestAccountingDate(
          Object.keys(successList),
          editAccountingDate
        ))
      }
    }
  }
}

export const initUpdateMessages = () => ({
  type: actionTypes.INIT_UPDATE_MESSAGES
})

export const rejectPayment = (id, comment) => {
  return (dispatch, getState) => {
    const { substitute } = getState().balances;
    dispatch({
      type: actionTypes.UPDATE_REQUEST
    })

    HttpClient
      .rejectInvoice(id, comment, substitute.value?.Id)
      .then(data => {
        const { UpdateMessages, IsSuccess, Error } = data;

        if (IsSuccess) {
          dispatch({
            type: actionTypes.UPDATE_SUCCESS,
            payload: UpdateMessages
          })
        } else {
          dispatch({ type: actionTypes.PAYMENTS_REQUEST_FAILED, payload: Error })
        }
      })
      .catch(err => {
        dispatch({ type: actionTypes.PAYMENTS_REQUEST_FAILED, payload: `System error: ${err}` })
      })
  }
}

export const updateBankAccount = (invoiceId, bankAccountId) => {
  return (dispatch, getState) => {
    const { substitute } = getState().balances;
    dispatch({
      type: actionTypes.UPDATE_REQUEST
    })

    HttpClient
      .updateInvoiceBankAccount(invoiceId, bankAccountId, substitute.value?.Id)
      .then(data => {
        const { UpdateMessages, IsSuccess, Error } = data;

        if (IsSuccess) {
          dispatch({
            type: actionTypes.UPDATE_SUCCESS,
            payload: UpdateMessages
          })
        } else {
          dispatch({ type: actionTypes.PAYMENTS_REQUEST_FAILED, payload: Error })
        }
      })
      .catch(err => {
        dispatch({ type: actionTypes.PAYMENTS_REQUEST_FAILED, payload: `System error: ${err}` })
      })
  }
}

export const selectAllInvoices = (list) => ({
  type: actionTypes.SELECT_ALL_INVOICES,
  payload: list
});

const payInvoicesAction = (selectedInvoices, IsPayNow) => {
  return (dispatch, getState) => {
    const { substitute } = getState().balances;

    HttpClient
      .payInvoices(selectedInvoices, substitute.value?.Id, IsPayNow)
      .then(data => {
        dispatch({ type: actionTypes.DISABLE_PAYMENTS_LOADING })

        const { Responses, IsSuccess, Error } = data;

        if (IsSuccess) {
          const { rejectedByUserResponse, notRejectedByUserResponse } = getFilteredResponses(Responses)
        
          if (rejectedByUserResponse.length) {
            batch(() => {
              dispatch(openRejectedByUserModal(rejectedByUserResponse));
              dispatch(setPaidStatusResponse(notRejectedByUserResponse));
            })
          } else {
            batch(() => {
              dispatch(setPaidStatusResponse(notRejectedByUserResponse));
              dispatch(openPaidStatusModal());
            })
          }

          dispatch(fetchCooperatives());
        } else {
          dispatch({ type: actionTypes.PAYMENTS_REQUEST_FAILED, payload: Error })
        }
      })
      .catch(err => {
        dispatch({ type: actionTypes.PAYMENTS_REQUEST_FAILED, payload: `System error: ${err}` })
      })
  }
}

export const payInvoices = (selectedInvoices, force = false, IsPayNow) => {
  return async (dispatch, getState) => {
    const { substitute } = getState().balances;
    const { checkDateParams } = getState().payments;
    dispatch({
      type: actionTypes.UPDATE_REQUEST
    })

    if (force) {
      const res = checkDateParams.data?.InvoicesIds || [];
      dispatch(payInvoicesAction(Array.from(new Set([...selectedInvoices, ...res])), IsPayNow))
    } else {
      try {
        const checkBalanceDateResponse = await HttpClient.checkBalanceDate(selectedInvoices, substitute.value?.Id);

        if (checkBalanceDateResponse.IsSuccess) {
          if (checkBalanceDateResponse.IsAllUpToDate) {
            dispatch(payInvoicesAction(selectedInvoices, IsPayNow))
          } else {
            dispatch({
              type: actionTypes.CHECK_DATE_SUCCESS,
              payload: checkBalanceDateResponse
            })
          }
        } else {
          dispatch({ type: actionTypes.PAYMENTS_REQUEST_FAILED, payload: checkBalanceDateResponse.Error })
        }
      } catch (err) {
        dispatch({ type: actionTypes.PAYMENTS_REQUEST_FAILED, payload: `System error: ${err}` })
      }
    }
  }
}

export const initPaidParams = () => ({
  type: actionTypes.INIT_PAID_PARAMS
})

export const initCheckDateParams = () => ({
  type: actionTypes.INIT_CHECK_DATE_PARAMS
})

export const initPaymentsPaginationParams = () => ({
  type: actionTypes.INIT_PAYMENTS_PAGINATION_PARAMS
})

export const initPaymentsSortParams = () => ({
  type: actionTypes.INIT_PAYMENTS_SORT_PARAMS
})

export const initPaymentsFilter = () => ({
  type: actionTypes.INIT_PAYMENTS_FILTER
})

export const initPaymentsSettings = () => ({
  type: actionTypes.REFRESH_PAYMENT_INVOICE
})

export const refreshPayments = () => {
  return (dispatch, getState) => {
    const { cooperatives } = getState().balances;

    batch(() => {
      dispatch({
        type: actionTypes.REFRESH_PAYMENT_INVOICE
      })
      dispatch({
        type: actionTypes.SELECT_COOPERATIVE,
        payload: map(cooperatives, cooperative => omit(cooperative, 'BankAccounts'))
      });
      dispatch(fetchPayments());
    })
  }
}

export const setPayNowStatus = (flag) => ({
  type: actionTypes.SET_PAY_NOW_STATUS,
  payload: flag
})

export const hideUpdateDateErrorPopup = () => ({
  type: actionTypes.HIDE_UPDATE_DATE_ERROR_POPUP
})

export const initPaymentsError = () => ({
  type: actionTypes.INIT_PAYMENTS_ERROR
})

export const setDefaultPaymentsSorting = (payload) => ({
  type: actionTypes.SET_DEFAULT_PAYMENTS_SORTING,
  payload,
});