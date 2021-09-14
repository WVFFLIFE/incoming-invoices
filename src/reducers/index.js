import { combineReducers } from 'redux';

import balancesReducer from './balancesReducer';
import appReducer from './appReducer';
import paymentsReducer from './paymentsReducer';
import paidInvoicesReducer from './paidInvoicesReducer';
import modalsReducer from './modalsReducer';

export default combineReducers({
  balances: balancesReducer,
  settings: appReducer,
  payments: paymentsReducer,
  paidInvoices: paidInvoicesReducer,
  modals: modalsReducer,
})