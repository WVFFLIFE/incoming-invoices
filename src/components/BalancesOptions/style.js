import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    padding: 12
  },
  list: {
    maxHeight: 220,
    padding: '0 12px',
    overflowY: 'auto'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    '&:hover': {
      background: '#F0F3F7'
    }
  },
  activeListItem: {
    background: '#F0F3F7'
  },
  itemName: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 13,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    color: '#30344B'
  },
  amount: {
    fontSize: 13,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    color: '#30344B'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  filterButton: {
    display: 'inline-flex',
    minWidth: 'auto',
    marginRight: 12,
    padding: '5px 12px',
    fontSize: 10,
    fontFamily: 'Lato',
    letterSpacing: 0.2,
    background: '#64798F',
    borderRadius: 1,
    color: '#fff',
    textTransform: 'uppercase',
    '&:last-child': {
      marginRight: 0
    }
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 29,
    marginBottom: 20
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
  itemLeftBar: {
    display: 'flex',
    alignItems: 'center'
  },
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 40
  },
  cancelBtn: {
    minWidth: 'auto',
    marginRight: 15,
    padding: '6px 24px',
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 700,
    border: 0,
    background: 'transparent',
    borderRadius: 20,
    color: '#224060',
    textDecoration: 'underline',
    textTransform: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  resolveBtn: {
    minWidth: 'auto',
    padding: '6px 24px',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    lineHeight: 'normal',
    letterSpacing: 0.23,
    border: 0,
    background: '#224060',
    borderRadius: 20,
    color: '#FFFFFF',
    textDecoration: 'none',
    textTransform: 'none',
  },
  disabledApplyButton: {
    opacity: .6,
    '&.Mui-disabled': {
      color: '#fff',
    }
  },
  inadequateBalances: {
    color: '#DB0041'
  },
  errorBalancesIcon: {
    fill: '#DB0041'
  },
  filterItem: {
    padding: '7px 10px',
    fontSize: 10,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    letterSpacing: 0.47,
    border: '1px solid #B0B9C5',
    borderRadius: 1,
    color: '#64798F',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  activeFilter: {
    background: '#64798F',
    borderColor: 'transparent',
    color: '#fff',
  }
});