import React, { useState, useRef, useEffect } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { SearchIcon } from 'components/Icons';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 5,
    borderRadius: 3,
    overflow: 'hidden',
  },
  rootActive: {
    boxShadow: 'inset 0 1px 4px 0 rgba(0,0,0,0.15)'
  },
  button: {
    position: 'absolute',
    top: '50%',
    left: 5,
    padding: 4,
    minWidth: 'auto',
    borderRadius: '50%',
    transform: 'translateY(-50%)'
  },
  inputRoot: {
    marginLeft: -155,
    transition: '.2s linear',
    visibility: 'hidden'
  },
  input: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
  },
  open: {
    marginLeft: 0,
    visibility: 'visible'
  },
  icon: {
    color: '#254262'
  }
})

const SearchControl = ({
  value,
  handleChangeValue
}) => {
  const classes = useStyles();
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      ref.current.focus();
    }
  }, [open]);

  const handleOpenClick = () => {
    setOpen(!open)
  }

  return (
    <div className={clsx(classes.root, {
      [classes.rootActive]: open
    })}>
      <Button
        onClick={handleOpenClick}
        classes={{
          root: classes.button
        }}
      >
        <SearchIcon
          className={classes.icon}
        />
      </Button>
      <TextField
        classes={{
          root: clsx(classes.inputRoot, {[classes.open]: open}),
        }}
        value={value}
        onChange={handleChangeValue}
        inputRef={ref}
        InputProps={{
          disableUnderline: true,
          classes: {
            input: classes.input
          }
        }}
      />
    </div>
  )
}

export default React.memo(SearchControl);