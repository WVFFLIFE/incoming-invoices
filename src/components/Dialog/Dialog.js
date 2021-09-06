import React from 'react';
import {
  makeStyles,
  Dialog as MuiDialog,
  Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  dialog: {
    '& .MuiBackdrop-root': {
      background: 'rgba(27,27,27,0.1)'
    }
  },
  rounded: {
    background: '#fff',
    borderRadius: 0
  },
  childrenRoot: {
    position: 'relative',
    padding: 40,
    paddingTop: 50
  },
  button: {
    position: 'absolute',
    top: 20,
    right: 20,
    minWidth: 'auto',
    padding: 2,
    borderRadius: '50%'
  },
  closeIcon: {
    fontSize: '1.3rem',
    color: '#646367'
  },
})

const Dialog = ({
  open,
  handleClose,
  children,
  maxWidth = 'lg',
  fullWidth = true,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <MuiDialog
      classes={{
        root: classes.dialog
      }}
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        classes: {
          rounded: classes.rounded
        }
      }}
      {...rest}
    >
      <div className={classes.childrenRoot}>
        <Button className={classes.button} onClick={handleClose}>
          <CloseIcon className={classes.closeIcon} />
        </Button>
        {children}
      </div>
    </MuiDialog>
  )
}

export default React.memo(Dialog);