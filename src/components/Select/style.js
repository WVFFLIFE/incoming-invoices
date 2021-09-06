import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  selectMonthRoot: {
    border: '1px solid rgba(151,151,151,0.3)',
    borderRadius: 2,
    boxSizing: 'border-box'
  },
  endAdornment: {
    right: 5,
    top: 'calc(50% - 10px)'
  },
  option: {
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 400,
    textTransform: 'capitalize'
  },
  selectIcon: {
    fontSize: '1rem',
  },
  input: {
    paddingLeft: '8px !important',
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 400,
    lineHeight: '16px',
    color: '#333',
    textTransform: 'capitalize'
  },
}))