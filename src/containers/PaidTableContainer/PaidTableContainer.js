import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPaidInvoices,
  searchTermPaidInvoicesSelector,
  sortPaidInvoicesSelector,
} from 'selectors';
import {
  setSortParams
} from 'actions/paidActions';
import PaidTableView from 'components/PaidTableView';

const PaidTableContainer = () => {
  const dispatch = useDispatch();
  const {
    paidInvoices, searchTerm, sortParams
  } = useSelector(state => ({
    paidInvoices: getPaidInvoices(state),
    searchTerm: searchTermPaidInvoicesSelector(state),
    sortParams: sortPaidInvoicesSelector(state)
  }));
  
  const handleChangeSortParams = useCallback((...args) => {
    dispatch(setSortParams(...args))
  }, [dispatch]);

  return (
    <PaidTableView 
      data={paidInvoices}
      searchTerm={searchTerm}
      sortParams={sortParams}
      onChangeSortParams={handleChangeSortParams}
    />
  )
}

export default PaidTableContainer;