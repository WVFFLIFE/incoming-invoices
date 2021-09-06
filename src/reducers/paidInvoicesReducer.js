import * as actionTypes from 'actionTypes';

const INITIAL_STATE = {
  data: [],
  loading: true,
  error: {
    status: false,
    message: ''
  },
  sortParams: {
    order: 'desc',
    key: 'PaymentDate',
    type: 'date'
  },
  filter: 'today',
  searchTerm: '',
  paginationParams: {
    currentPage: 0,
    rowsPerPage: 10
  },
  customFilters: {
    rejected: false,
    paid: false,
    pending: false,
    withComments: false,
    accountingDate: {
      start: null,
      end: null
    },
    paymentDate: {
      start: null,
      end: null
    }
  }
}

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.FETCH_PAID_INVOICES_REQUEST:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
          message: ''
        },
      }
    case actionTypes.FETCH_PAID_INVOICES_SUCCESS:
      return {
        ...state,
        paginationParams: {
          currentPage: 0,
          rowsPerPage: 10
        },
        data: action.payload,
        loading: false
      }
    case actionTypes.PAID_REQUEST_FAILED:
      return {
        ...state,
        error: {
          status: true,
          message: action.payload || ''
        },
        loading: false
      }
    case actionTypes.INIT_PAID_ERROR:
      return {
        ...state,
        error: {
          status: false,
          message: ''
        }
      }
    case actionTypes.SET_AMOUNT_OF_PAID_INVOICES_PER_PAGE:
      return {
        ...state,
        paginationParams: {
          ...state.paginationParams,
          rowsPerPage: action.payload
        }
      }
    case actionTypes.SET_CURRENT_PAID_INVOICES_PAGE:
      return {
        ...state,
        paginationParams: {
          ...state.paginationParams,
          currentPage: action.payload
        }
      }
    case actionTypes.SET_PAID_INVOICES_SORT_PARAMS:
      return {
        ...state,
        sortParams: {...action.payload},
        paginationParams: {
          ...state.paginationParams,
          currentPage: 0
        }
      }
    case actionTypes.SET_PAID_INVOICES_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
        paginationParams: {
          ...state.paginationParams,
          currentPage: 0
        }
      }
    case actionTypes.SET_PAID_INVOICES_FILTER:
      return {
        ...state,
        filter: action.payload,
        paginationParams: {
          ...state.paginationParams,
          currentPage: 0
        }
      }
    case actionTypes.SET_PAID_INVOICES_FILTER_CONFIG:
      return {
        ...state,
        customFilters: {...action.payload},
        paginationParams: {
          ...state.paginationParams,
          currentPage: 0
        }
      }
    case actionTypes.INIT_PAID_INVOICE_PAGINATION_PARAMS:
      return {
        ...state,
        paginationParams: {
          ...state.paginationParams,
          currentPage: 0
        }
      }
    case actionTypes.INIT_PAID_INVOICE_FILTER:
      return {
        ...state,
        filter: 'today'
      }
    case actionTypes.REFRESH_PAID_INVOCE:
      return {
        ...state,
        sortParams: {
          order: 'desc',
          key: 'PaymentDate',
          type: 'string'
        },
        filter: 'today',
        searchTerm: '',
        paginationParams: {
          currentPage: 0,
          rowsPerPage: 10
        },
        customFilters: {
          rejected: false,
          paid: false,
          pending: false,
          withComments: false,
          accountingDate: {
            start: null,
            end: null
          },
          paymentDate: {
            start: null,
            end: null
          }
        }
      }
    default:
      return state;
  }
}

export default reducer;