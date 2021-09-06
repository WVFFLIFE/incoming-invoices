import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  calendar: {
    display: 'inline-flex',
    flexDirection: 'column',
    padding: 20,
    paddingBottom: 0,
    background: '#fff'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    '& > div:first-child': {
      flex: 1,
      marginRight: 10,
    },
    '& > div:last-child': {
      flex: 0,
      minWidth: 80
    }
  },
  weekTitlesWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12
  },
  minHeight: {
    minHeight: 228,
  },
  block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 24,
    cursor: 'pointer',
    transition: 'background-color .15s linear',
    '&:hover': {
      backgroundColor: '#F3F4F7'
    },
    '&:last-child': {
      marginRight: 0
    }
  },
  weekBlock: {
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'transparent',
    }
  },
  disabledBlock: {
    cursor: 'default',
    '&:hover': {
      background: 'transparent'
    }
  },
  inRange: {
    background: 'rgba(34,64,96,0.1)'
  },
  activeBlock: {
    background: '#192b5d',
    '&:hover': {
      background: '#192b5d',
      cursor: 'default'
    }
  },
  firstBlock: {
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2
  },
  lastBlock: {
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2
  },
  weekTitle: {
    fontSize: 14,
    fontFamily: "Proxima Nova",
    fontWeight: 400,
    lineHeight: '20px',
    color: '#4A4A4A',
    textTransform: 'capitalize',
  },
  week: {
    display: 'flex',
    marginBottom: 7,
    '&:last-child': {
      marginBottom: 0
    }
  },
  day: {
    fontSize: 14,
    fontFamily: "Proxima Nova",
    fontWeight: 400,
    lineHeight: '20px',
    borderRadius: 2,
    color: '#646367',
  },
  disabledDay: {
    color: '#a1adce'
  },
  activeDay: {
    color: '#fff'
  },
  textButton: {
    padding: 0
  },
  buttonRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    minWidth: 'auto',
    borderRadius: 6
  },
  buttonsWrapper: {
    display: 'flex'
  },
  arrowIcon: {
    fontSize: '1.3rem',
    color: '#192b5d'
  },
  currentMonth: {
    margin: 0,
    fontSize: 14,
    lineHeight: '20px',
    color: '#192B5D'
  },
  selectYearRoot: {
    width: 80,
    border: '1px solid rgba(151,151,151,0.3)',
    borderRadius: 2,
    boxSizing: 'border-box'
  },
  selectIcon: {
    fontSize: '1rem',
  },
  option: {
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 400,
    textTransform: 'capitalize'
  }
}))