import * as actionTypes from 'actionTypes';
import HttpClient from 'services';
import get from 'lodash/get';
import {batch} from 'react-redux';
import {setSelectedCooperative} from './settingsActions';

export const fetchPaidInvoices = () => {
  return (dispatch, getState) => {
    const {substitute} = getState().balances;
    dispatch({ type: actionTypes.FETCH_PAID_INVOICES_REQUEST })

    HttpClient
      .getPaidInvoices(substitute.value?.Id)
      .then(data => {
        const { IsSuccess, Error, PurchaseInvoices } = data;

        console.log(data);

        if (IsSuccess) {
          dispatch({
            type: actionTypes.FETCH_PAID_INVOICES_SUCCESS,
            payload: PurchaseInvoices
          })
        } else {
          dispatch({ type: actionTypes.PAID_REQUEST_FAILED, payload: Error })
        }
      })
      .catch(err => {
        dispatch({ type: actionTypes.PAID_REQUEST_FAILED, payload: `System error: ${err}` })
      })
  }
}

export const changeCurrentPage = (page) => ({
  type: actionTypes.SET_CURRENT_PAID_INVOICES_PAGE,
  payload: page - 1
})

export const changeRowsPerPage = (rowsPerPage) => ({
  type: actionTypes.SET_AMOUNT_OF_PAID_INVOICES_PER_PAGE,
  payload: rowsPerPage
})

export const setSortParams = (sortKey, sortType = 'string') => {
  return (dispatch, getState) => {
    const { sortParams } = getState().paidInvoices;
    const order = get(sortParams, 'order');

    dispatch({
      type: actionTypes.SET_PAID_INVOICES_SORT_PARAMS,
      payload: {
        key: sortKey,
        order: order === 'desc' ? 'asc' : 'desc',
        type: sortType
      }
    })
  }
}

export const setSearchTerm = searchTerm => ({
  type: actionTypes.SET_PAID_INVOICES_SEARCH_TERM,
  payload: searchTerm
})

export const setFilter = filter => ({
  type: actionTypes.SET_PAID_INVOICES_FILTER,
  payload: filter
})

export const setCustomFilters = filters => ({
  type: actionTypes.SET_PAID_INVOICES_FILTER_CONFIG,
  payload: filters
})

export const initPaidInvoicePaginationParams = () => ({
  type: actionTypes.INIT_PAID_INVOICE_PAGINATION_PARAMS
})

export const initPaidInvoiceFilter = () => ({
  type: actionTypes.INIT_PAID_INVOICE_FILTER
})

export const refreshPaidInvoice = () => {
  return (dispatch) => {
    batch(() => {
      dispatch({
        type: actionTypes.REFRESH_PAID_INVOCE
      })
      dispatch(setSelectedCooperative([]))
      dispatch(fetchPaidInvoices());
    })
  }
}

export const initPaidSettings = () => ({
  type: actionTypes.REFRESH_PAID_INVOCE
})

export const initPaidError = () => ({
  type: actionTypes.INIT_PAID_ERROR
})