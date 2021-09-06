import * as actionTypes from 'actionTypes';

const INITITAL_STATE = {
  currentTab: 'balances',
  selectedCooperatives: []
}

function reducer (state = INITITAL_STATE, action) {
  switch(action.type) {
    case actionTypes.SET_CURRENT_TAB:
      return {
        ...state,
        currentTab: action.payload
      }
    case actionTypes.SELECT_COOPERATIVE:
      return {
        ...state,
        selectedCooperatives: action.payload
      }
    default:
      return state;
  }
}

export default reducer;