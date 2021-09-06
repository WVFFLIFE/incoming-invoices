import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import {
  fetchPaidInvoices,
  changeCurrentPage,
  changeRowsPerPage,
  setSearchTerm,
  setFilter,
  setCustomFilters,
  refreshPaidInvoice,
  initPaidSettings,
  initPaidError
} from 'actions/paidActions';
import {
  FlexWrapper,
  ControlsBar,
  FiltersBar,
  Loader,
  Pagination,
  RefreshButton,
  SearchControl,
  FiltersControls,
  PaidFilterModal,
  ErrorModal,
  Dialog
} from 'components';
import {
  getPaidInvoices,
  loadingPaidInvoicesSelector,
  paidInvoicesPaginationParamsSelector,
  searchTermPaidInvoicesSelector,
  paidInvoicesFilterSelector,
  selectedCooperativeSelector,
  getTotalPaidInvoicesSelector,
  customPaidInvoicesFiltersSelector,
  getCooperativesOptions,
  getPaidError
} from 'selectors';
import { useTranslation } from 'react-i18next';
import { PaidTableContainer, BalancesPickerContainer } from 'containers';

const paginationOptions = [5, 10, 15];

const Paid = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    paidInvoices, selectedCooperatives, filter,
    searchTerm, loading, error,
    paginationParams, totalItems, customFilters,
  } = useSelector(state => ({
    paidInvoices: getPaidInvoices(state),
    cooperatives: getCooperativesOptions(state),
    selectedCooperatives: selectedCooperativeSelector(state),
    filter: paidInvoicesFilterSelector(state),
    searchTerm: searchTermPaidInvoicesSelector(state),
    loading: loadingPaidInvoicesSelector(state),
    paginationParams: paidInvoicesPaginationParamsSelector(state),
    totalItems: getTotalPaidInvoicesSelector(state),
    customFilters: customPaidInvoicesFiltersSelector(state),
    error: getPaidError(state)
  }))

  useEffect(() => {
    batch(() => {
      dispatch(initPaidSettings());
      dispatch(fetchPaidInvoices());
    })
  }, [dispatch])

  const handleChangeFilter = useCallback(filter => {
    dispatch(setFilter(filter))
  }, [dispatch]);

  const handleChangeSearchTerm = useCallback((e) => {
    const { value } = e.target;

    dispatch(setSearchTerm(value))
  }, [dispatch])

  const handleChangeRowsPerPage = useCallback((e) => {
    const val = e.target.value;
    dispatch(changeRowsPerPage(val))
  }, [dispatch])

  const handleChangeCurrentPage = useCallback((page) => {
    dispatch(changeCurrentPage(page))
  }, [dispatch]);

  const handleApplyFilters = filters => {
    dispatch(setCustomFilters(filters))
  }

  const handleRefresh = () => {
    dispatch(refreshPaidInvoice());
  }

  const closeErrorModal = useCallback(() => {
    dispatch(initPaidError());
  }, [dispatch])

  const filtersList = [
    { id: 'today', label: '#filter.today', disabled: false },
    { id: 'thisWeek', label: '#filter.thisweek', disabled: false },
    { id: 'thisMonth', label: '#filter.thismonth' },
    { id: 'thisYear', label: '#filter.thisyear', disabled: false },
    { id: 'future', label: '#filter.future', disabled: false },
    { id: 'all', label: '#filter.all', disabled: selectedCooperatives.length > 1 }
  ]

  const isActive = (
    customFilters.rejected ||
    customFilters.paid ||
    customFilters.pending ||
    customFilters.withComments ||
    customFilters.accountingDate.start ||
    customFilters.accountingDate.end ||
    customFilters.paymentDate.start ||
    customFilters.paymentDate.end
  )

  return (
    <>
      <FlexWrapper className="mb-20">
        <p className="tab-title">
          {t('#tab.title.paidinvoices')}
        </p>
        <FlexWrapper>
          <RefreshButton
            handleClick={handleRefresh}
          />
        </FlexWrapper>
      </FlexWrapper>
      <ControlsBar>
        <FlexWrapper>
          <BalancesPickerContainer />
          <FiltersBar
            filtersList={filtersList}
            activeFilter={filter}
            handleChangeFilter={handleChangeFilter}
          />
        </FlexWrapper>
        <FlexWrapper>
          <SearchControl
            value={searchTerm}
            handleChangeValue={handleChangeSearchTerm}
          />
          <FiltersControls
            isActive={isActive}
          >
            <PaidFilterModal
              handleApplyFilters={handleApplyFilters}
              defaultFilters={customFilters}
              handleChangeFilter={handleChangeFilter}
            />
          </FiltersControls>
        </FlexWrapper>
      </ControlsBar>
      <PaidTableContainer />
      {
        paidInvoices.length ? (
          <Pagination
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onChangeCurrentPage={handleChangeCurrentPage}
            itemsPerPage={paginationParams.rowsPerPage}
            currentPage={paginationParams.currentPage}
            options={paginationOptions}
            totalItems={totalItems}
          />
        ) : null
      }
      <Dialog
        maxWidth="sm"
        open={error.status}
        handleClose={closeErrorModal}
      >
        <ErrorModal
          message={error.message}
        />
      </Dialog>
      <Loader
        visible={loading}
      />
    </>
  )
}

export default Paid;