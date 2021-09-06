import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  arrow: {
    color: '#000',
    transition: '.15s linear'
  },
  arrowAsc: {
    transform: 'rotate(180deg)'
  },
  th: {
    padding: 8
  },
  tr: {
    borderBottom: '2px solid #F0F2F5'
  }
}))