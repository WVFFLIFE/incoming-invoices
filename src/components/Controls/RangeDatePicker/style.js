import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minWidth: 240,
    padding: 10,
    border: '1px solid #E0E0E0',
    borderRadius: 2,
    cursor: 'pointer'
  },
  disabled: {
    cursor: 'default'
  },
  arrowIcon: {
    fontSize: '1rem'
  },
  calendarIcon: {
    fontSize: '1.1rem'
  },
  text: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    color: '#000',
  },
  placeholder: {
    color: '#64798F'
  }
}))