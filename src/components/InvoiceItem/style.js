import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    position: 'relative',
    background: '#fff',
    borderBottom: '1px solid rgba(236,236,236,0.5)',
    '&:last-child': {
      borderBottom: 0
    },
  },
  contentWrapper: {
    width: 'calc(100% / 4 - 96px / 4)',
    padding: 20,
    '&:first-child': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      paddingLeft: 0,
      paddingRight: 0
    },
    '&:nth-child(5)': {
      textAlign: 'right',
    },
    '&:last-child': {
      width: 56
    }
  },
  contentRoot: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff'
  },
  text: {
    fontSize: 16,
    fontFamily: 'Lato',
    color: '#333'
  },
  textBold: {
    fontWeight: 700,
  },
  textMedium: {
    fontWeight: 500,
  },
  textLight: {
    fontWeight: 300,
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
  statusIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 31,
  },
  icon: {
    fontSize: '1rem'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  errorIcon: {
    color: "#DB0041"
  },
  warningIcon: {
    color: '#DB9200'
  },
  cancelIcon: {
    color: '#DB0041'
  },
  btnArrowRight: {
    minWidth: 'auto',
    width: 20,
    height: 20,
    padding: 2,
    background: '#224060',
    borderRadius: '50%'
  },
  arrowRightIcon: {
    fontSize: '1rem',
    color: '#fff'
  },
  backgroundRoot: {
    background: 'rgba(255,71,71,0.05)'
  },
  checkedRoot: {
    background: '#F6F8FC',
    borderColor: 'transparent'
  },
  commentIcon: {
    fontSize: '1.1rem',
    color: '#224060'
  },
  commentIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 6,
    padding: 4,
    borderRadius: '50%',
    cursor: 'pointer',
    transition: '.25s linear',
    '&:hover': {
      background: '#F0F3F7'
    }
  },
  payButtonRoot: {
    '&.Mui-disabled': {
      opacity: '.5'
    }
  }
})
