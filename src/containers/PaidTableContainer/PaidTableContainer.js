import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPaidInvoices,
  searchTermPaidInvoicesSelector,
  sortPaidInvoicesSelector,
  defaultSortedPaidInvoices
} from 'selectors';
import {
  setSortParams
} from 'actions/paidActions';
import PaidTableView from 'components/PaidTableView';

const PaidTableContainer = () => {
  const firstRender = useRef(true);
  const dispatch = useDispatch();
  const {
    paidInvoices, searchTerm, sortParams
  } = useSelector(state => {
    let paidInvoicesExtractor = firstRender.current
      ? defaultSortedPaidInvoices
      : getPaidInvoices

    if (firstRender.current) {
      firstRender.current = false;
    }

    return {
      paidInvoices: paidInvoicesExtractor(state),
      searchTerm: searchTermPaidInvoicesSelector(state),
      sortParams: sortPaidInvoicesSelector(state)
    }
  });
  
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