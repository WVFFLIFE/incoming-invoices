import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    background: '#fff'
  },
  shortWeeksWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 24,
  },
  weekShort: {
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#4A4A4A'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    '&:last-child': {
      marginBottom: 0
    }
  },
  day: {
    fontSize: 14,
    fontFamily: 'Lato',
  },
  dayBox: {
    border: '1px solid transparent',
    color: '#646367',
    cursor: 'pointer',
    '&:hover': {
      background: '#224060',
      color: '#fff'
    },
    '&:focus': {
      outline: 'none',
      borderColor: '#0A8DC7',
    }
  },
  withinRange: {
    background: 'rgba(34,64,96,0.1)'
  },
  activeDay: {
    background: '#224060',
    color: '#fff',
    cursor: 'default'
  },
  disabledDay: {
    color: '#CED4DA',
    cursor: 'default',
    '&:hover': {
      background: 'transparent',
      color: '#CED4DA'
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
  disabledActiveDay: {
    background: '#B0B9C5',
  },
  controlsWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: '0.9rem'
  },
  chevron: {
    fontSize: '1rem',
  },
  arrowRight: {
    position: 'relative',
    top: 1
  },
  dateOutput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#333',
    textAlign: 'center'
  },
  monthsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 210
  },
  monthBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'calc(210px / 3)',
    height: 50,
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(34, 64, 96, 0.1)'
    }
  },
  month: {
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#333',
    textTransform: 'capitalize'
  },
  selectedMonthBox: {
    cursor: 'default',
    background: 'rgba(34, 64, 96, 0.1)'
  },
  yearOutput: {
    color: '#0A8DC7'
  },
  highlighted: {
    cursor: 'pointer',
    '&:hover': {
      color: '#0A8DC7'
    }
  },
  disabledHighlighted: {
    cursor: 'default',
    '&:hover': {
      color: '#333'
    }
  }
}));