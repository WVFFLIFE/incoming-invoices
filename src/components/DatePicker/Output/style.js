import { makeStyles, styled, Button } from '@material-ui/core';

export const ArrowButton = styled(Button)({
  minWidth: 'auto',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 3,
  borderRadius: '50%'
})

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 240,
    width: '100%',
    minHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    background: '#fff',
    border: '2px solid #f4f4f4',
    borderRadius: 3,
    cursor: 'pointer'
  },
  disabled: {
    opacity: '.6',
    cursor: 'default',
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  calendarIcon: {
    fontSize: '1.1rem'
  },
  arrowIcon: {
    fontSize: '1rem'
  },
  text: {
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#000',
    textAlign: 'center'
  },
  placeholder: {
    color: '#A5A5A5'
  }
}))