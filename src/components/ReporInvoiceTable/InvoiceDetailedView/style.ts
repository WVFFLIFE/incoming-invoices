import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    margin: 0,
    fontFamily: 'Proxima Nova',
    fontSize: 24,
    fontWeight: 600,
    color: '#000',
    textAlign: 'center',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  iframe: {
    display: 'block',
    width: '100%',
    height: '100%',
    minHeight: 550
  },
  iconBtn: {
    padding: 6,
  },
  saveIconBtn: {
    marginLeft: 20
  },
  icon: {
    fontSize: '1.1rem',
    color: 'rgba(34, 64, 96, 1)'
  },
}))