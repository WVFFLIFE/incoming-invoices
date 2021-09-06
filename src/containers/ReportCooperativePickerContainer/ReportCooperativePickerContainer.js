import { useMemo, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { cooperativesSelector } from 'selectors';
import { selectReportCooperative } from 'actions/reportActions';

import ReportCooperativePicker from "components/ReportCooperativePicker";

const ReportCooperativePickerContainer = () => {
  const dispatch = useDispatch();
  const {
    cooperatives,
    selectedCooperative,
  } = useSelector(state => ({
    cooperatives: cooperativesSelector(state),
    selectedCooperative: state.report.selectedCooperative,
  }));

  const selectedIdx = useMemo(() => {
    if (Array.isArray(cooperatives) && selectedCooperative) {
      return cooperatives.findIndex(coop => coop.Id === selectedCooperative.Id)
    }

    return null;
  }, [cooperatives, selectedCooperative]);

  const selectPrev = () => {
    if (!selectedIdx) return;

    dispatch(
      selectReportCooperative(cooperatives[selectedIdx-1])
    );
  }

  const selectNext = () => {
    if (!selectedIdx || selectedIdx === cooperatives.length - 1) return false;

    dispatch(
      selectReportCooperative(cooperatives[selectedIdx+1])
    )
  }

  console.log(cooperatives);

  return (
    <ReportCooperativePicker 
      cooperatives={cooperatives}
      selectedCooperative={selectedCooperative}
      selectPrev={selectPrev}
      selectNext={selectNext}
    />
  )
}

export default memo(ReportCooperativePickerContainer);