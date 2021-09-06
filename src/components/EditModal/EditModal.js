import React, { useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import CalendarPicker from 'components/CalendarPicker';
import { useTranslation } from 'react-i18next';
import { isDisabledDate } from 'helpers';
import addDays from 'date-fns/addDays';

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
      color: '#fff',
      opacity: .5
    }
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    display: 'block',
    marginBottom: 10,
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 400,
    letterSpacing: 0.2,
    color: '#000'
  }
})

const EditModal = ({
  comparedDate,
  handleClose,
  handleUpdateDate
}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const [currentDate, setCurrentDate] = useState(
    comparedDate 
      ? isDisabledDate(new Date(), comparedDate)
        ? addDays(comparedDate, 1)
        : new Date()
      : new Date()
  );

  const handleChangeCurrentDate = (newDate) => {
    setCurrentDate(newDate)
  }

  const handleSaveDate = () => {
    handleUpdateDate(currentDate);
    handleClose();
  }

  const isDisabledButton = comparedDate 
    ? isDisabledDate(currentDate, comparedDate) 
    : false;

  return (
    <>
      <h2 className={classes.title}>
        {t('#modal.edit.title')}
      </h2>
      <div className={classes.flexColumn}>
        <span className={classes.label}>
          {t('#details.accountingdate')}
        </span>
        <CalendarPicker
          currentDate={currentDate}
          comparedDate={comparedDate}
          handleChangeCurrentDate={handleChangeCurrentDate}
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
            root: classes.resolveBtn
          }}
          onClick={handleSaveDate}
          disabled={isDisabledButton}
        >
          {t('#button.apply')}
        </Button>
      </div>
    </>
  )
}

export default React.memo(EditModal);