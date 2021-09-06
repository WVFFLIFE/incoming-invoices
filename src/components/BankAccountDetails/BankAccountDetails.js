import React from 'react';
import { useTranslation } from 'react-i18next';
import {formatNum, formatDate} from 'helpers';

import clsx from 'clsx';
import { useStyles } from './style';

const BankAccountDetails = ({
  data
}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const lastUpdated = formatDate(data.LastUpdated, 'd.M.yyyy | HH:mm');

  return (
    <div className={classes.root}>
      <div className={classes.contentWrapper}>
        <span className={classes.label}>{t('#details.bankaccountname')}:</span>
        <a 
          href={`${window.location.origin}${data.Link}`}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.text}
        >
          {data.Name}
        </a>
      </div>
      <div className={classes.contentWrapper}>
        <span className={classes.label}>{t('#details.operator')}:</span>
        <span className={classes.text}>{data.Operator.Name}</span>
      </div>
      <div className={clsx(classes.contentWrapper, classes.alignRight)}>
        <span className={classes.amountLabel}>{t('#table.cell.amount.limit')}</span>
        <span className={classes.amountText}>{formatNum(data.Limit)}</span>
      </div>
      <div className={clsx(classes.contentWrapper, classes.alignRight)}>
        <span className={classes.amountLabel}>{t('#table.cell.amount.allowedbalance')}</span>
        <span className={classes.amountText}>{formatNum(data.AllowedBalance)}</span>
      </div>
      <div className={clsx(classes.contentWrapper, classes.alignRight)}>
        <span className={classes.amountLabel}>{t('#table.cell.amount.balance')}</span>
        <span className={classes.amountText}>{formatNum(data.Balance)}</span>
      </div>
      <div className={classes.contentWrapper}>
        <span className={classes.label}>{t('#details.description')}:</span>
        <span className={classes.text}>{data.Description}</span>
      </div>
      <div className={classes.contentWrapper}>
        <span className={classes.label}>{t('#details.lastupdated')}:</span>
        <span className={classes.text}>{lastUpdated}</span>
      </div>
    </div>
  )
}

export default BankAccountDetails;