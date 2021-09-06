import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  getDaysInMonth,
  getMonth,
  getDate,
  isSameDay,
  getYear,
  toDate
} from 'date-fns/esm';
import clsx from 'clsx';
import { getMonthsList, getYearsList, getShortWeeks, isDisabledDate } from 'helpers';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const DAYS_IN_WEEK = 7

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

const useStyles = makeStyles({
  calendar: {
    display: 'inline-flex',
    flexDirection: 'column',
    padding: 20,
    paddingBottom: 0,
    background: '#fff'
  },
  weekTitlesWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12
  },
  minHeight: {
    minHeight: 228,
  },
  block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 24,
    marginRight: 3,
    borderRadius: 2,
    cursor: 'pointer',
    transition: 'background-color .15s linear',
    '&:hover': {
      backgroundColor: '#F3F4F7'
    },
    '&:last-child': {
      marginRight: 0
    }
  },
  weekBlock: {
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'transparent',
    }
  },
  disabledBlock: {
    cursor: 'default',
    '&:hover': {
      background: 'transparent'
    }
  },
  activeBlock: {
    background: '#192b5d',
    '&:hover': {
      background: '#192b5d',
      cursor: 'default'
    }
  },
  weekTitle: {
    fontSize: 14,
    fontFamily: "Proxima Nova",
    fontWeight: 400,
    lineHeight: '20px',
    color: '#4A4A4A',
    textTransform: 'capitalize',
  },
  week: {
    display: 'flex',
    marginBottom: 7,
    '&:last-child': {
      marginBottom: 0
    }
  },
  day: {
    fontSize: 14,
    fontFamily: "Proxima Nova",
    fontWeight: 400,
    lineHeight: '20px',
    borderRadius: 2,
    color: '#646367',
  },
  disabledDay: {
    color: '#a1adce'
  },
  activeDay: {
    color: '#fff'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  textButton: {
    padding: 0
  },
  buttonRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    minWidth: 'auto',
    borderRadius: 6
  },
  buttonsWrapper: {
    display: 'flex'
  },
  arrowIcon: {
    fontSize: '1.3rem',
    color: '#192b5d'
  },
  currentMonth: {
    margin: 0,
    fontSize: 14,
    lineHeight: '20px',
    color: '#192B5D'
  },
  selectYearRoot: {
    width: 80,
    border: '1px solid rgba(151,151,151,0.3)',
    borderRadius: 2,
    boxSizing: 'border-box'
  },
  selectIcon: {
    fontSize: '1rem',
  },
  selectMonthRoot: {
    width: 130,
    border: '1px solid rgba(151,151,151,0.3)',
    borderRadius: 2,
    boxSizing: 'border-box'
  },
  endAdornment: {
    right: 5,
    top: 'calc(50% - 10px)'
  },
  input: {
    paddingLeft: '8px !important',
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 400,
    lineHeight: '16px',
    color: '#333',
    textTransform: 'capitalize'
  },
  option: {
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 400,
    textTransform: 'capitalize'
  }
})

const Calendar = ({
  currentDate,
  comparedDate,
  handleChangeDate
}) => {
  const classes = useStyles();
  const weeks = getWeeks(currentDate);
  const currentMonth = getMonth(currentDate);
  const currentYear = getYear(currentDate);

  const handleChangeYear = year => {
    const newDate = toDate(currentDate);
    newDate.setFullYear(year);
    handleChangeDate(newDate);
  }

  const handleChangeDay= day => {
    const newDate = toDate(currentDate);
    newDate.setDate(day);
    handleChangeDate(newDate);
  }

  const handleChangeMonth = month => {
    const newDate = toDate(currentDate);
    newDate.setMonth(month);
    handleChangeDate(newDate);
  }

  return (
    <div className={classes.calendar} >
      <div className={classes.controls}>
        <Autocomplete
          classes={{
            root: classes.selectMonthRoot,
            endAdornment: classes.endAdornment,
            option: classes.option
          }}
          onChange={(e, newValue) => {
            const idx = monthsList.findIndex(month => month === newValue);
            handleChangeMonth(idx);
          }}
          options={monthsList}
          value={monthsList[currentMonth]}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                classes: {
                  input: classes.input
                }
              }}
            />
          )}
          popupIcon={<ExpandMoreIcon className={classes.selectIcon} />}
          disableClearable
        />
        <Autocomplete
          classes={{
            root: classes.selectYearRoot,
            endAdornment: classes.endAdornment,
            option: classes.option
          }}
          options={yearsList}
          onChange={(e, newValue) => handleChangeYear(newValue)}
          getOptionLabel={option => String(option)}
          value={currentYear}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                classes: {
                  input: classes.input
                }
              }}
            />
          )}
          popupIcon={<ExpandMoreIcon className={classes.selectIcon} />}
          disableClearable
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
                    const currentDay = new Date(day);
                    const isCurrentMonth = getMonth(currentDate) === getMonth(day);
                    const isDayActive = isSameDay(currentDate, currentDay);
                    const disabledDay = !isCurrentMonth || isDisabledDate(new Date(day), comparedDate);

                    return (
                      <div
                        key={day}
                        onClick={disabledDay ? () => { } : () => handleChangeDay(getDate(currentDay))}
                        className={clsx(classes.block, {
                          [classes.disabledBlock]: disabledDay,
                          [classes.activeBlock]: isDayActive
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

export default React.memo(Calendar);