import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  paginationWrapper: {
    padding: 15,
    background: '#fff',
    borderTop: '1px solid #F0F2F5',
  },
  empty: {
    padding: 25,
    fontSize: 18,
    fontFamily: 'Proxima Nova',
    fontWeight: 300,
    color: 'rgba(0, 0, 0, .75)',
    textAlign: 'center'
  }
}))