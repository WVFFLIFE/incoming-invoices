import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  title: {
    margin: 0,
    marginBottom: 30,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  description: {
    margin: 0,
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#30344B'
  },
  infoIcon: {
    marginRight: 10,
    color: '#DB0041'
  },
});