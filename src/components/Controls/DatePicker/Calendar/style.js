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
    borderRadius: 2,
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
  disabledDay: {
    color: '#CED4DA',
    cursor: 'default',
    '&:hover': {
      background: 'transparent',
      color: '#CED4DA'
    }
  },
  activeDay: {
    background: '#224060',
    color: '#fff',
    cursor: 'default'
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
  }
}));