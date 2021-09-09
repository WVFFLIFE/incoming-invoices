import { memo, useState, useEffect } from 'react';

import format from 'date-fns/format';
import isValid from 'date-fns/isValid';

import { useStyles } from './style';
import clsx from 'clsx';

const parseDate = (d) => {
  let regex = /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.]\d{4}$/;
  let dateStr = d.replace(/\/|-/g, '.');

  if (!regex.test(dateStr)) return null;

  let [dd, mm, yyyy] = dateStr.split('.');

  return new Date(`${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`)
}

const CalendarInput = ({
  className,
  disabled,
  date,
  pattern = 'd.M.yyyy',
  onChange,
}) => {
  const classes = useStyles();

  const [value, setValue] = useState('');
  const [validationError, setValidationError] = useState(false);

  const parsedDate = parseDate(value);

  useEffect(() => {
    setValue(date ? format(date, pattern) : '')
  }, [date, pattern])

  useEffect(() => {
    if (value === '') {
      setValidationError(false);
    } else {
      setValidationError(!isValid(parsedDate));
    }
    
  }, [parsedDate, value]);

  const handleChangeInput = (e) => {
    setValue(e.target.value);
  }

  const setNewDate = () => {
    onChange(
      validationError
        ? null
        : parsedDate
    );
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setNewDate();
    }
  }

  const onBlur = () => {
    setNewDate();
  }

  return (
    <input
      disabled={disabled}
      className={clsx(
        classes.root, 
        className,
        {
          [classes.error]: validationError
        }
      )}
      value={value}
      onChange={handleChangeInput}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
    />
  )
}

export default memo(CalendarInput);