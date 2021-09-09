import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    background: '#fff'
  },
  box: {
    display: "flex",
    flexDirection: 'column',
    paddingTop: 10,
    background: '#fff'
  },
  root: {
    padding: 20,
    background: '#F8F8F8'
  },
  accessory: {
    fontSize: '2rem',
    color: '#64798F'
  },
  tip: {
    display: 'block',
    padding: '0px 20px',
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 500,
    color: '#333'
  },
  applyBtn: {
    marginLeft: 20
  },
  tabsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    background: '#F8F8F8'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginBottom: 8,
    padding: 10,
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 500,
    background: 'rgba(34, 64, 96, 0.1)',
    color: '#333',
    cursor: 'pointer',
    '&:last-child': {
      marginBottom: 0
    },
    '&:hover': {
      background: '#fff'
    }
  },
  activeTab: {
    background: '#fff',
    cursor: 'default',
  }
}));