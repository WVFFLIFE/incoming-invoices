import * as ReportActionTypes from 'actionTypes/reportActionTypes';

export const selectReportCooperative = (cooperative) => ({
  type: ReportActionTypes.SELECT_REPORT_COOPERATIVE,
  payload: cooperative
});