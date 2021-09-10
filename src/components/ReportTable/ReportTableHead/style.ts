import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  tr: {
    borderBottom: '2px solid #E6EAEF'
  },
  td: {
    padding: 7
  },
  expandTd: {
    width: 65,
    textAlign: 'right',
  },
  expandIconBtn: {
    padding: 6,
    background: '#fff',
    boxShadow: '0px 2px 7px rgba(151, 151, 151, 0.2)'
  },
  expandIcon: {
    fontSize: '1.2rem',
    color: '#224060',
  },
}));