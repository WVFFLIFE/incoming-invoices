import * as ReportActionTypes from 'actionTypes/reportActionTypes';

const INITIAL_STATE = {
  reportList: [],
  selectedCooperative: null,
  loading: false,
  error: false,
  sortParams: {
    order: 'desc',
    key: '',
    type: 'string'
  },
  filter: null,
  searchTerm: ''
}

function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ReportActionTypes.FETCH_REPORT_LIST:
      return {
        ...state,
        reportList: [],
        loading: true,
        error: false,
      }
    case ReportActionTypes.FETCH_REPORT_LIST_SUCCESS:
      return {
        ...state,
        reportList: action.payload,
        loading: false,
      }
    case ReportActionTypes.FETCH_REPORT_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    case ReportActionTypes.SET_SORT_PARAMS:
      return {
        ...state,
        sortParams: action.payload
      }
    case ReportActionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      }
    case ReportActionTypes.SELECT_REPORT_COOPERATIVE:
      return {
        ...state,
        selectedCooperative: action.payload
      }
    default:
      return state;
  }
}

export default reducer;