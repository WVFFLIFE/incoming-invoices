import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  td: {
    padding: 7
  },
  label: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 10,
    fontFamily: 'Lato',
    fontWeight: 700,
    color: '#333',
    textTransform: 'uppercase',
    cursor: 'pointer',
    '&:hover': {
      opacity: .8
    }
  },
  sortIconBtn: {
    position: 'relative',
    top: -1,
    marginLeft: 7,
  },
  sortIcon: {
    fontSize: '0.65rem',
    transition: '.15s linear',
    color: 'inherit'
  },
  sortIconAsc: {
    transform: 'rotate(180deg)'
  },
}));