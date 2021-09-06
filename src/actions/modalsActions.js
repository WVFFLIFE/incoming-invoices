import * as actionTypes from 'actionTypes';
import find from 'lodash/find';
import { batch } from 'react-redux';
import { fetchPayments } from './paymentsActions';

// rejected by user modal

function setRelatedInvoice(responses, invoices) {
  if (!responses.length) return [];

  return responses.map(response => {
    const currentInvoice = find(invoices, { Id: response.EntityId }) || null;
      return {
        ...response,
        RelatedInvoice: currentInvoice
      } 
  })
}

export const openRejectedByUserModalAction = () => ({
  type: actionTypes.OPEN_REJECTED_BY_USER_MODAL
})

export const setRejectedByUserReponseAction = (payload) => ({
  type: actionTypes.SET_REJECTED_BY_USER_RESPONSE,
  payload
})

export const closeRejectedByUserModalAction = () => ({
  type: actionTypes.CLOSE_REJECTED_BY_USER_MODAL
})

export const openRejectedByUserModal = (responses) => {
  return (dispatch, getState) => {
    const { invoices } = getState().payments;
    const payload = setRelatedInvoice(responses, invoices);

    batch(() => {
      dispatch(setRejectedByUserReponseAction(payload))
      dispatch(openRejectedByUserModalAction());
    }) 
  }
}

export const closeRejectedByUserModal = () => {
  return (dispatch, getState) => {
    const { paidStatusParams } = getState().modals;

    batch(() => {
      dispatch(closeRejectedByUserModalAction());
      if ( paidStatusParams.responses.length ) {
        dispatch(openPaidStatusModal())
      } else {
        dispatch(fetchPayments());
      }
    })
  }
}

// paid status modal

export const openPaidStatusModal = () => ({
  type: actionTypes.OPEN_PAID_STATUS_MODAL
})

export const setPaidStatusResponse = (responses) => {
  return (dispatch, getState) => {
    const { invoices } = getState().payments;
    const payload = setRelatedInvoice(responses, invoices);

    dispatch({
      type: actionTypes.SET_PAID_STATUS_RESPONSE,
      payload
    })
  }
}

const closePaidStatusModalAction = () => ({
  type: actionTypes.CLOSE_PAID_STATUS_MODAL
})

export const closePaidStatusModal = () => {
  return (dispatch) => {
    batch(() => {
      dispatch(closePaidStatusModalAction());
      dispatch(fetchPayments())
    })
  }
}