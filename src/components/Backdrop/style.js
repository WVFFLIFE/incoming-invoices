import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    outline: 'none'
  },
  backdrop: {
    color: '#fff',
    outline: 'none'
  },
}));