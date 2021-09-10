import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  root: {
    minWidth: 200,
    paddingLeft: 5,
    paddingRight: 0,
    cursor: 'pointer',
  },
  output: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    color: '#000'
  },
  empty: {
    color: '#64798F'
  },
  icon: {
    fontSize: '1.3rem',
    color: '#B4B4B4'
  },
  iconButton: {
    marginRight: 5,
    padding: 6,
  },
  input: {
    paddingLeft: 0,
    paddingBottom: 6,
    borderColor: 'transparent'
  }
}))