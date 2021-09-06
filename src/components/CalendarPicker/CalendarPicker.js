import React, { useState } from 'react';
import { makeStyles, Button, Popover } from '@material-ui/core';
import { CalendarIcon } from 'components/Icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Calendar from 'components/Calendar';
import format from 'date-fns/format';
import { toDate, addDays } from 'date-fns/esm';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { isDisabledDate } from 'helpers';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 360,
    width: '100%',
    padding: 8,
    background: '#fff',
    border: '1px solid rgba(151,151,151,0.3)',
    borderRadius: 2,
    cursor: 'pointer'
  },
  calendarIcon: {
    fill: '#979797'
  },
  date: {
    display: 'block',
    marginLeft: 15,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 300,
    color: '#333'
  },
  button: {
    position: 'absolute',
    top: '50%',
    right: 8,
    minWidth: 'auto',
    padding: 2,
    borderRadius: '50%',
    transform: 'translateY(-50%)'
  },
  expandIcon: {
    fontSize: '1rem',
    color: '#333333',
    transition: '.15s linear'
  },
  activeExpandIcon: {
    transform: 'rotate(180deg)'
  },
  calendarWrapper: {
    padding: 20,
    background: '#F8F8F8',
    boxShadow: '0 0 10px 0 #D8E1E8'
  },
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20
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
      color: '#fff',
      opacity: .5
    }
  }
})

const CalendarPicker = ({
  currentDate,
  comparedDate,
  handleChangeCurrentDate
}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [localDate, setLocalDate] = useState(
    comparedDate 
      ? isDisabledDate(new Date(), comparedDate)
        ? addDays(comparedDate, 1)
        : new Date()
      : new Date()
  );

  const isCalendarModalOpen = !!anchorEl;

  const handleOpenCalendar = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleCloseCalendar = () => {
    setAnchorEl(null);
  }

  const handleChangeDate = date => {
    setLocalDate(date);
  }

  const handleSetCurrentDate = () => {
    handleChangeCurrentDate(toDate(localDate));
    handleCloseCalendar();
  }

  const formatedDate = currentDate ? format(currentDate, 'd.M.yyyy') : null;
  const isDisabledButton = comparedDate ? isDisabledDate(localDate, comparedDate) : false;

  return (
    <>
      <div className={classes.root} onClick={handleOpenCalendar}>
        <CalendarIcon className={classes.calendarIcon} />
        <span className={classes.date}>{formatedDate}</span>
        <Button
          classes={{
            root: classes.button
          }}
        >
          <ExpandMoreIcon className={clsx(classes.expandIcon, {
            [classes.activeExpandIcon]: isCalendarModalOpen 
          })} />
        </Button>
      </div>
      <Popover
        classes={{
          root: classes.popoverRoot
        }}
        open={isCalendarModalOpen}
        anchorEl={anchorEl}
        onClose={handleCloseCalendar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transitionDuration={250}
      >
        <div className={classes.calendarWrapper}>
          <Calendar
            currentDate={localDate}
            comparedDate={comparedDate}
            handleChangeDate={handleChangeDate}
          />
          <div className={classes.actionsWrapper}>
            <Button
              classes={{
                root: classes.cancelBtn
              }}
              onClick={handleCloseCalendar}
            >
              {t('#button.cancel')}
            </Button>
            <Button 
              classes={{
                root: classes.resolveBtn
              }}
              onClick={handleSetCurrentDate}
              disabled={isDisabledButton}
            >
              {t('#button.apply')}
            </Button>
          </div>
        </div>
      </Popover>
    </>
  )
}

export default CalendarPicker;