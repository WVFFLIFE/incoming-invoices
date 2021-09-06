import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import find from 'lodash/find';
import { useTranslation } from 'react-i18next';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Tooltip } from 'components';
import {isRejectedInvoice, formatDate, getText} from 'helpers';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: '15px 20px 30px 50px',
    boxShadow: '0 11px 15px 0 rgba(0,0,0,0.05)'
  },
  ul: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    width: 'calc(100% / 3)',
  },
  li: {
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0
    }
  },
  liFlex: {
    display: 'flex'
  },
  label: {
    marginRight: 5,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    lineHeight: '17px',
    color: 'rgba(0,0,0,0.5)'
  },
  text: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    lineHeight: '17px',
    color: '#000'
  },
  comment: {
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 400,
    lineHeight: '17px',
    color: '#000'
  },
  col: {
    display: 'flex',
    flexDirection: 'column'
  },
  invoiceNumber: {
    textDecoration: 'underline'
  },
  rejectIcon: {
    fontSize: '0.7rem',
    color: '#fff'
  },
  rejectWrapper: {
    display: 'flex',
  },
  rejectText: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    letterSpacing: 0.2,
    color: '#DB0041'
  },
  infoIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 6,
    borderRadius: '50%',
    cursor: 'pointer',
    transition: '.25s linear',
    '&:hover': {
      background: '#F0F3F7'
    }
  },
  infoIcon: {
    fontSize: '1rem',
    color: '#DB0041'
  },
  backgroundRoot: {
    background: 'rgba(255,71,71,0.05)'
  },
})

const PaidInvoiceItemDetails = ({
  data,
  searchTerm
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const getTextView = getText(searchTerm);
  const currentBankAccount = find(data.BankAccounts, { Id: data.BuyerBankAccountId })
  const InvoiceDate = formatDate(data.InvoiceDate);
  const AccountingDate = formatDate(data.AccountingDate);

  return (
    <div className={clsx(classes.root, {
      [classes.backgroundRoot]: isRejectedInvoice(data)
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
          <span className={classes.text}>{getTextView(currentBankAccount?.Name)}</span>
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
                <Tooltip
                  placement="bottom-start"
                  arrow
                  title={data.RejectComment}
                >
                  <div className={classes.infoIconWrapper}>
                    <InfoOutlinedIcon className={classes.infoIcon} />
                  </div>
                </Tooltip>
              </div>
            ) : (
                <span className={classes.text}>
                  {getTextView(data.InvoiceStatus.Label)}
                </span>
              )
          }
        </li>
        <li className={classes.li}>
          <span className={classes.label}>{t('#details.invoicedate')}:</span>
          <span className={classes.text}>{getTextView(InvoiceDate)}</span>
        </li>
        <li className={classes.li}>
          <span className={classes.label}>{t('#details.accountingdate')}:</span>
          <span className={classes.text}>{getTextView(AccountingDate)}</span>
        </li>
      </ul>
      <ul className={classes.ul}>
        <li className={clsx(classes.li, classes.col)}>
          <span className={classes.label}>{t('#details.comments')}:</span>
          <span className={classes.comment}>{getTextView(data.Comment)}</span>
        </li>
      </ul>
    </div>
  )
}

export default PaidInvoiceItemDetails;