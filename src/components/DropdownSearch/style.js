import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(_ => ({
  searchField: {
    width: '100%',
    minHeight: 32,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    color: '#30344B',
    background: '#fff',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.15)',
    outline: 0,
    '&:focus': {
      outlineWidth: 2,
      outlineColor: '#0A8DC7',
      outlineStyle: 'auto'
    }
  },
  disabled: {
    background: 'darkgray',
    opacity: .2,
  }
}));
