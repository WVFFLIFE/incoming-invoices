import React from 'react';
import {
  Backdrop as MuiBackdrop,
  Modal,
} from '@material-ui/core';
import { useStyles } from './style';

const Backdrop = ({
  open,
  handleClose = () => { },
  children
}) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      BackdropComponent={MuiBackdrop}
      BackdropProps={{
        timeout: 500,
        className: classes.backdrop
      }}
    >
      {children}
    </Modal>
  )
}

export default Backdrop;