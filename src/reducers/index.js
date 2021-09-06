import { combineReducers } from 'redux';

import balancesReducer from './balancesReducer';
import appReducer from './appReducer';
import paymentsReducer from './paymentsReducer';
import paidInvoicesReducer from './paidInvoicesReducer';
import modalsReducer from './modalsReducer';
import reportReducer from './reportReducer';

export default combineReducers({
  balances: balancesReducer,
  settings: appReducer,
  payments: paymentsReducer,
  paidInvoices: paidInvoicesReducer,
  modals: modalsReducer,
  report: reportReducer
})