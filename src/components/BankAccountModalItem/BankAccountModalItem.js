import React from 'react';
import {makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import {formatNum} from 'helpers';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    cursor: 'pointer',
    transition: '.15s linear',
    '&:hover': {
      background: '#F4F9FD'
    }
  },
  activeRoot: {
    background: '#F4F9FD',
    cursor: 'default',
  },
  contentWrapper: {
    width: 'calc(100% / 6)',
    padding: 13,
    '&:nth-child(4), &:nth-child(5), &:nth-child(6)': {
      textAlign: 'right'
    }
  },
  text: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    letterSpacing: 0.23,
    color: '#30344B'
  },
  name: {
    fontWeight: 700,
  },
  description: {
    fontWeight: 400
  },
  amount: {
    fontFamily: 'Proxima Nova',
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: 0.25,
    color: '#000'
  },
  balance: {
    fontWeight: 700,
    color: "#224060",
    textDecoration: 'underline'
  }
});

const BankAccountModalItem = ({
  data,
  isActive,
  handleClick
}) => {
  const classes = useStyles();

  return (
    <div
      onClick={isActive ? () => {} : () => handleClick(data.Id)} 
      className={clsx(classes.root, {
        [classes.activeRoot]: isActive
      })}
    >
      <div className={classes.contentWrapper}>
        <span className={clsx(classes.name, classes.text)}>{data.Name}</span>
      </div>
      <div className={classes.contentWrapper}>
        <span className={clsx(classes.text, classes.description)}>{data.Description}</span>
      </div>
      <div className={classes.contentWrapper}>
        <span className={clsx(classes.name, classes.text)}>{data?.Operator?.Name}</span>
      </div>
      <div className={classes.contentWrapper}>
        <span className={classes.amount}>{formatNum(data.Limit)}</span>
      </div>
      <div className={classes.contentWrapper}>
        <span className={classes.amount}>{formatNum(data.AllowedBalance)}</span>
      </div>
      <div className={classes.contentWrapper}>
        <span className={clsx(classes.amount, classes.balance)}>{formatNum(data.Balance)}</span>
      </div>
    </div>
  )
}

export default BankAccountModalItem;