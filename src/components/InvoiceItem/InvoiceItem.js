import React, { useState } from 'react';
import {
  Collapse,
  Button
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WarningIcon from '@material-ui/icons/ReportProblemOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutlineOutlined';
import CancelIcon from '@material-ui/icons/CancelPresentationOutlined';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { MessageIcon } from 'components/Icons';
import {
  PayInvoiceModal,
  Dialog,
  Tooltip,
  Checkbox
} from 'components';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import {
  formatNum,
  isRejectedInvoice,
  formatDate,
  isOverdueSoon,
  isOverdue,
  isAbleToPay,
  getText
} from 'helpers';
import { useStyles } from './style';

const InvoiceItem = ({
  data: invoice,
  checked,
  searchTerm,
  handleChangeCheckbox,
  collapseComponent,
  handleSendPayments,
  isPayNow,
  handleChangePayNowStatus
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);

  const handleExpandedClick = () => {
    setExpanded(!expanded);
  }

  const handleOpenPayModal = (e) => {
    e.stopPropagation();
    setPayModalOpen(true);
  }

  const handleClosePayModal = () => {
    setPayModalOpen(false);
  }

  const handlePaymentButtonClick = (flag) => {
    handleSendPayments([invoice.Id], flag)
  }

  const handleSelect = () => {
    handleChangeCheckbox(invoice.Id)
  }

  const stopPropagationClick = e => {
    e.stopPropagation();
  }


  const getTextView = getText(searchTerm);
  const validation = invoice.Validation ? invoice.Validation[0] : null;

  const Icon = isRejectedInvoice(invoice)
    ? (
      invoice?.RejectComment ? (
        <Tooltip
          arrow
          title={invoice?.RejectComment}
        >
          <CancelIcon className={clsx(classes.icon, classes.cancelIcon)} />
        </Tooltip>
      ) : (
        <Tooltip
          arrow
          title={t("#modal.filter.rejected")}
        >
          <CancelIcon className={clsx(classes.icon, classes.cancelIcon)} />
        </Tooltip>
      )
    )
    : validation?.ResponseCode === 2 || validation?.ResponseCode === 3
      ? (
        <Tooltip
          arrow
          title={
            validation.MessageCode === -1
              ? validation.Message
              : t(`#error.code.${validation.MessageCode}`)
          }
        >
          <WarningIcon className={clsx(classes.icon, classes.warningIcon)} />
        </Tooltip>
      )
      : isOverdueSoon(new Date(invoice.DueDate))
        ? (
          <Tooltip
            arrow
            title={t('#modal.filter.overduesoon')}
          >
            <ErrorIcon className={clsx(classes.icon, classes.warningIcon)} />
          </Tooltip>
        )
        : isOverdue(new Date(), new Date(invoice.DueDate))
          ? (
            <Tooltip
              arrow
              title={t("#modal.filter.overdue")}
            >
              <ErrorIcon className={clsx(classes.icon, classes.errorIcon)} />
            </Tooltip>
          )
          : <span className={classes.icon}></span>;

  const isCheckboxDisabled = (!invoice.AllowedEdit && !invoice.AllowedPay);

  return (
    <div
      className={classes.root}
    >
      <div
        onClick={handleExpandedClick}
        className={clsx(classes.contentRoot, {
          [classes.backgroundRoot]: isRejectedInvoice(invoice),
          [classes.checkedRoot]: checked
        })}
      >
        <div className={classes.contentWrapper}>
          <Checkbox
            onClick={stopPropagationClick}
            onChange={handleSelect}
            checked={checked}
            disabled={isCheckboxDisabled}
          />
        </div>
        <div className={clsx(classes.contentWrapper, classes.flex)}>
          <div className={classes.statusIconWrapper}>{Icon}</div>
          <span className={clsx(classes.text, classes.textBold)}>
            {getTextView(invoice.Payer.Name)}
          </span>
          {invoice.Comment ? (
            <Tooltip
              placement="bottom-start"
              arrow
              title={invoice.Comment}
            >
              <div className={classes.commentIconWrapper}>
                <MessageIcon className={classes.commentIcon} />
              </div>
            </Tooltip>
          ) : null}
          <Button
            onClick={handleExpandedClick}
            classes={{
              root: classes.expandButton
            }}
          >
            <ExpandMoreIcon className={clsx(classes.expandIcon, {
              [classes.expandIconActive]: expanded
            })} />
          </Button>
        </div>
        <div className={classes.contentWrapper}>
          <span className={clsx(classes.text, classes.textMedium)}>
            {getTextView(invoice.Seller)}
          </span>
        </div>
        <div className={classes.contentWrapper}>
          <span className={clsx(classes.text, classes.textLight)}>
            {getTextView(formatDate(invoice.DueDate))}
          </span>
        </div>
        <div className={classes.contentWrapper}>
          <span className={clsx(classes.text, classes.textMedium)}>
            {getTextView(formatNum(invoice.Amount))}
          </span>
        </div>
        <div className={classes.contentWrapper}>
          <Tooltip
            placement="bottom-start"
            arrow
            title={t('#custom.pay')}
          >
            <div>
              <Button
                className={classes.btnArrowRight}
                classes={{
                  root: classes.payButtonRoot
                }}
                onClick={handleOpenPayModal}
                disabled={
                  !invoice.AllowedPay ||
                  !isAbleToPay(invoice)
                }
              >
                <ArrowRightAltIcon className={classes.arrowRightIcon} />
              </Button>
            </div>
          </Tooltip>
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {collapseComponent}
      </Collapse>
      <Dialog
        open={payModalOpen}
        handleClose={handleClosePayModal}
        maxWidth="sm"
      >
        <PayInvoiceModal
          handleClose={handleClosePayModal}
          amount={invoice.Amount}
          handleApply={handlePaymentButtonClick}
          radioValue={isPayNow}
          setRadioValue={handleChangePayNowStatus}
        />
      </Dialog>
    </div>
  )
}

export default React.memo(InvoiceItem);