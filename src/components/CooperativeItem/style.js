import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    position: 'relative',
    marginBottom: 5,
    border: '1px solid transparent',
  },
  rootActive: {
    cursor: 'pointer'
  },
  contentRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '10px 20px',
    paddingRight: 0,
    background: '#fff',
    boxShadow: '0 11px 15px 0 rgba(0,0,0,0.05)'
  },
  contentWrapper: {
    position: 'relative',
    fontFamily: 'Proxima Nova',
    width: 'calc(100% / 7 - 72px / 6)',
    padding: 10,
    textAlign: 'right',
    '&:first-child': {
      display: 'flex',
      width: 'calc(100% * 2 / 7 - 72px / 6)',
      textAlign: 'left'
    },
    '&:last-child': {
      width: 72,
      textAlign: 'center'
    }
  },
  expandButton: {
    minWidth: 'auto',
    width: 16,
    height: 16,
    marginLeft: 6,
    padding: 2,
    borderRadius: '50%'
  },
  expandIcon: {
    fontSize: '1.1rem',
    color: '#000',
    transition: '.2s linear'
  },
  expandIconActive: {
    transform: 'rotate(180deg)'
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.26,
    color: '#000'
  },
  limit: {
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: 0.25,
    color: '#000'
  },
  allowedBalance: {
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: 0.25,
    color: '#000'
  },
  balance: {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 0.25,
    color: '#30344B'
  },
  inadequateBalance: {
    color: 'rgba(0, 0, 0, .5)'
  },
  urgent: {
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.25,
    color: '#DB0041'
  },
  zeroUrgent: {
    color: '#30344B'
  },
  sumInvoice: {
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.25,
    color: '#000'
  },
  iconButton: {
    minWidth: 'auto',
    width: 32,
    height: 32,
    background: '#224060',
    borderRadius: '50%',
  },
  menuIcon: {
    fontSize: '0.9rem',
    color: '#fff'
  },
  badge: {
    padding: 0,
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '20px',
    letterSpacing: 0.15,
    color: '#fff',
    background: '#64798F'
  },
  anchorOriginTopRightRectangle: {
    top: -7,
    right: -14
  },
  dot: {
    display: 'block',
    marginLeft: 10,
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#DB0041'
  },
  withDot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  pinkBalance: {
    fontWeight: 700,
    color: '#DB0041'
  },
  bold: {
    fontWeight: 'bold'
  },
  collapseWrapperInner: {
    maxHeight: 250,
    overflowY: 'auto'
  },
  backgroundRoot: {
    background: 'rgba(255,71,71,0.05)'
  },
  border: {
    '&::before': {
      content: "''",
      position: 'absolute',
      left: 0,
      width: 5,
      height: '100%',
      background: "#DB0041"
    }
  },
});
