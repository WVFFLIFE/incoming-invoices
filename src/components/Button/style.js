import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  button: {
    minWidth: 'auto',
    padding: '10px 15px',
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 500,
    background: '#fff',
    boxShadow: '0 2px 7px 0 rgb(151 151 151 / 20%)',
    borderRadius: 20,
    color: '#30344B',
    textTransform: 'capitalize',
  },
  icon: {
    marginRight: 12,
    fontSize: '0.8rem',
    color: 'currentColor'
  },
}));
