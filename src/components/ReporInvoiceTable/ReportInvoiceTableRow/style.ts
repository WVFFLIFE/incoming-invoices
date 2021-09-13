import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  td: {
    padding: '16px 7px',
    fontSize: 16,
    fontFamily: 'Lato',
    color: '#333'
  },
  tr: {
    borderBottom: '1px solid rgba(236, 236, 236, 0.5)',
    '&:last-child': {
      borderBottom: 0
    }
  },
  rejected: {
    background: 'rgba(255, 71, 71, 0.1)'
  },
  light: {
    fontWeight: 300
  },
  underline: {
    borderBottom: '1px solid #333'
  },
  icon: {
    fontSize: '1rem'
  },
  cancelIcon: {
    color: '#DB0041'
  },
  checkIcon: {
    color: '#218D7A',
    fontSize: '1rem'
  },
  pendingIcon: {
    fill: '#64798F'
  },
  right: {
    textAlign: 'right'
  },
  link: {
    fontSize: 'inherit',
    fontFamily: 'inherit',
    color: 'inherit',
    textDecoration: 'none',
  },
  center: {
    textAlign: 'center',
  },
  saveBtn: {
    padding: 6,
  },
  saveIcon: {
    fontSize: '1rem',
    color: '#224060',
  }
}))