import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
    width: 200,
    minHeight: 32,
    padding: '0 12px',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 1px 4px 0 rgb(0, 0, 0, .15)',
    color: '#30344B',
    outline: 0,
    '&:focus': {
      outlineColor: '#0A8DC7',
      outlineStyle: 'auto',
      outlineWidth: 2
    } 
  }
}))