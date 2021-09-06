import React from 'react';
import { makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { List } from 'react-virtualized';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { formatNum } from 'helpers';

const useStyles = makeStyles({
  successRoot: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  leftSide: {
    marginRight: 12
  },
  checkIcon: {
    color: '#218D7A'
  },
  successTitle: {
    margin: 0,
    marginBottom: 20,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    lineHeight: 1.1,
    color: '#30344B'
  },
  successDescription: {
    margin: 0,
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#30344B'
  },
  errorItemRoot: {
    marginBottom: 5,
    padding: 5,
    '&:last-child': {
      borderBottom: 0
    }
  },
  errorTextWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  errorIcon: {
    marginRight: 10,
    color: '#DB0041'
  },
  errorText: {
    margin: 0,
    fontFamily: 'Proxima Nova',
    fontSize: 15,
    fontWeight: 600,
    lineHeight: '20px',
    color: '#30344B'
  },
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 40
  },
  cancelBtn: {
    minWidth: 'auto',
    padding: '6px 24px',
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 700,
    border: 0,
    background: 'transparent',
    borderRadius: 20,
    color: '#224060',
    textDecoration: 'underline',
    textTransform: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  invoiceInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 10px',
    background: '#F4F9FD'
  },
  invoiceText: {
    display: 'block',
    marginRight: 10,
    fontFamily: 'Lato',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 700
  },
  medium: {
    fontWeight: 500
  },
  light: {
    fontWeight: 300
  }
})

const PaymentStatusModal = ({
  paidMessages
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const renderSuccess = () => {
    return (
      <div className={classes.successRoot}>
        <div className={classes.leftSide}>
          <CheckIcon className={classes.checkIcon} />
        </div>
        <div className={classes.rightSide}>
          <h2 className={classes.successTitle}>{t('#modal.pay.success.title')}</h2>
          <p className={classes.successDescription}>
            {t('#modal.pay.success.description')}
          </p>
        </div>
      </div>
    )
  }

  const renderError = ({ index, key, style }) => {
    const { Message, RelatedInvoice } = paidMessages[index];

    // const DueDate = formatDate(RelatedInvoice.DueDate);

    return (
      <div className={classes.errorItemRoot} key={key} style={style}>
        <div className={classes.errorTextWrapper}>
          <ErrorOutlineIcon className={classes.errorIcon} />
          <p className={classes.errorText}>{Message}</p>
        </div>
        <div className={classes.invoiceInfo}>
          <span className={clsx(classes.invoiceText, classes.bold)}>
            {RelatedInvoice.Payer.Name}
          </span>
          {/* <span className={clsx(classes.invoiceText, classes.medium)}>
            {RelatedInvoice.Seller}
          </span>
          <span className={clsx(classes.invoiceText, classes.light)}>
            {DueDate}
          </span> */}
          <span className={clsx(classes.invoiceText, classes.medium)}>
            {formatNum(RelatedInvoice.Amount)}
          </span>
        </div>
      </div>
    )
  }

  const renderErrorsList = () => {
    return (
      <List
        width={520}
        height={200}
        rowHeight={200}
        rowRenderer={renderError}
        rowCount={paidMessages.length}
        overscanRowCount={2}
        style={{ outline: 0 }}
      />
    )
  }

  const success = paidMessages.every(paidMessage => paidMessage.ResponseCode === 1)

  return success ? renderSuccess(): renderErrorsList()
}

export default React.memo(PaymentStatusModal);