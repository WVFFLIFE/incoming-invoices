import React from 'react';
import { makeStyles, Button, RadioGroup } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Radio from 'components/Radio';
import { formatNum } from 'helpers';

const radioConfig = [
  {id: 'pay-now', value: 'paynow', label: '#radio.paynow'},
  {id: 'pay-to-due-date', value: 'paytoduedate', label: "#radio.paytoduedate"}
]

const useStyles = makeStyles({
  title: {
    margin: 0,
    marginBottom: 40,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
    textAlign: 'center'
  },
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 40
  },
  cancelBtn: {
    minWidth: 'auto',
    marginRight: 15,
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
  resolveBtn: {
    minWidth: 'auto',
    padding: '6px 24px',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    lineHeight: 'normal',
    letterSpacing: 0.23,
    border: 0,
    background: '#224060',
    borderRadius: 20,
    color: '#FFFFFF',
    textDecoration: 'none',
    textTransform: 'none',
    '&.Mui-disabled': {
      color: '#fff'
    }
  },
})

const PayInvoiceModal = ({
  handleClose,
  handleApply,
  amount,
  radioValue,
  setRadioValue
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleChangeRadioValue = (event) => {
    setRadioValue(event.target.value);
  };

  const handleApplyClick = () => {
    handleApply();
    handleClose();
  }

  return (
    <>
      <h2 className={classes.title}>
        {t('#modal.pay.title', { amount: formatNum(amount) })}
      </h2>
      <div>
        <RadioGroup>
          {radioConfig.map(({ id, label, value }) => {
            const checked = value === radioValue;

            return (
              <Radio 
                key={id}
                checked={checked}
                label={label}
                value={value}
                handleChange={handleChangeRadioValue}
              />
            )
          })}
        </RadioGroup>
      </div>
      <div className={classes.actionsWrapper}>
        <Button
          classes={{
            root: classes.cancelBtn
          }}
          onClick={handleClose}
        >
          {t('#button.cancel')}
        </Button>
        <Button
          classes={{
            root: classes.resolveBtn,
            disabled: classes.disabled
          }}
          onClick={handleApplyClick}
        >
          {t("#button.pay")}
        </Button>
      </div>
    </>
  )
}

export default PayInvoiceModal;