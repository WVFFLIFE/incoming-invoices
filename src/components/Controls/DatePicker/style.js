import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  root: {
    minWidth: 200,
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
    color: '#B4B4B4'
  }
}))