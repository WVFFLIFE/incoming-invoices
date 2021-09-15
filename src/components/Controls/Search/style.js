import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  iconButton: {
    padding: 6,
    borderRadius: 1,
  },
  active: {
    background: 'rgba(34, 64, 96, 1)',
    color: '#fff',
  },
  open: {
    background: 'rgba(34, 64, 96, 0.15)',
    color: 'rgba(0, 0, 0, 1)',
  },
  searchIcon: {
    fontSize: '0.8rem',
  },
  closeIcon: {
    fontSize: '1rem',
  },
  dropdown: {
    borderRadius: 1,
  }
}))