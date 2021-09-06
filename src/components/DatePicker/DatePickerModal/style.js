import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    background: '#f8f8f8'
  },
  btnsWrapper :{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20
  },
  btn: {
    minWidth: 'auto',
    padding: '6px 24px',
    fontSize: 14,
    fontFamily: 'Lato',
    lineHeight: 'normal',
    border: 0,
    borderRadius: 20,
    textTransform: 'none'
  },
  applyBtn: {
    fontWeight: 400,
    letterSpacing: 0.23,
    color: '#fff',
    background: '#224060'
  },
  cancelBtn: {
    marginRight: 15,
    fontWeight: 700,
    background: 'transparent',
    color: '#224060',
    textDecoration: 'underline'
  },
  calendarsWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',

    '& > div': {
      '&:first-child': {
        marignRight: 10
      }
    }
  }
}))