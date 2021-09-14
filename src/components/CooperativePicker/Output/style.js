import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 40,
    width: 500,
    paddingLeft: 15,
    paddingRight: 15,
    background: '#fff',
    borderRadius: 3,
    boxShadow: 'inset 0 1px 4px 0 rgb(0 0 0 / 15%)',
    cursor: 'pointer',
    '&:focus': {
      outlineColor: '#0A8DC7'
    }
  },
  disabled: {
    opacity: '.5',
    cursor: 'default'
  },
  button: {
    minWidth: 'auto',
    padding: 0,
    borderRadius: '50%',
    color: '#224060'
  },
  arrowIcon: {
    fontSize: '1.1rem',
  },
  balancesText: {
    marginLeft: 5,
    fontSize: 13,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    letterSpacing: 0.2,
    color: '#30344B',
    whiteSpace: 'nowrap',
  },
  selectPayer: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    color: 'background: rgba(48, 52, 75, 1)',
  },
  name: {
    fontSize: 13,
    fontWeight: 700,
    fontFamily: 'Proxima Nova',
    color: '#30344B'
  },
  expandBtn: {
    transition: '.15s linear'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));