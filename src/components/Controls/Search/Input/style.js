import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  relative: {
    position: 'relative'
  },
  root: {
    position: 'relative',
    display: 'block',
    width: 300,
    minHeight: 32,
    padding: '0 16px',
    paddingLeft: 32,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    border: 0,
    color: '#30344B',
    outline: 0,
    '&:focus': {
      outlineColor: '#0A8DC7',
      outlineStyle: 'auto',
      outlineWidth: 2
    } 
  },
  searchWrapper: {
    padding: 10,
    background: '#F0F3F7'
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: 10,
    fontSize: '0.8rem',
    transform: 'translateY(-50%)',
    zIndex: 1,
  },
}))