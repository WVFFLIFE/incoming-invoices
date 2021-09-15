import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  FlexWrapper,
  ControlsBar,
  FiltersBar,
  Pagination,
  RefreshButton,
  FiltersControls,
  PaySelectedButton,
  EditButton,
  PaymentsFilterModal,
  EditModal,
  UpdateModal,
  Dialog,
  Loader,
  UpdateDateErrorModal,
  EditModalError,
  ErrorModal,
} from 'components';
import Search from 'components/Controls/Search';
import {
  paginationParamsPaymentsSelector,
  getPayments,
  loadingPaymentsSelector,
  sortPaymentsSelector,
  getTotalPaymentsItemsSelector,
  searchTermPaymentsSelector,
  selectedInvoicesSelector,
  selectedCooperativeSelector,
  filterPaymentsSelector,
  customPaymentsFiltersSelector,
  getTotalSelectedAmount,
  getPaymentError,
  getUpdateParams,
  getFilteredPayments,
  checkDateParamsSelector,
  isEditDisabledSelector,
  isPayDisabledSelector,
  updateDateParamsSelector,
  getClosedPeriodEndDate,
  getPaymentsError
} from 'selectors';
import {
  fetchPayments,
  changeCurrentPage,
  changeRowsPerPage,
  setSearchTerm,
  selectAllPayments,
  setFilter,
  setCustomFilters,
  updateInvoicesListAccountingDate,
  initUpdateMessages,
  payInvoices,
  initCheckDateParams,
  refreshPayments,
  initPaymentsSettings,
  hideUpdateDateErrorPopup,
  initPaymentsError,
  setPayNowStatus
} from 'actions/paymentsActions';
import {
  PaymentTableContainer, 
  BalancesPickerContainer,
  ModalsContainer
} from 'containers';

const paginationOptions = [5, 10, 15];

const Payments = () => {
  const dispatch = useDispatch();
  const {
    loading, invoices, paginationParams,
    totalItems, searchTerm,
    selectedInvoices, selectedCooperatives,
    filter, customFilters, totalSelectedAmount,
    paymentError, updateParams, filteredPayments,
    checkDateParams, isEditDisabled, isPayDisabled, isPayNow,
    updateDateParams, closedPeriodEndDate, error
  } = useSelector(state => ({
    invoices: getPayments(state),
    loading: loadingPaymentsSelector(state),
    sortParams: sortPaymentsSelector(state),
    paginationParams: paginationParamsPaymentsSelector(state),
    totalItems: getTotalPaymentsItemsSelector(state),
    searchTerm: searchTermPaymentsSelector(state),
    selectedInvoices: selectedInvoicesSelector(state),
    selectedCooperatives: selectedCooperativeSelector(state),
    filter: filterPaymentsSelector(state),
    customFilters: customPaymentsFiltersSelector(state),
    totalSelectedAmount: getTotalSelectedAmount(state),
    paymentError: getPaymentError(state),
    updateParams: getUpdateParams(state),
    filteredPayments: getFilteredPayments(state),
    selectedAll: state.payments.selectedAll,
    checkDateParams: checkDateParamsSelector(state),
    isEditDisabled: isEditDisabledSelector(state),
    isPayDisabled: isPayDisabledSelector(state),
    isPayNow: state.payments.isPayNow,
    updateDateParams: updateDateParamsSelector(state),
    closedPeriodEndDate: getClosedPeriodEndDate(state),
    rejectedByUserParams: state.payments.rejectedByUserParams,
    error: getPaymentsError(state)
  }));
  const {t} = useTranslation();
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    batch(() => {
      dispatch(initPaymentsSettings());
      dispatch(fetchPayments());
    })
  }, [dispatch]);

  useEffect(() => {
    if (selectedInvoices.length) {
      dispatch(selectAllPayments([]))
    }

    /* eslint-disable-next-line */
  }, [filteredPayments, dispatch])

  const handleOpenEditModal = () => {
    setOpenEditModal(true)
  }

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const handleChangeRowsPerPage = (e) => {
    const val = e.target.value;
    dispatch(changeRowsPerPage(val))
  }

  const handleChangeCurrentPage = (page) => {
    dispatch(changeCurrentPage(page))
  }

  const handleChangeSearchTerm = useCallback((e) => {
    const { value } = e.target;

    dispatch(setSearchTerm(value))
  }, [dispatch])

  const handleChangeFilter = filter => {
    dispatch(setFilter(filter))
  }

  const handleApplyFilters = filters => {
    dispatch(setCustomFilters(filters))
  }

  const handleUpdateSelectedInvoicesDate = useCallback((date) => {
    dispatch(updateInvoicesListAccountingDate(date))
  }, [dispatch])

  const handleUpdateAccountingDate = () => {
    dispatch(hideUpdateDateErrorPopup());
    dispatch(updateInvoicesListAccountingDate(null, false))
  }

  const handleCloseUpdateModal = useCallback(() => {
    dispatch(initUpdateMessages());
    dispatch(fetchPayments());
  }, [dispatch]);

  const handlePaySelectedInvoices = () => {
    dispatch(setPayNowStatus('paytoduedate'));
    dispatch(payInvoices(selectedInvoices, false, false))
  }

  const handleCloseUpdateDateModal = useCallback(() => {
    dispatch(initCheckDateParams())
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(refreshPayments());
  }

  const handlePayInvoiceAnyway = () => {
    let flag = isPayNow === 'paynow';
    dispatch(payInvoices(selectedInvoices, true, flag));
    handleCloseUpdateDateModal();
  }

  const closeErrorModal = () => {
    dispatch(initPaymentsError());
  }

  const filtersList = [
    { id: 'urgent', label: '#filter.urgent', disabled: false },
    { id: 'upToTomorrow', label: '#filter.uptotomorrow', disabled: false },
    { id: 'endOfWeek', label: '#filter.endofweek', disabled: false },
    { id: 'endOfMonth', label: '#filter.endofmonth', disabled: false },
    { id: 'all', label: '#filter.all', disabled: selectedCooperatives.length > 1 }
  ];

  const isActiveFilter = (
    customFilters.overdue ||
    customFilters.rejected ||
    customFilters.withComments ||
    customFilters.withWarnings ||
    customFilters.overdueSoon ||
    customFilters.accountingDate.start ||
    customFilters.accountingDate.end ||
    customFilters.paymentDate.start ||
    customFilters.paymentDate.end
  );

  return (
    <>
      <FlexWrapper className="mb-20">
        <p className="tab-title">
          {t('#tab.title.payments')}
        </p>
        <FlexWrapper>
          <RefreshButton
            handleClick={handleRefresh}
          />
          <EditButton
            disabled={selectedInvoices.length <= 1 || isEditDisabled}
            handleClick={handleOpenEditModal}
          />
          <PaySelectedButton
            amount={
              selectedInvoices.length && selectedCooperatives.length === 1
                ? totalSelectedAmount
                : null
            }
            handleClick={handlePaySelectedInvoices}
            error={paymentError}
            disabled={selectedInvoices.length === 0 || isPayDisabled}
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
          <Search
            searchTerm={searchTerm}
            handleChangeSearchTerm={handleChangeSearchTerm}
          />
          <FiltersControls
            isActive={isActiveFilter}
          >
            <PaymentsFilterModal
              handleApplyFilters={handleApplyFilters}
              handleChangeFilter={handleChangeFilter}
              defaultFilters={customFilters}
            />
          </FiltersControls>
        </FlexWrapper>
      </ControlsBar>
      <PaymentTableContainer />
      {
        invoices.length ? (
          <Pagination
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onChangeCurrentPage={handleChangeCurrentPage}
            totalItems={totalItems}
            itemsPerPage={paginationParams.rowsPerPage}
            currentPage={paginationParams.currentPage}
            options={paginationOptions}
          />
        ) : null
      }
      <Loader
        visible={loading}
      />
      <Dialog
        open={openEditModal}
        handleClose={handleCloseEditModal}
        maxWidth="xs"
      >
        <EditModal
          comparedDate={closedPeriodEndDate}
          handleUpdateDate={handleUpdateSelectedInvoicesDate}
          handleClose={handleCloseEditModal}
        />
      </Dialog>
      <Dialog
        open={updateParams.popupOpen}
        handleClose={handleCloseUpdateModal}
        maxWidth="sm"
      >
        <UpdateModal
          handleClose={handleCloseUpdateModal}
          updateMessages={updateParams.updateMessages}
        />
      </Dialog>

      {/* when date is not up to date for the following cooperatives */}
      <Dialog
        maxWidth="sm"
        open={checkDateParams.popupOpen}
        handleClose={handleCloseUpdateDateModal}
      >
        <UpdateDateErrorModal 
          payers={checkDateParams.data?.Payers}
          handleClose={handleCloseUpdateDateModal}
          handleApply={handlePayInvoiceAnyway}
        />
      </Dialog>
      <Dialog
        maxWidth="sm"
        open={updateDateParams.popupOpen}
        handleClose={handleUpdateAccountingDate}
      >
        <EditModalError 
          cooperatives={updateDateParams.updateMessages}
          handleClose={handleUpdateAccountingDate}
        />
      </Dialog>
      <Dialog
        maxWidth="sm"
        open={error.status}
        handleClose={closeErrorModal}
      >
        <ErrorModal 
          message={error.message}
        />
      </Dialog>
     <ModalsContainer />
    </>
  )
}

export default Payments;