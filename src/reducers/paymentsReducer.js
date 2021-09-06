import * as actionTypes from 'actionTypes';

const INITIAL_STATE = {
  invoices: [],
  loading: false,
  error: {
    status: false,
    message: ''
  },
  sortParams: {
    order: 'asc',
    key: 'Default',
    type: null,
  },
  filter: 'urgent',
  searchTerm: '',
  paginationParams: {
    currentPage: 0,
    rowsPerPage: 10
  },
  selectedInvoices: [],
  customFilters: {
    overdue: false,
    rejected: false,
    overdueSoon: false,
    withComments: false,
    withWarnings: false,
    accountingDate: {
      start: null,
      end: null
    },
    paymentDate: {
      start: null,
      end: null
    }
  },
  updateParams: {
    updateMessages: [],
    popupOpen: false
  },
  paidParams: {
    paidMessages: [],
    popupOpen: false
  },
  checkDateParams: {
    data: null,
    popupOpen: false
  },
  updateDateParams: {
    updateMessages: [],
    popupOpen: false
  },
  isPayNow: 'paytoduedate',
  editAccountingDate: null
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.FETCH_PAYMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
          message: ''
        },
      }
    case actionTypes.FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        paginationParams: {
          currentPage: 0,
          rowsPerPage: 10
        },
        invoices: action.payload,
        selectedInvoices: [],
        loading: false
      }
    case actionTypes.PAYMENTS_REQUEST_FAILED:
      return {
        ...state,
        error: {
          status: true,
          message: action.payload || ''
        },
        loading: false
      }
    case actionTypes.INIT_PAYMENTS_ERROR:
      return {
        ...state,
        error: {
          status: false,
          message: ''
        }
      }
    case actionTypes.SET_AMOUNT_OF_PAYMENTS_PER_PAGE:
      return {
        ...state,
        paginationParams: {
          ...state.paginationParams,
          rowsPerPage: action.payload
        }
      }
    case actionTypes.SET_CURRENT_PAYMENTS_PAGE:
      return {
        ...state,
        paginationParams: {
          ...state.paginationParams,
          currentPage: action.payload
        }
      }
    case actionTypes.SET_PAYMENTS_SORT_PARAMS:
      return {
        ...state,
        sortParams: action.payload
      }
    case actionTypes.INIT_PAYMENTS_SORT_PARAMS:
      return {
        ...state,
        sortParams: {
          order: 'asc',
          key: 'Default',
          type: null,
        },
      }
    case actionTypes.SET_PAYMENTS_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
        paginationParams: {
          ...state.paginationParams,
          currentPage: 0
        }
      }
    case actionTypes.SELECT_PAYMENT:
      return {
        ...state,
        selectedInvoices: action.payload,
      }
    case actionTypes.SELECT_ALL_PAYMENTS:
      return {
        ...state,
        selectedInvoices: action.payload
      }
    case actionTypes.SET_PAYMENTS_FILTER:
      return {
        ...state,
        filter: action.payload,
        paginationParams: {
          ...state.paginationParams,
          currentPage: 0
        }
      }
    case actionTypes.INIT_PAYMENTS_FILTER:
      return {
        ...state,
        filter: 'urgent'
      }
    case actionTypes.SET_PAYMENTS_FILTER_CONFIG:
      return {
        ...state,
        customFilters: {...action.payload},
        paginationParams: {
          ...state.paginationParams,
          currentPage: 0
        }
      }
    case actionTypes.UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        updateParams: {
          updateMessages: action.payload,
          popupOpen: true
        }
      }
    case actionTypes.INIT_UPDATE_MESSAGES:
      return {
        ...state,
        updateParams: {
          ...state.updateParams,
          popupOpen: false
        }
      }
    case actionTypes.SELECT_ALL_INVOICES:
      return {
        ...state,
        selectedInvoices: action.payload
      }
    case actionTypes.SET_MESSAGES_TO_PAID_PARAMS:
      return {
        ...state,
        paidParams: {
          popupOpen: false,
          paidMessages: action.payload
        }
      }
    case actionTypes.PAY_INVOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        paidParams: {
          paidMessages: action.payload,
          popupOpen: true
        }
      }
    case actionTypes.INIT_PAID_PARAMS:
      return {
        ...state,
        paidParams: {
          ...state.paidParams,
          popupOpen: false
        }
      }
    case actionTypes.CHECK_DATE_SUCCESS:
      return {
        ...state,
        loading: false,
        checkDateParams: {
          data: action.payload,
          popupOpen: true
        }
      }
    case actionTypes.INIT_CHECK_DATE_PARAMS:
      return {
        ...state,
        checkDateParams: {
          ...state.checkDateParams,
          popupOpen: false
        }
      }
    case actionTypes.INIT_PAYMENTS_PAGINATION_PARAMS:
      return {
        ...state,
        paginationParams: {
          ...state.paginationParams,
          currentPage: 0
        }
      }
    case actionTypes.REFRESH_PAYMENT_INVOICE:
      return {
        ...state,
        sortParams: {
          order: 'asc',
          key: 'Default',
          type: null,
        },
        filter: 'urgent',
        searchTerm: '',
        paginationParams: {
          currentPage: 0,
          rowsPerPage: 10
        },
        selectedInvoices: [],
        customFilters: {
          overdue: false,
          rejected: false,
          overdueSoon: false,
          withComments: false,
          withWarnings: false,
          accountingDate: {
            start: null,
            end: null
          },
          paymentDate: {
            start: null,
            end: null
          }
        },
        isPayNow: 'paynow'
      }
    case actionTypes.SET_PAY_NOW_STATUS:
      return {
        ...state,
        isPayNow: action.payload
      }
    case actionTypes.SHOW_UPDATE_DATE_ERROR_POPUP:
      return {
        ...state,
        updateDateParams: {
          updateMessages: action.payload,
          popupOpen: true
        }
      }
    case actionTypes.HIDE_UPDATE_DATE_ERROR_POPUP:
      return {
        ...state,
        updateDateParams: {
          ...state.updateDateParams,
          popupOpen: false
        }
      }
    case actionTypes.SET_PAYMENTS_EDIT_ACCOUNTING_DATE:
      return {
        ...state,
        editAccountingDate: action.payload
      }
    case actionTypes.DISABLE_PAYMENTS_LOADING:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}