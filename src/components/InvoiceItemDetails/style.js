import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: '15px 0 30px 60px',
    boxShadow: '0 11px 15px 0 rgba(0,0,0,0.05)'
  },
  backgroundRoot: {
    background: 'rgba(255,71,71,0.05)',
    borderTop: '1px solid #fff'
  },
  col: {
    display: 'flex',
    flexDirection: 'column'
  },
  ul: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    width: 'calc(100% / 3 - 56px / 3)',
    '&:last-child': {
      width: 56
    }
  },
  li: {
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0
    }
  },
  liFlex: {
    display: 'flex'
  },
  liBtn: {
    padding: 20,
    paddingTop: 0
  },
  label: {
    marginRight: 5,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    lineHeight: '17px',
    color: 'rgba(0,0,0,0.5)'
  },
  text: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    lineHeight: '17px',
    color: '#000'
  },
  comment: {
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 400,
    lineHeight: '17px',
    color: '#000'
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
  invoiceNumber: {
    textDecoration: 'underline'
  },
  buttonRoot: {
    minWidth: 'auto',
    padding: 2,
    borderRadius: '50%',
    '&.Mui-disabled': {
      opacity: .5
    }
  },
  relative: {
    position: 'relative',
    display: 'inline-flex'
  },
  ml: {
    marginLeft: 25
  },
  renewIcon: {
    fontSize: '1.1rem',
    color: '#224060',
    transform: 'scale(-1, 1)'
  },
  btnReject: {
    minWidth: 'auto',
    width: 20,
    height: 20,
    padding: 2,
    background: '#DB0041',
    borderRadius: '50%',
    '&.Mui-disabled': {
      opacity: .5
    }
  },
  rejectIcon: {
    fontSize: '0.7rem',
    color: '#fff'
  },
  rejectWrapper: {
    display: 'flex',
  },
  rejectText: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    letterSpacing: 0.2,
    color: '#DB0041'
  },
  infoIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 6,
    borderRadius: '50%',
    cursor: 'pointer',
    transition: '.25s linear',
    '&:hover': {
      background: '#F0F3F7'
    }
  },
  defaultCursor: {
    cursor: 'default'
  },
  infoIcon: {
    fontSize: '1rem',
    color: '#DB0041'
  },
  buttonEdit: {
    marginLeft: 5,
    marginTop: -1,
    minWidth: 'auto',
    padding: 2,
    borderRadius: 10
  },
  popoverRoot: {
    background: 'rgba(27,27,27,0.1)'
  },
  editIcon: {
    marginLeft: 7
  },
  calendarWrapper: {
    padding: 20,
    background: '#F8F8F8',
    boxShadow: '0 0 10px 0 #D8E1E8'
  },
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20
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
    '&.Mui-disabled': {
      opacity: .5
    }
  },
  checkedRoot: {
    background: '#F6F8FC',
  },
})