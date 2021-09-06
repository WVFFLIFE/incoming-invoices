import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { List } from 'react-virtualized';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles({
  payerWrapper: {
    padding: '10px 0',
    background: 'transparent',
    '&:last-child': {
      paddingBottom: 0
    }
  },
  payerRoot: {
    padding: '20px 10px',
    background: '#F3F9FD',
    color: '#333333',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 700,
  },
  infoIcon: {
    marginRight: 10,
    color: '#0A8DC7'
  },
  top: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  description: {
    margin: 0,
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#30344B'
  },
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 40
  },
  cancelBtn: {
    minWidth: 'auto',
    marginRight: 15,
    padding: '6px 24px',
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 700,
    border: 0,
    background: 'transparent',
    borderRadius: 20,
    color: '#224060',
    textDecoration: 'underline',
    textTransform: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  resolveBtn: {
    minWidth: 'auto',
    padding: '6px 24px',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    lineHeight: 'normal',
    letterSpacing: 0.23,
    border: 0,
    background: '#224060',
    borderRadius: 20,
    color: '#FFFFFF',
    textDecoration: 'none',
    textTransform: 'none',
  },
  flex: {
    display: 'flex'
  }
})

const UpdateDateErrorModal = ({
  payers,
  handleClose,
  handleApply
}) => {
  const classes = useStyles();
  const {t} = useTranslation();

  const renderRow = ({index, key, style}) => {
    const payer = payers[index];

    return (
      <div
        key={payer.Id} 
        className={classes.payerWrapper}
        style={style}
      >
        <div
          className={classes.payerRoot}
        >
          {payer.Name}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={classes.flex}>
        <div className={classes.left}>
          <InfoIcon className={classes.infoIcon} />
        </div>
        <div className={classes.right}>
          <p className={classes.description}>
            {t('#modal.update.error')}
          </p>
          <List 
            width={486}
            height={240}
            rowHeight={80}
            rowRenderer={renderRow}
            rowCount={payers.length}
            overscanRowCount={2}
            style={{outline: 0}}
          />
        </div>
      </div>
      <div className={classes.actionsWrapper}>
        <Button
          classes={{
            root: classes.cancelBtn
          }}
          onClick={handleClose}
        >
          {t('#button.cancel')}
        </Button>
        <Button
          onClick={handleApply}
          classes={{
            root: classes.resolveBtn
          }}
        >
          {t("#button.payanyway")}
        </Button>
      </div>
    </>
  )
}

export default UpdateDateErrorModal;