import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minWidth: 500,
    minHeight: 40,
    marginRight: 20,
    paddingLeft: 30,
    paddingRight: 55,
    background: '#fff',
    borderRadius: 3,
    boxShadow: 'inset 0 1px 4px 0 rgba(0,0,0,0.15)'
  },
  name: {
    fontSize: 13,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    color: '#30344B'
  },
  valueWrapper: {
    minWidth: 230,
    width: '100%',
    marginRight: 10
  },
  button: {
    minWidth: 'auto',
    marginTop: 2,
    padding: 2,
    borderRadius: '50%'
  },
  buttonPrev: {
    position: 'absolute',
    left: 5,
    top: '50%',
    transform: 'translateY(-58%)',
  },
  buttonNext: {
    position: 'absolute',
    right: 25,
    top: '50%',
    transform: 'translateY(-58%)',
  },
  icon: {
    fontSize: '1.1rem',
    color: '#224060',
  },
  buttonDisabled: {
    opacity: .3
  },
  balancesIcon: {
    marginRight: 7,
    fill: '#30344B'
  },
  balanceWrapper: {
    position: 'relative',
    paddingRight: 15,
    '&::before': {
      content: "''",
      position: 'absolute',
      top: '50%',
      right: 0,
      width: 1,
      height: 10,
      background: '#30344B',
      transform: 'translateY(-50%)'
    }
  },
  allowedBalanceWrapper: {
    paddingLeft: 15
  },
  balancesText: {
    fontSize: 13,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    letterSpacing: 0.2,
    color: '#30344B'
  },
  expandButton: {
    position: 'absolute',
    right: 5,
    top: '50%',
    transform: 'translateY(-58%)'
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