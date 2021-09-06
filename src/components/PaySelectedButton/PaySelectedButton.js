import React from 'react';
import {
  makeStyles,
  Button
} from '@material-ui/core';
import { IcArrowsIcon } from 'components/Icons';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {formatNum} from 'helpers';

const useStyles = makeStyles({
  button: {
    minWidth: 'auto',
    padding: '10px 15px',
    background: '#224060',
    borderRadius: 20,
  },
  icon: {
    color: "#fff"
  },
  text: {
    display: 'block',
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    letterSpacing: 0.32,
    color: '#FFFFFF',
    textTransform: 'none'
  },
  withAmount: {
    position: 'relative',
    '&::before': {
      content: "''",
      position: 'absolute',
      top: '50%',
      right: 0,
      width: 1,
      height: 17,
      background: '#fff',
      transform: 'translateY(-50%)'
    }
  },
  withError: {
    background: '#DB0041'
  },
  disabled: {
    opacity: .5
  },
  errorDisabled: {
    opacity: 1,
    background: '#DB0041'
  }
})

const PaySelectedButton = ({
  amount,
  error = false,
  handleClick,
  disabled,
  ...rest
}) => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <Button
      {...rest}
      classes={{
        root: clsx(classes.button, {
          [classes.withError]: error
        }),
        disabled: clsx(classes.disabled, {
          [classes.errorDisabled]: error
        })
      }}
      disabled={disabled || error}
      onClick={error ? () => {} : handleClick}
    >
      <IcArrowsIcon className={classes.icon} />
      <span className={clsx(classes.text, {
        [classes.withAmount]: amount !== null
      })}>{t('#button.payselected')}</span>
      {amount !== null ? <span className={classes.text}>{formatNum(amount)}</span> : null}
    </Button>
  )
}

export default PaySelectedButton;