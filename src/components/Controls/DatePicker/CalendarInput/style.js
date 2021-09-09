import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
    width: '100%',
    padding: '8px 12px',
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#333',
    border: '1px solid #0A8DC7',
    borderRadius: 2,
    '&:focus, &:active': {
      outline: 'none',
    },
    '&:disabled': {
      background: '#F0F3F7',
      borderColor: '#B0B9C5',
      color: '#64798F'
    }
  },
  error: {
    borderColor: 'red'
  }
}))