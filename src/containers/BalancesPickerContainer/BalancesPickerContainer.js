import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedCooperative
} from 'actions/settingsActions';
import {
  selectedCooperativeSelector,
  getCooperativesOptions,
  getSelectedSubstitute
} from 'selectors'
import BalancesPicker from 'components/BalancesPicker';

const BalancesPickerContainer = () => {
  const dispatch = useDispatch();
  const {
    cooperatives,
    selectedCooperatives,
    currentTab, selectedSubstitute
  } = useSelector(state => ({
    cooperatives: getCooperativesOptions(state),
    selectedCooperatives: selectedCooperativeSelector(state),
    currentTab: state.settings.currentTab,
    selectedSubstitute: getSelectedSubstitute(state)
  }))

  const handleChangeCooperative = useCallback((cooperative) => {
    dispatch(setSelectedCooperative(cooperative));
  }, [dispatch])

  return (
    <BalancesPicker 
      selectedItems={selectedCooperatives}
      options={cooperatives}
      handleChange={handleChangeCooperative}
      selectOne={currentTab === 'paid'}
      selectedSubstitute={selectedSubstitute}
    />
  )
}

export default BalancesPickerContainer;