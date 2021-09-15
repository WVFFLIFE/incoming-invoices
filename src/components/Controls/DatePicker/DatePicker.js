import { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

import format from 'date-fns/format';

import CalendarWrapper from './CalendarWrapper';
import Dropdown from 'components/Dropdown';
import { CalendarIcon } from 'components/Icons';
import CalendarInput from './CalendarInput';
import { IconButton } from 'components/StyledComponents';

import clsx from 'clsx';
import { useStyles } from './style';

const DatePicker = ({
  currentDate,
  onChange,
  dateFormat = 'd.M.yyyy',
  disabled = false,
  dateInput = false,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const onOpen = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const onClose = () => {
    setAnchorEl(null);
  }

  return (
    <>
      <div onClick={disabled ? undefined : onOpen} className={clsx(
        'picker', 
        classes.root,
        {
          [classes.disabled]: disabled
        }
      )}>
        {/* <IconButton className={classes.iconButton}>
          <CalendarIcon className={classes.icon} />
        </IconButton>
        <CalendarInput
          className={classes.input}
          date={currentDate}
          onClick={preventClick}
          onChange={console.log}
        /> */}
        <IconButton 
          className={classes.iconButton}
          disabled={disabled}
        >
          <CalendarIcon className={classes.icon} />
        </IconButton>
        <span className={clsx(classes.output, {
          [classes.empty]: !currentDate
        })}>
          {
            currentDate
              ? format(currentDate, dateFormat)
              : `- ${t("#control.selectdate")} -`
          }
        </span>
      </div>
      <Dropdown 
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={onClose}
      >
        <CalendarWrapper
          onChange={onChange}
          currentDate={currentDate}
          onClose={onClose}
          dateInput={dateInput}
        />
      </Dropdown>
    </>
  )
}

export default memo(DatePicker);