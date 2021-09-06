import React, { useState } from 'react';
import {
  makeStyles,
  Button
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {formatNum, formatDate} from 'helpers';

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
  dataWrapper: {
    display: 'flex',
    marginBottom: 30,
    background: '#F4F9FD'
  },
  contentWrapper: {
    width: 'calc(100% / 4)',
    padding: '25px 15px',
    textAlign: 'center'
  },
  name: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    color: '#333333'
  },
  description: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '500',
    color: '#333'
  },
  dueDate: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 300,
    color: '#333'
  },
  balance: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '500',
    color: '#333'
  },
  label: {
    display: 'block',
    marginBottom: 15,
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: '400',
    letterSpacing: 0.2,
    color: '#000'
  },
  textarea: {
    display: 'block',
    width: '100%',
    minHeight: 122,
    padding: 12,
    border: '1px solid rgba(151,151,151,0.3)',
    borderRadius: 2,
    resize: 'none'
  },
  disabled: {
    color: '#fff',
    opacity: '.5',
  }
});

const RejectInvoiceModal = ({
  data,
  handleClose,
  handleRejectInvoice
}) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const [rejectText, setRejectText] = useState('');

  const DueDate = formatDate(data.DueDate);

  const handleChangeText = (e) => {
    const { value } = e.target;
    setRejectText(value)
  }

  const handleApplyClick = () => {
    handleRejectInvoice(data.Id, rejectText);
    handleClose();
  }

  return (
    <>
      <h2 className={classes.title}>
        {t('#modal.reject.title')}
      </h2>
      <div className={classes.dataWrapper}>
        <div className={classes.contentWrapper}>
          <span className={classes.name}>{data.Payer}</span>
        </div>
        <div className={classes.contentWrapper}>
          <span className={classes.description}>{data.Seller}</span>
        </div>
        <div className={classes.contentWrapper}>
          <span className={classes.dueDate}>{DueDate}</span>
        </div>
        <div className={classes.contentWrapper}>
          <span className={classes.balance}>{formatNum(data.Amount)}</span>
        </div>
      </div>
      <div className={classes.reasonWrapper}>
        <label className={classes.label}>
          {t('#modal.reject.label')}
        </label>
        <textarea
          className={classes.textarea}
          placeholder={t('#modal.reject.placeholder')}
          value={rejectText}
          onChange={handleChangeText}
        />
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
          disabled={rejectText.trim() === ''}
        >
          {t("#modal.reject.button.apply")}
        </Button>
      </div>
    </>
  )
}

export default React.memo(RejectInvoiceModal);