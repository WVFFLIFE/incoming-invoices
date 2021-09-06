import React, { useState } from 'react';
import {
  makeStyles,
  Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from 'components/Checkbox';
import clsx from 'clsx';
import DatePicker from 'components/DatePicker';
import CancelIcon from '@material-ui/icons/CancelPresentationOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { MessageIcon, TimeIcon } from 'components/Icons'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  title: {
    margin: 0,
    marginBottom: 30,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
    textAlign: 'center'
  },
  clearIcon: {
    marginRight: 7,
    fontSize: '0.9rem',
    color: "#30344B"
  },
  clearText: {
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 700,
    color: '#224060'
  },
  clearButton: {
    minWidth: 'auto',
    padding: '5px 10px',
    borderRadius: 10,
    textTransform: 'none'
  },
  clearWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  customText: {
    margin: 0,
    marginBottom: 25,
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 400,
    color: '#000'
  },
  filtersWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 40,
  },
  filter: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 25,
    '&:last-child': {
      marginBottom: 0
    }
  },
  filterName: {
    marginLeft: 12,
    marginRight: 10,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    color: '#000'
  },
  icon: {
    fontSize: '1rem'
  },
  redIcon: {
    color: '#DB0041'
  },
  greenIcon: {
    color: "#218D7A"
  },
  pendingIcon: {
    color: "#64798F"
  },
  messageIcon: {
    fill: '#224060'
  },
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
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
  }
})

const PaidFilterModal = ({
  handleClose,
  handleApplyFilters,
  defaultFilters,
  handleChangeFilter
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [filterConfig, setFilterConfig] = useState(defaultFilters || {
    rejected: false,
    paid: false,
    pending: false,
    withComments: false,
    accountingDate: {
      start: null,
      end: null
    },
    paymentDate: {
      start: null,
      end: null
    }
  });

  const handleChangeCheckboxStatus = (filter) => {
    setFilterConfig(prevState => ({
      ...prevState,
      [filter]: !prevState[filter]
    }))
  }

  const clearConfig = () => {
    setFilterConfig({
      rejected: false,
      paid: false,
      pending: false,
      withComments: false,
      accountingDate: {
        start: null,
        end: null
      },
      paymentDate: {
        start: null,
        end: null
      }
    })
  };

  const handleChangeAccountingDate = (dates) => {
    setFilterConfig(prevState => ({
      ...prevState,
      accountingDate: { ...dates }
    }))
  }

  const handleChangePaymentDate = (dates) => {
    setFilterConfig(prevState => ({
      ...prevState,
      paymentDate: { ...dates }
    }))
  }

  const handleApply = () => {
    handleApplyFilters(filterConfig);

    if (
      filterConfig.accountingDate.start ||
      filterConfig.accountingDate.end ||
      filterConfig.paymentDate.start ||
      filterConfig.paymentDate.end
    ) {
      handleChangeFilter('all');
    }

    handleClose();
  }

  return (
    <>
      <h2 className={classes.title}>
        {t('#modal.filter.title')}
      </h2>
      <div className={classes.clearWrapper}>
        <Button onClick={clearConfig} classes={{
          root: classes.clearButton
        }}>
          <CloseIcon className={classes.clearIcon} />
          <span className={classes.clearText}>
            {t('#modal.filter.clear')}
          </span>
        </Button>
      </div>
      <div className={classes.filtersWrapper}>
        <p className={classes.customText}>
          {t('#modal.filter.specialstatus')}
        </p>
        <div className={classes.filter}>
          <Checkbox
            checked={filterConfig.rejected}
            onChange={() => handleChangeCheckboxStatus('rejected')}
          />
          <span className={classes.filterName}>
            {t('#modal.filter.paidtab.rejected')}
          </span>
          <CancelIcon className={clsx(classes.icon, classes.redIcon)} />
        </div>
        <div className={classes.filter}>
          <Checkbox
            checked={filterConfig.paid}
            onChange={() => handleChangeCheckboxStatus('paid')}
          />
          <span className={classes.filterName}>
            {t('#modal.filter.paid')}
          </span>
          <CheckCircleOutlineIcon className={clsx(classes.icon, classes.greenIcon)} />
        </div>
        <div className={classes.filter}>
          <Checkbox
            checked={filterConfig.pending}
            onChange={() => handleChangeCheckboxStatus('pending')}
          />
          <span className={classes.filterName}>
            {t('#modal.filter.pendingpaid')}
          </span>
          <TimeIcon className={classes.pendingIcon} />
        </div>
      </div>
      <div className={classes.filtersWrapper}>
        <p className={classes.customText}>
          {t('#modal.filter.additionalinformation')}
        </p>
        <div className={classes.filter}>
          <Checkbox
            checked={filterConfig.withComments}
            onChange={() => handleChangeCheckboxStatus('withComments')}
          />
          <span className={classes.filterName}>
            {t('#modal.filter.includscomment')}
          </span>
          <MessageIcon className={classes.messageIcon} />
        </div>
      </div>
      <div className={classes.filtersWrapper}>
        <p className={classes.customText}>
          {t('#modal.filter.accountingdate')}
        </p>
        <div className={classes.filter}>
          <DatePicker 
            start={filterConfig.accountingDate.start}
            end={filterConfig.accountingDate.end}
            disabled={
              Boolean(filterConfig.paymentDate.start || filterConfig.paymentDate.end)
            }
            handleChangeDate={handleChangeAccountingDate}
          />
        </div>
      </div>
      <div className={classes.filtersWrapper}>
        <p className={classes.customText}>
          {t('#modal.filter.paymentdate')}
        </p>
        <div className={classes.filter}>
          <DatePicker 
            start={filterConfig.paymentDate.start}
            end={filterConfig.paymentDate.end}
            disabled={
              Boolean(filterConfig.accountingDate.start || filterConfig.accountingDate.end)
            }
            handleChangeDate={handleChangePaymentDate}
          />
        </div>
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
            root: classes.resolveBtn
          }}
          onClick={handleApply}
        >
          {t('#modal.filter.apply')}
        </Button>
      </div>
    </>
  )
}

export default PaidFilterModal;