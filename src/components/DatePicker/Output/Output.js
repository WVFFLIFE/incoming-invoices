import React, { memo } from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import ArrowIcon from '@material-ui/icons/ExpandMore';
import { DefaultCalendarIcon } from 'components/Icons';

import clsx from 'clsx';
import { ArrowButton, useStyles } from './style';

const Output = ({
  startDate,
  endDate,
  formatPattern = 'd.MM.yyyy',
  disabled,
  handleToggleVisibility
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div
      className={clsx(classes.root, {
        [classes.disabled]: disabled
      })}
      onClick={disabled ? undefined : handleToggleVisibility}
    >
      <div className={classes.contentWrapper}>
        <DefaultCalendarIcon className={classes.calendarIcon} />
        <span className={clsx(classes.text, {
          [classes.placeholder]: !startDate && !endDate
        })}>
          {
            startDate && endDate ? (
              <>
                {format(startDate, formatPattern)}
                {' '}
                {'-'}
                {' '}
                {format(endDate, formatPattern)}
              </>
            )
              : startDate
                ? format(startDate, formatPattern)
                : endDate
                  ? format(endDate, formatPattern)
                  : `- ${t("#datepicker.empty")} -`
          }
        </span>
      </div>
      <ArrowButton disabled={disabled}>
        <ArrowIcon className={classes.arrowIcon} />
      </ArrowButton>
    </div>
  )
}

export default memo(Output);