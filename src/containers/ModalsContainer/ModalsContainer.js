import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  RejectedByUserModal,
  PaymentStatusModal
} from 'components';
import {
  getRejectedInvoices,
  getVisibilityRejectedByUserModal,
  getPaidStatusResponses,
  getVisibilityPaidStatusModal
} from 'selectors';
import {
  closeRejectedByUserModal,
  closePaidStatusModal
} from 'actions/modalsActions';

const ModalsContainer = () => {
  const dispatch = useDispatch();
  const {
    isOpenRejectedByUserModal,
    isOpenPaidStatusModal,
    rejectedInvoices,
    paidStatusResponses
  } = useSelector(state => ({
    isOpenRejectedByUserModal: getVisibilityRejectedByUserModal(state),
    rejectedInvoices: getRejectedInvoices(state),
    isOpenPaidStatusModal: getVisibilityPaidStatusModal(state),
    paidStatusResponses: getPaidStatusResponses(state)
  }))

  const handleCloseRejectedByUserModal = () => {
    dispatch(closeRejectedByUserModal())
  }

  const handleClosePaidStatusModal = () => {
    dispatch(closePaidStatusModal())
  }

  return (
    <>
      <Dialog
        maxWidth="sm"
        open={isOpenRejectedByUserModal}
        handleClose={handleCloseRejectedByUserModal}
      >
        <RejectedByUserModal 
          rejectedInvoices={rejectedInvoices}
        />
      </Dialog>
      <Dialog
        open={isOpenPaidStatusModal}
        handleClose={handleClosePaidStatusModal}
        maxWidth="sm"
      >
        <PaymentStatusModal 
          paidMessages={paidStatusResponses}
        />
      </Dialog>
    </>
  )
}

export default ModalsContainer;