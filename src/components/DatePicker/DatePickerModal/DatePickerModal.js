import React, { memo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { initTime } from 'helpers';
import { isAfter, isBefore } from 'date-fns';

import { Button } from '@material-ui/core';
import Calendar from 'components/DefaultCalendar';

import clsx from 'clsx';
import { useStyles } from './style';

const DatePickerModal = ({
  start,
  end,
  handleApply,
  handleClose
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [startDate, setStartDate] = useState(() => {
    return start ? initTime(start) : null
  })
  const [endDate, setEndDate] = useState(() => {
    return end ? initTime(end) : null;
  })

  const handleChangeStartDate = useCallback(
    (date) => {
      if (date && endDate) {
        setStartDate(date);

        if (isAfter(date, endDate)) {
          setEndDate(date)
        }

        return;
      }

      if (!date) {
        setEndDate(null)
      }

      setStartDate(date || null);
    },
    [endDate]
  )

  const handleChangeEndDate = useCallback(
    (date) => {
      if (date && startDate) {
        setEndDate(date);

        if (isBefore(date, startDate)) {
          setStartDate(date)
        }

        return;
      }
      setEndDate(date || null)
    },
    [startDate]
  )

  return (

    <div className={classes.root}>
      <div className={classes.calendarsWrapper}>
        <Calendar
          date={startDate}
          onChange={handleChangeStartDate}
          limitDate={endDate}
        />
        <Calendar
          date={endDate}
          disabled={!Boolean(startDate)}
          limitDate={startDate}
          onChange={handleChangeEndDate}
        />
      </div>
      <div className={classes.btnsWrapper}>
        <Button
          classes={{
            root: clsx(classes.btn, classes.cancelBtn)
          }}
          onClick={handleClose}
        >
          {t('#button.cancel')}
        </Button>
        <Button
          classes={{
            root: clsx(classes.btn, classes.applyBtn)
          }}
          onClick={() => handleApply(startDate, endDate)}
        >
          {t('#modal.filter.apply')}
        </Button>
      </div>
    </div>
  )
}

export default memo(DatePickerModal);