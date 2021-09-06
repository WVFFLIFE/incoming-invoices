import { memo, useState } from 'react';

import {
  getDaysInMonth,
  getMonth,
  getDate,
  isSameDay,
  getYear,
  toDate,
  setDate,
  addMonths,
  subMonths,
  addYears,
  subYears,
} from 'date-fns';
import { getShortWeeks, localeFormat } from 'helpers';

import { DoubleArrowsLeft, DoubleArrowsRight } from 'components/Icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { IconButton } from 'components/StyledComponents';

import clsx from 'clsx';
import { useStyles } from './style';

const DAYS_IN_WEEK = 7;
const weeksShort = getShortWeeks();

function cloneDate(date) {
  return new Date(date.getTime())
}

function getDays(date) {
  let daysInMonth = getDaysInMonth(date)
  let days = []
  for (let index = 1; index <= daysInMonth; index++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), index))
  }
  return days
}

function getWeeks(date, { firstDayOfWeek = 1, forceSixRows = false } = {}) {
  let days = getDays(date)
  let daysInMonth = days.length
  let week = []
  let weeks = []

  // build weeks array
  days.forEach(day => {
    if (week.length > 0 && day.getDay() === firstDayOfWeek) {
      weeks.push(week)
      week = []
    }
    week.push(day)
    if (days.indexOf(day) === days.length - 1) {
      weeks.push(week)
    }
  })

  const firstWeek = weeks[0]
  for (let index = DAYS_IN_WEEK - firstWeek.length; index > 0; index--) {
    const outsideDate = cloneDate(firstWeek[0])
    outsideDate.setDate(firstWeek[0].getDate() - 1)
    firstWeek.unshift(outsideDate)
    daysInMonth++
  }

  const lastWeek = weeks[weeks.length - 1]
  for (let index = lastWeek.length; index < DAYS_IN_WEEK; index++) {
    const outsideDate = cloneDate(lastWeek[lastWeek.length - 1])
    outsideDate.setDate(lastWeek[lastWeek.length - 1].getDate() + 1)
    lastWeek.push(outsideDate)
    daysInMonth++
  }

  if (forceSixRows && daysInMonth < 42) {
    let lastDayOfMonth = weeks[weeks.length - 1][6]
    let lastWeek = []
    let index = 1
    while (daysInMonth < 42) {
      let lastDayOfMonthClone = cloneDate(lastDayOfMonth)
      let day = new Date(
        lastDayOfMonthClone.setDate(lastDayOfMonthClone.getDate() + index),
      )
      if (lastWeek.length > 0 && day.getDay() === firstDayOfWeek) {
        weeks.push(lastWeek)
        lastWeek = []
      }
      lastWeek.push(day)
      daysInMonth++
      index++
    }
    weeks.push(lastWeek)
  }

  return weeks
}

const Calendar = ({
  selectedDate,
  handleChangeDate
}) => {
  const classes = useStyles();

  const [monthDate, setMonthDate] = useState(() => selectedDate || new Date());

  const selectPrevYear = () => {
    setMonthDate(
      setDate(
        subYears(monthDate, 1),
        1
      )
    )
  }

  const selectNextYear = () => {
    setMonthDate(
      setDate(
        addYears(monthDate, 1),
        1
      )
    )
  }

  const selectPrevMonth = () => {
    setMonthDate(
      setDate(
        subMonths(monthDate, 1),
        1
      )
    )
  }

  const selectNextMonth = () => {
    setMonthDate(
      setDate(
        addMonths(monthDate, 1),
        1
      )
    )
  }

  const handleKeyDown = (e, d) => {
    if (e.key === 'Enter') {
      handleChangeDate(d);
    }
  }

  const weeks = getWeeks(monthDate);

  return (
    <div className={classes.root}>
      <div className={classes.controlsWrapper}>
        <IconButton onClick={selectPrevYear}>
          <DoubleArrowsLeft className={classes.icon}/>
        </IconButton>
        <IconButton onClick={selectPrevMonth}>
          <ChevronLeftIcon className={classes.chevron}/>
        </IconButton>
        <span className={classes.dateOutput}>
          {localeFormat(monthDate, 'MMMM yyyy')}
        </span>
        <IconButton onClick={selectNextMonth}>
          <ChevronRightIcon className={classes.chevron}/>
        </IconButton>
        <IconButton onClick={selectNextYear}>
          <DoubleArrowsRight className={clsx(classes.icon, classes.arrowRight)}/>
        </IconButton>
      </div>
      <div>
        <div className={classes.shortWeeksWrapper}>
          {
            weeksShort.map(weekShort => (
              <div key={weekShort} className={classes.box}>
                <span className={classes.weekShort}>{weekShort}</span>
              </div>
            ))
          }
        </div>
        <div>
          {
            weeks.map((week, idx) => {
              return (
                <div key={idx} className={classes.row}>
                  {
                    week.map(day => {
                      const isCurrentMonth = getMonth(monthDate) === getMonth(day),
                        isDayActive = isSameDay(selectedDate, day),
                        disabled = !isCurrentMonth;

                      return (
                        <div 
                          key={day}
                          className={clsx(
                            classes.box, 
                            classes.dayBox,
                            {
                              [classes.activeDay]: isDayActive,
                              [classes.disabledDay]: disabled
                            }
                          )}
                          tabIndex={disabled ? -1 : 0}
                          onKeyDown={disabled ? undefined : (e) => handleKeyDown(e, day)}
                          onClick={
                            disabled 
                              ? undefined
                              : () => handleChangeDate(isDayActive ? null : day)
                          }
                        >
                          <span className={classes.day}>
                            {getDate(day)}
                          </span>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default memo(Calendar);