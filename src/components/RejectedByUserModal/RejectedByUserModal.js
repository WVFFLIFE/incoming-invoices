import React from 'react';
import { makeStyles } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { formatNum } from 'helpers';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
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
  invoiceText: {
    display: 'block',
    marginRight: 10,
    fontFamily: 'Lato',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    '&:first-child': {
      textAlign: 'left'
    },
    '&:last-child': {
      marginRight: 0,
    }
  },
  bold: {
    fontWeight: 700
  },
  medium: {
    fontWeight: 500
  },
  light: {
    fontWeight: 300
  },
  invoiceInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: '20px 10px',
    background: '#F4F9FD',
    '&:last-child': {
      marginBottom: 0
    }
  },
})

const RejectedByUserModal = ({
  rejectedInvoices
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.errorItemRoot}>
      <div className={classes.errorTextWrapper}>
        <ErrorOutlineIcon className={classes.errorIcon} />
        <p className={classes.errorText}>
          {t("#modal.rejectbyusererror")}
        </p>
      </div>
      <div className={classes.invoiceInfoWrapper}>
        {
          rejectedInvoices.map(rejectedInvoice => (
            <div className={classes.invoiceInfo} key={rejectedInvoice.Id}>
              <span className={clsx(classes.invoiceText, classes.bold)}>
                {rejectedInvoice.Name}
              </span>
              <span className={clsx(classes.invoiceText, classes.medium)}>
                {formatNum(rejectedInvoice.Amount)}
              </span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default RejectedByUserModal;