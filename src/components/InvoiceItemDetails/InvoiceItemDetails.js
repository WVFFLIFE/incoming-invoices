import React, { useState, useCallback } from 'react';
import { Badge, Button, Popover } from '@material-ui/core';
import clsx from 'clsx';
import CachedIcon from '@material-ui/icons/Cached';
import {
  BankAccountModal,
  RejectInvoiceModal,
  Tooltip,
  Calendar,
  Dialog
} from 'components';
import CancelIcon from '@material-ui/icons/CancelPresentationOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { EditIcon } from 'components/Icons';
import { useTranslation } from 'react-i18next';
import { isRejectedInvoice, formatDate, initTime, getText } from 'helpers';
import isAfter from 'date-fns/isAfter';
import { useStyles } from './style';

function showChangeIcon(currentId, bankAccountsList) {
  if (currentId && bankAccountsList.length === 1) {
    return false;
  }

  if (currentId && bankAccountsList.length) {
    return true;
  }

  if (!currentId && bankAccountsList.length) {
    return true
  }
  
  return false;
}

const InvoiceItemDetails = ({
  data,
  checked,
  searchTerm,
  handleUpdateDate,
  handleRejectInvoice,
  handleUpdateBankAccount
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const initBankAccount = data.BankAccounts.find(BankAccount => BankAccount.Id === data.BuyerBankAccountId) || null;
  const [openBankAccountsModal, setOpenBankAccountsModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [accountingDate, setAccountingDate] = useState(
    data.AccountingDate ? initTime(new Date(data.AccountingDate)) : new Date()
  );

  const handleBankAccountModalOpen = () => {
    setOpenBankAccountsModal(true);
  }

  const handleBankAccountModalClose = () => {
    setOpenBankAccountsModal(false);
  }

  const handleRejectModalOpen = () => {
    setOpenRejectModal(true);
  }

  const handleRejectModalClose = useCallback(() => {
    setOpenRejectModal(false);
  }, [])

  const handleOpenCalendarModal = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleCloseCalendarModal = () => {
    setAnchorEl(null);
  }

  const handleChangeDate = date => {
    setAccountingDate(date);
  }

  const handleSaveDate = () => {
    handleCloseCalendarModal();
    handleUpdateDate(accountingDate, data.Id)
  }

  const getTextView = getText(searchTerm);
  const InvoiceDate = formatDate(data.InvoiceDate);
  const AccountingDateDefault = formatDate(data.AccountingDate);
  const ComparedDate = data.RelatedCooperative?.ClosedPeriodEndDate ? new Date(data.RelatedCooperative.ClosedPeriodEndDate) : null;
  const isCalendarModalOpen = !!anchorEl;

  const rejectData = {
    Payer: data.Payer?.Name,
    Seller: data.Seller,
    DueDate: data?.DueDate,
    Amount: data?.Amount,
    Id: data.Id
  }

  return (
    <>
      <div className={clsx(classes.root, {
        [classes.backgroundRoot]: isRejectedInvoice(data),
        [classes.checkedRoot]: checked
      })}>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <span className={classes.label}>{t('#details.invoicenumber')}:</span>
            <a
              href={`${window.location.origin}${data.Link}`}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(classes.text, classes.invoiceNumber)}
            >
              {getTextView(data.InvoiceNumber)}
            </a>
          </li>
          <li className={classes.li}>
            <span className={classes.label}>{t('#details.buyer')}:</span>
            <Badge
              badgeContent={`+${data.BankAccounts.length}`}
              invisible={data.BankAccounts.length <= 1}
              classes={{
                badge: classes.badge,
                anchorOriginTopRightRectangle: classes.anchorOriginTopRightRectangle
              }}
            >
              <span className={classes.text}>
                {initBankAccount ? getTextView(initBankAccount.Name) : null}
              </span>
            </Badge>
            {showChangeIcon(data.BuyerBankAccountId, data.BankAccounts) ? (
              <div className={clsx(classes.relative, classes.ml)}>
                <Tooltip
                  placement="bottom-start"
                  arrow
                  title={t('#bankaccount.change.title')}
                >
                  <div className={classes.cacheIconWrapper}>
                    <Button
                      disabled={!data?.AllowedEdit}
                      classes={{
                        root: classes.buttonRoot
                      }}
                      onClick={handleBankAccountModalOpen}
                    >
                      <CachedIcon className={classes.renewIcon} />
                    </Button>
                  </div>
                </Tooltip>
              </div>
            ) : null}
          </li>
        </ul>
        <ul className={classes.ul}>
          <li className={clsx(classes.li, classes.liFlex)}>
            <span className={classes.label}>{t('#details.invoicestatus')}:</span>
            {
              isRejectedInvoice(data) ? (
                <div className={classes.rejectWrapper}>
                  <span className={classes.rejectText}>
                    {getTextView(data.InvoiceStatus.Label)}
                  </span>
                  {
                    data.RejectComment ? (
                      <Tooltip
                        placement="bottom-start"
                        arrow
                        title={data.RejectComment}
                      >
                        <div className={classes.infoIconWrapper}>
                          <InfoOutlinedIcon className={classes.infoIcon} />
                        </div>
                      </Tooltip>
                    ) : (
                      <div className={clsx(classes.infoIconWrapper, classes.defaultCursor)}>
                        <InfoOutlinedIcon className={classes.infoIcon} />
                      </div>
                    )
                  }
                </div>
              ) : (
                  <span className={classes.text}>
                    {getTextView(data.InvoiceStatus.Label)}
                  </span>
                )
            }
          </li>
          <li className={classes.li}>
            <span className={classes.label}>{t("#details.invoicedate")}:</span>
            <span className={classes.text}>{getTextView(InvoiceDate)}</span>
          </li>
          <li className={classes.li}>
            <span className={classes.label}>{t("#details.accountingdate")}:</span>
            {data?.AllowedEdit ? (
              <>
                <Button
                  onClick={handleOpenCalendarModal}
                  classes={{
                    root: classes.buttonEdit
                  }}
                >
                  <span className={classes.text}>{getTextView(AccountingDateDefault)}</span>
                  <EditIcon className={classes.editIcon} />
                </Button>
                <Popover
                  classes={{
                    root: classes.popoverRoot
                  }}
                  open={isCalendarModalOpen}
                  anchorEl={anchorEl}
                  onClose={handleCloseCalendarModal}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transitionDuration={250}
                >
                  <div className={classes.calendarWrapper}>
                    <Calendar
                      currentDate={accountingDate}
                      comparedDate={ComparedDate}
                      handleChangeDate={handleChangeDate}
                    />
                    <div className={classes.actionsWrapper}>
                      <Button
                        classes={{
                          root: classes.cancelBtn
                        }}
                        onClick={handleCloseCalendarModal}
                      >
                        {t('#button.cancel')}
                      </Button>
                      <Button
                        onClick={handleSaveDate}
                        classes={{
                          root: classes.resolveBtn
                        }}
                        disabled={isAfter(ComparedDate, accountingDate)}
                      >
                        {t('#button.apply')}
                      </Button>
                    </div>
                  </div>
                </Popover>
              </>
            ) : (
                <span className={classes.text}>{getTextView(AccountingDateDefault)}</span>
              )}

          </li>
        </ul>
        <ul className={classes.ul}>
          <li className={clsx(classes.li, classes.col)}>
            <span className={classes.label}>{t("#details.comments")}:</span>
            <span className={classes.comment}>{getTextView(data.Comment)}</span>
          </li>
        </ul>
        <ul className={classes.ul}>
          <li className={clsx(classes.li, classes.liBtn)}>
            <Tooltip
              placement="bottom-start"
              arrow
              title={t('#modal.reject.title')}
            >
              <div>
                <Button
                  classes={{
                    root: classes.btnReject,
                  }}
                  disabled={!data?.AllowedEdit}
                  onClick={handleRejectModalOpen}
                >
                  <CancelIcon className={classes.rejectIcon} />
                </Button>
              </div>
            </Tooltip>
          </li>
        </ul>
      </div>
      <Dialog
        open={openBankAccountsModal}
        handleClose={handleBankAccountModalClose}
      >
        <BankAccountModal
          invoiceId={data.Id}
          data={data.BankAccounts}
          activeId={data.BuyerBankAccountId}
          handleClose={handleBankAccountModalClose}
          handleUpdateBankAccount={handleUpdateBankAccount}
        />
      </Dialog>
      <Dialog
        open={openRejectModal}
        handleClose={handleRejectModalClose}
        maxWidth="md"
      >
        <RejectInvoiceModal
          data={rejectData}
          handleClose={handleRejectModalClose}
          handleRejectInvoice={handleRejectInvoice}
        />
      </Dialog>
    </>
  )
}

export default InvoiceItemDetails;