import {useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPayments,
  sortPaymentsSelector,
  selectedInvoicesSelector,
  searchTermPaymentsSelector,
  selectedCooperativeSelector,
  getPaymentsAbleToSelect
} from 'selectors';
import {
  setSortParams,
  setSelectedPayment,
  selectAllInvoices,
  updateInvoiceAccountingDate,
  rejectPayment,
  updateBankAccount,
  payInvoices,
  setPayNowStatus
} from 'actions/paymentsActions';
import PaymentsTableView from 'components/PaymentsTableView';

const PaymentTableContainer = () => {
  const dispatch = useDispatch();
  const {
    invoices, sortParams, searchTerm,
    selectedInvoices, isPayNow,
    selectedCooperatives, paymentsAbleToSelect
  } = useSelector(state => ({
    invoices: getPayments(state),
    sortParams: sortPaymentsSelector(state),
    searchTerm: searchTermPaymentsSelector(state),
    selectedInvoices: selectedInvoicesSelector(state),
    isPayNow: state.payments.isPayNow,
    selectedCooperatives: selectedCooperativeSelector(state),
    selectedAll: state.payments.selectedAll,
    paymentsAbleToSelect: getPaymentsAbleToSelect(state),
  }))

  const handleChangeSortParams = useCallback((...args) => {
    dispatch(setSortParams(...args))
  }, [dispatch]);

  const handleSelectInvoice = useCallback((id) => {
    dispatch(setSelectedPayment(id))
  }, [dispatch]);

  const handleSelectAllInvoices = useCallback((e) => {
    if (e.target.checked) {
      dispatch(selectAllInvoices(paymentsAbleToSelect))
    } else {
      dispatch(selectAllInvoices([]))
    }

    /* eslint-disable-next-line */
  }, [dispatch, paymentsAbleToSelect])

  const handleUpdateSingleDate = useCallback((date, id) => {
    dispatch(updateInvoiceAccountingDate(date, id))
  }, [dispatch]);

  const handleRejectInvoice = useCallback((id, comment) => {
    dispatch(rejectPayment(id, comment))
  }, [dispatch]);

  const handleUpdateBankAccount = useCallback((invoiceId, bankAccountId) => {
    dispatch(updateBankAccount(invoiceId, bankAccountId))
  }, [dispatch]);

  const handlePayInvoice = (invoice) => {
    let flag = isPayNow === 'paynow';
    dispatch(payInvoices(invoice, false, flag));
  }

  const handleChangePayNowStatus = useCallback((status) => {
    dispatch(setPayNowStatus(status))
  }, [dispatch])

  return (
    <PaymentsTableView 
      data={invoices}
      sortParams={sortParams}
      searchTerm={searchTerm}
      isPayNow={isPayNow}
      ableToSelectLength={paymentsAbleToSelect.length}
      selectedCooperativesLength={selectedCooperatives.length}
      selectedInvoices={selectedInvoices}
      onChangeSortParams={handleChangeSortParams}
      handleSelectInvoice={handleSelectInvoice}
      handleSelectAllInvoices={handleSelectAllInvoices}
      handleUpdateDate={handleUpdateSingleDate}
      handleRejectInvoice={handleRejectInvoice}
      handleUpdateBankAccount={handleUpdateBankAccount}
      handleSendPayments={handlePayInvoice}
      handleChangePayNowStatus={handleChangePayNowStatus}
    />
  )
}

export default PaymentTableContainer;