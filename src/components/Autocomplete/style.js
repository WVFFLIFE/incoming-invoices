import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    minWidth: 280,
    marginRight: 40,
    background: '#fff',
    border: 0,
    borderRadius: 3,
    boxShadow: 'inset 0 1px 4px 0 rgba(0,0,0,0.15)'
  },
  inputRoot: {
    '&[class*="MuiInput-root"]': {
      paddingBottom: 9
    },
  },
  input: {
    paddingLeft: 20,
    paddingTop: 9,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    letterSpacing: .23,
    color: '#30344B'
  },
  endAdornment: {
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  icon: {
    fontSize: '0.9rem',
    color: '#30344B'
  },
  option: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    color: '#30344B',
    '&[aria-selected="true"]': {
      background: '#F0F3F7'
    }
  },
  paper: {
    background: '#F8F8F8',
    borderRadius: 0
  },
})