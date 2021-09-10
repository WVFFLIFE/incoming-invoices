import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  printBtn: {
    color: '#224060'
  },
  loadBtn: {
    marginLeft: 20,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    background: '#224060',
    color: '#fff',
    '&:hover': {
      background: '#224060',
      opacity: .9,
      transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    }
  },
  wrapper: {
    width: '100%',
  },
  iconButton: {
    padding: 6,
  },
  notificationBox: {
    width: '100%',
    padding: 24,
    background: '#fff',
    textAlign: 'center'
  },
  notification: {
    fontSize: 18,
    fontFamily: 'Proxima Nova',
    fontWeight: 300,
    color: 'rgba(0,0,0,.75)'
  }
}))