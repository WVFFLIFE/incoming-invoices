import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: 40,
    paddingLeft: 30,
    paddingRight: 55,
    background: '#fff',
    borderRadius: 3,
    boxShadow: 'inset 0 1px 4px 0 rgb(0 0 0 / 15%)',
    cursor: 'pointer',
    '&:focus': {
      outlineColor: '#0A8DC7'
    }
  },
  rootOpen: {
    outlineWidth: 2,
    outlineColor: '#0A8DC7',
    outlineStyle: 'auto'
  },
  disabled: {
    opacity: '.5',
    cursor: 'default'
  },
  label: {
    display: 'inline-flex',
    cursor: 'default',
  },
  button: {
    minWidth: 'auto',
    padding: 0,
    borderRadius: '50%'
  },
  expandButton: {
    position: 'absolute',
    right: 7,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  icon: {
    fontSize: '1.1rem',
    color: '#224060',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))