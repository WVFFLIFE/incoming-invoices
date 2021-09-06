import * as actionTypes from 'actionTypes';

const INITIAL_STATE = {
  paidStatusParams: {
    responses: [],
    open: false
  },
  rejectedByUserParams: {
    responses: [],
    open: false
  }
}

export default function modalsReducer(
  state = INITIAL_STATE,
  action
) {
  switch (action.type) {
    case actionTypes.OPEN_REJECTED_BY_USER_MODAL:
      return {
        ...state,
        rejectedByUserParams: {
          ...state.rejectedByUserParams,
          open: true
        }
      }
    case actionTypes.SET_REJECTED_BY_USER_RESPONSE:
      return {
        ...state,
        rejectedByUserParams: {
          ...state.rejectedByUserParams,
          responses: action.payload
        }
      }
    case actionTypes.CLOSE_REJECTED_BY_USER_MODAL:
      return {
        ...state,
        rejectedByUserParams: {
          ...state.rejectedByUserParams,
          open: false
        }
      }
    case actionTypes.OPEN_PAID_STATUS_MODAL:
      return {
        ...state,
        paidStatusParams: {
          ...state.paidStatusParams,
          open: true
        }
      }
    case actionTypes.SET_PAID_STATUS_RESPONSE:
      return {
        ...state,
        paidStatusParams: {
          ...state.paidStatusParams,
          responses: action.payload
        }
      }
    case actionTypes.CLOSE_PAID_STATUS_MODAL:
      return {
        ...state,
        paidStatusParams: {
          ...state.paidStatusParams,
          open: false
        }
      }
    default:
      return state;
  }
}