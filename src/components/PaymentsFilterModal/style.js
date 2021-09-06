import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    position: 'relative',
    padding: 40,
    paddingTop: 50
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
    marginBottom: 30,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
    textAlign: 'center'
  },
  clearIcon: {
    marginRight: 7,
    fontSize: '0.9rem',
    color: "#30344B"
  },
  clearText: {
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 700,
    color: '#224060'
  },
  clearButton: {
    minWidth: 'auto',
    padding: '5px 10px',
    borderRadius: 10,
    textTransform: 'none'
  },
  clearWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  customText: {
    margin: 0,
    marginBottom: 25,
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 400,
    color: '#000'
  },
  filtersWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 40,
  },
  filter: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 25,
    '&:last-child': {
      marginBottom: 0
    }
  },
  filterName: {
    marginLeft: 12,
    marginRight: 10,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    color: '#000'
  },
  icon: {
    fontSize: '1rem'
  },
  redIcon: {
    color: '#DB0041'
  },
  yellowIcon: {
    color: "#DB9200"
  },
  messageIcon: {
    fill: '#224060'
  },
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
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
});
