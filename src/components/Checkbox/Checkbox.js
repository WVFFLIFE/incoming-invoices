import React from 'react';
import {
  makeStyles,
  Checkbox as MuiCheckbox
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';

const useStyles = makeStyles({
  checkboxIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 13,
    height: 13,
    border: '1px solid #64798F'
  },
  checkedCheckboxIcon: {
    background: '#218D7A',
    borderColor: '#218D7A'
  },
  checkIcon: {
    fontSize: '0.8rem',
    color: '#fff'
  },
  checkboxRoot: {
    padding: 0,
    color: '#218D7A'
  },
  colorSecondary: {
    '&.Mui-disabled': {
      opacity: .3
    }
  }
})

const Checkbox = ({
  onChange,
  checked = false,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <MuiCheckbox
      classes={{
        root: classes.checkboxRoot,
        colorSecondary: classes.colorSecondary
      }}
      onChange={onChange}
      checked={checked}
      icon={<span className={classes.checkboxIcon}></span>}
      checkedIcon={(
        <span className={clsx(classes.checkboxIcon, classes.checkedCheckboxIcon)}>
          <CheckIcon className={classes.checkIcon} />
        </span>
      )}
      {...rest}
    />
  )
}

export default React.memo(Checkbox)