import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 66.2,
    padding: '10px 20px 15px',
    background: '#fff',
    borderTop: '1px solid #E2E2E3',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Proxima Nova',
    width: 'calc(100% / 7)',
    padding: '0 15px'
  },
  label: {
    display: "block",
    marginBottom: 5,
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 400,
    color: '#30344B'
  },
  text: {
    fontSize: 14,
    fontWeight: 700,
    color: '#30344B',
  },
  amountLabel: {
    marginBottom: 5,
    fontSize: 10,
    lineHeight: '16px',
    fontWeight: 'bold',
    letterSpacing: 0.3,
    color: 'rgba(100, 99, 103, .8)',
    textTransform: 'uppercase'
  },
  amountText: {
    fontSize: 15,
    fontWeight: 400,
    letterSpacing: 0.25,
    color: '#000',
  },
  alignRight: {
    alignItems: 'flex-end'
  }
})