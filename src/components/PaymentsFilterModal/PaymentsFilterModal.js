import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from 'components/Checkbox';
import DatePicker from 'components/DatePicker';
import clsx from 'clsx';
import ErrorIcon from '@material-ui/icons/ErrorOutlineOutlined';
import CancelIcon from '@material-ui/icons/CancelPresentationOutlined';
import WarningIcon from '@material-ui/icons/ReportProblemOutlined';
import { MessageIcon } from 'components/Icons'
import { useTranslation } from 'react-i18next';

import { useStyles } from './style';

const PaymentsFilterModal = ({
  handleClose,
  handleApplyFilters,
  defaultFilters,
  handleChangeFilter
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [filterConfig, setFilterConfig] = useState(defaultFilters || {
    overdue: false,
    rejected: false,
    overdueSoon: false,
    withComments: false,
    withWarnings: false,
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

  const clearConfig = () => {
    setFilterConfig({
      overdue: false,
      rejected: false,
      overdueSoon: false,
      withComments: false,
      withWarnings: false,
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
            {t('#modal.filter.rejected')}
          </span>
          <CancelIcon className={clsx(classes.icon, classes.redIcon)} />
        </div>
        <div className={classes.filter}>
          <Checkbox
            checked={filterConfig.withWarnings}
            onChange={() => handleChangeCheckboxStatus('withWarnings')}
          />
          <span className={classes.filterName}>
            {t('#modal.filter.withwarnings')}
          </span>
          <WarningIcon className={clsx(classes.icon, classes.yellowIcon)} />
        </div>
        <div className={classes.filter}>
          <Checkbox
            checked={filterConfig.overdue}
            onChange={() => handleChangeCheckboxStatus('overdue')}
          />
          <span className={classes.filterName}>
            {t('#modal.filter.overdue')}
          </span>
          <ErrorIcon className={clsx(classes.icon, classes.redIcon)} />
        </div>
        <div className={classes.filter}>
          <Checkbox
            checked={filterConfig.overdueSoon}
            onChange={() => handleChangeCheckboxStatus('overdueSoon')}
          />
          <span className={classes.filterName}>
            {t('#modal.filter.overduesoon')}
          </span>
          <ErrorIcon className={clsx(classes.icon, classes.yellowIcon)} />
        </div>
      </div>
      <div className={classes.filtersWrapper}>
        <p className={classes.customText}>
          {t("#modal.filter.additionalinformation")}
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
      {/* <div className={classes.filtersWrapper}>
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
      </div> */}
      {/* <div className={classes.filtersWrapper}>
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
      </div> */}
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

export default PaymentsFilterModal;