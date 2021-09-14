import { memo, useEffect, useState } from 'react';

import {
  getDaysInMonth,
  getMonth,
  getDate,
  isSameDay,
  setDate,
  addMonths,
  subMonths,
  addYears,
  subYears,
  isAfter,
  setMonth,
  isWithinInterval,
  setYear
} from 'date-fns';
import { 
  getShortWeeks, 
  getMonthsList,
  getYearsList, 
  localeFormat 
} from '../utils';

import { 
  DoubleArrowsLeft, 
  DoubleArrowsRight,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '../Icons';
import Box from '@material-ui/core/Box';
import CalendarInput from '../CalendarInput';
import { IconButton } from '../style';

import clsx from 'clsx';
import { useStyles } from './style';

const DAYS_IN_WEEK = 7;
const weeksShort = getShortWeeks();

function isWithinRange(defaultDate, currentDate, limit) {
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

const Calendar = ({
  selectedDate,
  limitDate,
  disabled,
  handleChangeDate,
  dateInput = false,
}) => {
  const classes = useStyles();

  const [monthDate, setMonthDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('default');

  const currentYear = monthDate.getFullYear();

  useEffect(() => {
    setMonthDate(selectedDate || new Date());
  }, [selectedDate]);

  const switchToCalendarView = () => {
    setCalendarView('default');
  }

  const switchToMonthsView = () => {
    setCalendarView('months');
  }

  const switchToDecadeView = () => {
    setCalendarView('decade')
  }

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

  const selectPrevDecade = () => {
    setMonthDate(
      setDate(
        subYears(monthDate, 10),
        1
      )
    )
  }

  const selectNextDecade = () => {
    setMonthDate(
      setDate(
        addYears(monthDate, 10),
        1
      )
    )
  }

  const handleKeyDown = (e, d) => {
    if (e.key === 'Enter') {
      handleChangeDate(d);
    }
  }

  const renderCalendarView = () => {
    const weeks = getWeeks(monthDate);

    return (
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
                        disabledDay = !isCurrentMonth || disabled,
                        withinRange = isWithinRange(selectedDate, day, limitDate);

                      return (
                        <div
                          key={day}
                          className={clsx(
                            classes.box,
                            classes.dayBox,
                            {
                              [classes.activeDay]: isDayActive,
                              [classes.withinRange]: withinRange,
                              [classes.firstBlock]: isDayActive && isAfter(limitDate, selectedDate),
                              [classes.lastBlock]: isDayActive && isAfter(selectedDate, limitDate),
                              [classes.disabledDay]: disabledDay,
                              [classes.disabledActiveDay]: isDayActive && disabledDay
                            }
                          )}
                          tabIndex={disabledDay ? -1 : 0}
                          onKeyDown={disabledDay ? undefined : (e) => handleKeyDown(e, day)}
                          onClick={
                            disabledDay
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
    )
  }

  const renderMonthsView = () => {
    const monthsList = getMonthsList();

    const selectMonth = (monthIdx) => {
      setMonthDate(prevDate => setMonth(prevDate, monthIdx));
      switchToCalendarView();
    }

    return (
      <div className={classes.monthsWrapper}>
        {
          monthsList.map((month, idx) => {
            return (
              <div 
                key={month} 
                className={classes.monthBox} 
                onClick={() => selectMonth(idx)}
              >
                <span className={classes.month}>
                  {month}
                </span>
              </div>
            )
          })
        }
      </div>
    )
  }

  const renderDecadeView = () => {
    const yearsList = getYearsList(currentYear-9, currentYear);

    const selectYear = (year) => {
      setMonthDate(prevDate => setYear(prevDate, Number(year)));
      switchToMonthsView();
    }

    return (
      <div className={classes.monthsWrapper}>
        {
          yearsList.map(year => {
            return (
              <div 
                key={year} 
                className={classes.monthBox} 
                onClick={() => selectYear(year)}
              >
                <span className={classes.month}>
                  {year}
                </span>
              </div>
            )
          })
        }
      </div>
    )
  }

  const renderCalendar = () => {
    switch (calendarView) {
      case 'default':
        return renderCalendarView();
      case 'months':
        return renderMonthsView();
      case 'decade':
        return renderDecadeView();
      default:
        return calendarView();
    }
  }

  const renderDateView = () => {
    if (calendarView === 'default') {
      return (
        <>
          <span 
            className={clsx(classes.highlighted, {
              [classes.disabledHighlighted]: disabled,
            })} 
            onClick={disabled ? undefined : switchToMonthsView}
          >
            {localeFormat(monthDate, 'MMMM')}
          </span>
          {' '}
          <span 
            className={clsx(classes.highlighted, {
              [classes.disabledHighlighted]: disabled
            })} 
            onClick={disabled ? undefined : switchToDecadeView}>
            {localeFormat(monthDate, 'yyyy')}
          </span>
        </>
      )
    }

    if (calendarView === 'months') {
      return (
        <span onClick={switchToCalendarView}>
          {localeFormat(monthDate, 'yyyy')}
        </span>
      )
    }

    if (calendarView === 'decade') {
      const yearsList = getYearsList(currentYear-9, currentYear);

      return (
        <span onClick={switchToMonthsView}>
          {`${yearsList[0]} - ${yearsList[yearsList.length - 1]}`}
        </span>
      )
    }
  }

  console.log(selectedDate);

  return (
    <div className={classes.root}>
      {
        dateInput ? (
          <Box marginBottom="20px">
            <CalendarInput
              date={selectedDate}
              disabled={disabled}
              onChange={disabled ? undefined : handleChangeDate}
            />
          </Box>
        ) : null
      }
      <div className={classes.controlsWrapper}>
        <IconButton
          onClick={
            disabled 
              ? undefined 
              : ['months', 'decade'].includes(calendarView)
                ? selectPrevDecade
                : selectPrevYear
          }
          disabled={disabled}
        >
          <DoubleArrowsLeft className={classes.icon} />
        </IconButton>
        <IconButton
          onClick={
            disabled 
              ? undefined 
              : ['months', 'decade'].includes(calendarView)
                ? selectPrevYear
                : selectPrevMonth
          }
          disabled={disabled}
        >
          <ChevronLeftIcon className={classes.chevron} />
        </IconButton>
        <span className={clsx(classes.dateOutput, {
          [classes.yearOutput]: ['months', 'decade'].includes(calendarView)
        })}>
          {renderDateView()}
        </span>
        <IconButton
          onClick={
            disabled 
              ? undefined 
              : ['months', 'decade'].includes(calendarView)
                ? selectNextYear
                : selectNextMonth
            }
          disabled={disabled}
        >
          <ChevronRightIcon className={classes.chevron} />
        </IconButton>
        <IconButton
          onClick={
            disabled 
              ? undefined 
              : ['months', 'decade'].includes(calendarView)
                ? selectNextDecade
                : selectNextYear
          }
          disabled={disabled}
        >
          <DoubleArrowsRight className={clsx(classes.icon, classes.arrowRight)} />
        </IconButton>
      </div>
      {renderCalendar()}
    </div>
  )
}

export default memo(Calendar);