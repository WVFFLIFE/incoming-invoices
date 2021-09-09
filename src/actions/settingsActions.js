import * as actionTypes from 'actionTypes';
import { batch } from 'react-redux';
import {
  initPaymentsPaginationParams,
  setFilter as setPaymentsFilter
} from './paymentsActions';
import {
  initPaidInvoicePaginationParams,
  setFilter as setPaidFilter
} from './paidActions';
import omit from 'lodash/omit';
import map from 'lodash/map';

export const setCurrentTab = (tab, shouldSelectCooperative = true) => {
  return (dispatch, getState) => {
    const { cooperatives } = getState().balances;
    const { selectedCooperatives } = getState().settings;

    console.log(selectedCooperatives, shouldSelectCooperative);

    batch(() => {
      if (shouldSelectCooperative) {

        if (tab === 'balances') {
          dispatch({
            type: actionTypes.SELECT_COOPERATIVE,
            payload: []
          })
        }

        if (tab === 'payment') {
          if (selectedCooperatives.length !== 1) {
            dispatch({
              type: actionTypes.SELECT_COOPERATIVE,
              payload: map(cooperatives, cooperative => omit(cooperative, 'BankAccounts'))
            })
          }
        }

        if (tab === 'paid') {
          if (selectedCooperatives.length !== 1) {
            dispatch({
              type: actionTypes.SELECT_COOPERATIVE,
              payload: []
            })
          }
        }
      }

      dispatch({
        type: actionTypes.SET_CURRENT_TAB,
        payload: tab
      })
    })
  }
}

export const setSelectedCooperative = (cooperative) => {
  return (dispatch, getState) => {
    const { filter: paymentFilter } = getState().payments;
    const { filter: paidFilter } = getState().paidInvoices;
    const { currentTab } = getState().settings;

    if (currentTab === 'paid') {
      dispatch(initPaidInvoicePaginationParams())
    }

    if (currentTab === 'payment') {
      dispatch(initPaymentsPaginationParams())
    }

    if (
      cooperative.length > 1 &&
      paymentFilter === 'all' &&
      currentTab === 'payment'
    ) {
      dispatch(setPaymentsFilter('urgent'));
    }

    if (
      cooperative > 1 &&
      paidFilter === 'all' &&
      currentTab === 'paid'
    ) {
      dispatch(setPaidFilter('thisMonth'))
    }

    dispatch({
      type: actionTypes.SELECT_COOPERATIVE,
      payload: cooperative
    })
  }
}