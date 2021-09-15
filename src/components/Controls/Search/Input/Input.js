import { useEffect, useRef } from "react";

import { SearchIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

const Input = ({
  value,
  onChange,
  onClose
}) => {
  const inputRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      onClose();
    }
  }

  return (
    <div className={classes.searchWrapper}>
      <div className={classes.relative}>
        <SearchIcon className={classes.searchIcon} />
        <input
          className={clsx('picker', classes.root)}
          ref={inputRef}
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyDown}
        />
      </div>
    </div>
  )
}

export default Input;