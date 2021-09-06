import React, { memo, useState, useMemo } from 'react';
import {
  isAfter, isSameDay,
  getDaysInMonth, getMonth, getYear,
  setMonth, setYear, getDate, isWithinInterval
} from 'date-fns';
import { getMonthsList, getYearsList, getShortWeeks } from 'helpers';

import Select from 'components/Select';

import clsx from 'clsx';
import { useStyles } from './style';

const DAYS_IN_WEEK = 7;

function isInRange(defaultDate, currentDate, limit) {
  if (!defaultDate || !limit) {
    return false;
  }

  let start = isAfter(defaultDate, limit) ? limit : defaultDate;
  let end = !isAfter(defaultDate, limit) ? limit : defaultDate;

  return isWithinInterval(currentDate, { start, end })
}

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

const weekShort = getShortWeeks();
const yearsList = getYearsList(2000, 2030);
const monthsList = getMonthsList();

const DefaultCalendar = ({
  date,
  disabled,
  limitDate,
  onChange
}) => {
  const classes = useStyles();

  let d = new Date();
  
  const [currentMonth, setCurrentMonth] = useState(date ? getMonth(date) : getMonth(d));
  const [currentYear, setCurrentYear] = useState(date ? getYear(date) : getYear(d));

  const currentDate = useMemo(() => {
    let newD = date || new Date();
    newD = setMonth(
      setYear(
        newD,
        currentYear
      ),
      currentMonth
    );

    return newD;
  }, [currentYear, currentMonth, date]);

  const weeks = useMemo(() => {
    let defaultDate = date || new Date();

    defaultDate = setYear(setMonth(defaultDate, currentMonth), currentYear);

    return getWeeks(defaultDate);
  }, [date, currentMonth, currentYear]);

  const handleChangeYear = (e, year) => {
    setCurrentYear(year);
  }

  const handleChangeMonth = (e, newMonth) => {
    const idx = monthsList.findIndex(month => month === newMonth);
    setCurrentMonth(idx);
  }

  const handeChangeDay = (day) => {
    onChange(
      date 
        ? isSameDay(day, currentDate)
          ? null
          : day
        : day
    )
  } 

  return (
    <div className={classes.calendar} >
      <div className={classes.controls}>
        <Select
          disabled={disabled}
          options={monthsList}
          value={monthsList[currentMonth]}
          onChange={handleChangeMonth}
        />
        <Select
          disabled={disabled}
          value={currentYear}
          options={yearsList}
          onChange={handleChangeYear}
        />
      </div>
      <div className={classes.minHeight}>
        <div className={classes.weekTitlesWrapper}>
          {weekShort.map(item => {
            return (
              <div className={clsx(classes.block, classes.weekBlock)} key={item}>
                <span className={classes.weekTitle}>{item}</span>
              </div>
            )
          })}
        </div>
        <div className={classes.dateWrapper}>
          {
            weeks.map((week, index) => {
              return (
                <div className={classes.week} key={index}>
                  {week.map(day => {
                    const isCurrentMonth = getMonth(currentDate) === getMonth(day);
                    const isDayActive = isSameDay(date, day);
                    const disabledDay = disabled || !isCurrentMonth;
                    const inRange = isInRange(date, day, limitDate);

                    return (
                      <div
                        key={day}
                        onClick={disabledDay ? undefined : () => handeChangeDay(day)}
                        className={clsx(classes.block, {
                          [classes.disabledBlock]: disabledDay,
                          [classes.inRange]: inRange,
                          [classes.activeBlock]: isDayActive,
                          [classes.firstBlock]: (
                              isDayActive &&
                              isAfter(limitDate, date)
                          ),
                          [classes.lastBlock]: (
                            isDayActive &&
                            isAfter(date, limitDate)
                          )
                        })}
                      >
                        <span className={clsx(classes.day, {
                          [classes.disabledDay]: disabledDay,
                          [classes.activeDay]: isDayActive
                        })}>{getDate(day)}</span>
                      </div>
                    )
                  })}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default memo(DefaultCalendar);