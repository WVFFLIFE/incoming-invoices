import * as actionTypes from 'actionTypes';

const INITIAL_STATE = {
  cooperatives: [],
  loading: false,
  error: {
    status: false,
    message: ''
  },
  sortParams: {
    order: 'desc',
    key: 'Default',
    type: 'float'
  },
  filter: 'all',
  searchTerm: '',
  substitute: {
    options: [],
    value: null,
  },
  paginationParams: {
    currentPage: 0,
    rowsPerPage: 10
  }
}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case actionTypes.FETCH_ACCOUNTS_REQUEST:
      return {
        ...state,
        error: {
          status: false,
          message: ''
        },
        loading: true,
      }
    case actionTypes.FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        cooperatives: action.payload,
        loading: false,
        paginationParams: {
          currentPage: 0,
          rowsPerPage: 10
        }
      }
    case actionTypes.BALANCES_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload || ''
        }
      }
    case actionTypes.INIT_BALANCES_ERROR:
      return {
        ...state,
        error: {
          status: false,
          message: ''
        }
      }
    case actionTypes.SET_ACCOUNTS_SORT_PARAMS:
      return {
        ...state,
        sortParams: action.payload
      }
    case actionTypes.SET_BALANCES_FILTER:
      return {
        ...state,
        filter: action.payload,
        paginationParams: {
          ...state.paginationParams,
          currentPage: 0
        }
      }
    case actionTypes.SET_ACCOUNTS_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
        paginationParams: {
          ...state.paginationParams,
          currentPage: 0
        }
      }
    case actionTypes.FETCH_SUBSTITUTE_SUCCESS:
      return {
        ...state,
        substitute: {
          ...state.substitute,
          options: action.payload,
        }
      }
    case actionTypes.SELECT_SUBSITUTE:
      return {
        ...state,
        substitute: {
          ...state.substitute,
          value: action.payload
        },
        paginationParams: {
          ...state.paginationParams,
          currentPage: 0
        }
      }
    case actionTypes.SET_AMOUNT_OF_BALANCES_PER_PAGE:
      return {
        ...state,
        paginationParams: {
          ...state.paginationParams,
          rowsPerPage: action.payload
        }
      }
    case actionTypes.SET_CURRENT_BALANCES_PAGE:
      return {
        ...state,
        paginationParams: {
          ...state.paginationParams,
          currentPage: action.payload
        }
      }
    case actionTypes.REFRESH_ACCOUNTS:
      return {
        ...state,
        error: {
          status: false,
          message: ''
        },
        sortParams: {
          order: 'asc',
          key: 'Default',
          type: null
        },
        filter: 'all',
        searchTerm: '',
        paginationParams: {
          currentPage: 0,
          rowsPerPage: 10
        },
      }
    default:
      return state;
  }
}