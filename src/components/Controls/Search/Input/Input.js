import { useEffect, useRef } from "react";

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
    <input
      className={classes.root}
      ref={inputRef}
      value={value}
      onChange={onChange}
      onKeyPress={handleKeyDown}
    />
  )
}

export default Input;