import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  body: {
    padding: 12,
    background: '#F8F8F8',
  },
  cooperativesList: {
    height: 220,
    margin: 0,
    marginTop: 20,
    padding: 0,
    listStyle: 'none',
    overflow: 'auto',
  },
  cooperativeItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    cursor: 'pointer',
    transition: '.15s linear',
    '&:hover': {
      background: 'rgba(240, 243, 247, 1)'
    }
  },
  selected: {
    background: 'rgba(240, 243, 247, 1)',
    cursor: 'default'
  },
  cooperativeName: {
    fontSize: 14,
    fontFamily: 'Proxima Nova'
  },
  amount: {
    fontSize: 13,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    color: '#30344B'
  },
  balancesIcon: {
    marginRight: 7,
    fill: '#224060'
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
  errorBalancesIcon: {
    fill: '#DB0041'
  },
  inadequateBalances: {
    color: '#DB0041'
  },
  mr20: {
    marginRight: 20
  }
}));