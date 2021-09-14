import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  title: {
    margin: 0,
    fontFamily: 'Proxima Nova',
    fontSize: 24,
    fontWeight: 400,
    color: '#000',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
  }
}))