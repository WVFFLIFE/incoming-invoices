import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 40,
    width: 500,
    marginRight: 20,
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
  wrapper: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    margin: '0 5px',
  },
  name: {
    fontSize: 13,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    color: '#30344B'
  },
  valueWrapper: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'flex-start',
  },
  button: {
    minWidth: 'auto',
    padding: 0,
    borderRadius: '50%'
  },
  icon: {
    fontSize: '1.1rem',
    color: '#224060',
  },
  buttonDisabled: {
    opacity: .3
  },
  balancesIcon: {
    fill: '#30344B'
  },
  balancesText: {
    marginLeft: 5,
    fontSize: 13,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    letterSpacing: 0.2,
    color: '#30344B',
    whiteSpace: 'nowrap'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  selectedAmount: {
    fontSize: 13,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    color: '#30344B'
  },
})