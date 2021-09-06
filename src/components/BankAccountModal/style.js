import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    position: 'relative',
    padding: 40,
    paddingTop: 50
  },
  cell: {
    width: 'calc(100% / 6)',
    padding: 15
  },
  button: {
    position: 'absolute',
    top: 20,
    right: 20,
    minWidth: 'auto',
    padding: 2,
    borderRadius: '50%'
  },
  closeIcon: {
    fontSize: '1.3rem',
    color: '#646367'
  },
  title: {
    margin: 0,
    marginBottom: 40,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
    textAlign: 'center'
  },
  description: {
    margin: 0,
    marginBottom: 30,
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: "#30344B",
    textAlign: 'center'
  },
  rounted: {
    background: '#fff',
    border: 0
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
  }
})