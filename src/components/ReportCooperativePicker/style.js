import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: 40,
    minWidth: 500,
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
  rootOpen: {
    outlineWidth: 2,
    outlineColor: '#0A8DC7',
    outlineStyle: 'auto'
  },
  disabled: {
    opacity: '.5',
    cursor: 'default'
  },
  button: {
    minWidth: 'auto',
    padding: 0,
    borderRadius: '50%'
  },
  arrowIcon: {
    fontSize: '1.1rem',
    color: '#224060'
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
  label: {
    flex: 1,
    fontSize: '14px',
    fontFamily: 'Lato'
  },
  expandBtn: {
    transition: '.15s linear'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  popover: {
    transition: '.15s linear',
    background: 'rgba(27, 27, 27, 0.1)'
  }
}));

export const useModalBodyStyles = makeStyles(() => ({
  body: {
    padding: 12,
    background: '#F8F8F8',
  },
  cooperativesList: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  cooperativeItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12
  },
  selected: {
    background: 'rgba(240, 243, 247, 1)'
  },
  coooperativeName: {
    fontSize: 14,
    fontFamily: 'Lato'
  }
}))