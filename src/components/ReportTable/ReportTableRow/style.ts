import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  tr: {
    borderBottom: '2px solid #E6EAEF',
    '&:last-child': {
      borderBottomColor: 'transparent',
    }
  },
  td: {
    padding: '16px 7px',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    color: '#30344B'
  },
  expandedTd: {
    width: 65,
    padding: '7px 10px',
    textAlign: 'right',
  },
  expandIconBtn: {
    padding: 3,
  },
  expandIcon: {
    fontSize: '1.2rem',
    transition: '.15s linear'
  },
  rotated: {
    transform: 'rotate(180deg)'
  }
}))