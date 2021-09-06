import React, { useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { FilterIcon } from 'components/Icons';
import Dialog from 'components/Dialog';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    marginLeft: 20
  },
  icon: {
    color: '#254262'
  },
  button: {
    padding: 4,
    minWidth: 'auto',
    borderRadius: '50%'
  },
  activeBtn: {
    background: '#35506E'
  },
  activeIcon: {
    color: '#fff'
  }
})

const FiltersControls = ({ 
  isActive, 
  children 
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <div className={classes.root}>
        <Button
          classes={{
            root: clsx(classes.button, {
              [classes.activeBtn]: isActive
            })
          }}
          onClick={handleOpen}
        >
          <FilterIcon className={clsx(classes.icon, {
            [classes.activeIcon]: isActive
          })} />
        </Button>
      </div>
      <Dialog
        open={open}
        handleClose={handleClose}
        maxWidth="xs"
      >
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            handleClose
          })
        })}
      </Dialog>
    </>
  )
}

export default FiltersControls;