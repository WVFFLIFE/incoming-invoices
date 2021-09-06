import { memo, forwardRef } from 'react';

import clsx from 'clsx';
import { useStyles } from './style';

const DropdownSearch = forwardRef(({
  disabled,
  value,
  onChange,
  ...rest
}, ref) => {
  const classes = useStyles();

  return (
    <input
      {...rest}
      ref={ref}
      type="text"
      className={clsx(classes.searchField, {
        [classes.disabled]: disabled
      })}
      value={value}
      onChange={disabled ? undefined : onChange}
    />
  )
});

export default memo(DropdownSearch);