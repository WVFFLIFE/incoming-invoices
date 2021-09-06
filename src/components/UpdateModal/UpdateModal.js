import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import Alert from 'components/Alert';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {formatDate} from 'helpers';

const useStyles = makeStyles({
  itemRoot: {
    display: 'flex',
    marginBottom: 20,
    background: 'rgba(244, 249, 253, .5)',
  },
  itemContentWrapper: {
    width: 'calc(100% / 4)',
    padding: 10
  },
  text: {
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#333'
  },
  bold: {
    fontWeight: 700
  },
  medium: {
    fontWeight: 500,
  },
  light: {
    fontWeight: 300,
  },
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
  alertWrapper: {
    maxHeight: 350,
    overflowY: 'auto',
    '& > div': {
      marginBottom: 20,
      '&:last-child': {
        marginBottom: 0
      }
    }
  },
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 40
  },
  cancelBtn: {
    minWidth: 'auto',
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
  }
})

const UpdateModal = ({
  updateMessages,
  handleClose
}) => {
  const classes = useStyles();
  const {t} = useTranslation();

  const renderBody = () => {
    return (
      <>
        <div className={classes.alertWrapper}>
          {updateMessages.map(updateMessage => {
            const severity = updateMessage.IsUpdated ? 'success' : 'error';
            const { Data } = updateMessage;

            return (
              <Alert
                severity={severity}
                key={updateMessage.Id}
                title={updateMessage.Message}
              >
                <div className={classes.itemRoot}>
                  <div className={classes.itemContentWrapper}>
                    <span className={clsx(classes.text, classes.bold)}>
                      {Data.Name}
                    </span>
                  </div>
                  <div className={classes.itemContentWrapper}>
                    <span className={clsx(clsx(classes.text, classes.medium))}>
                      {Data.Description}
                    </span>
                  </div>
                  <div className={classes.itemContentWrapper}>
                    <span className={clsx(classes.text, classes.light)}>
                      {formatDate(Data.DueDate)}
                    </span>
                  </div>
                  <div className={classes.itemContentWrapper}>
                    <span className={clsx(classes.text, classes.medium)}>
                      {Data.Amount}
                    </span>
                  </div>
                </div>
              </Alert>
            )
          })}
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
        </div>
      </>
    )
  }

  return (
    <>
      <h2 className={classes.title}>
        {t('#custom.status')}
      </h2>
      {
        updateMessages.length === 0 ? (
          <Alert
            severity="success"
            title={t('#modal.update.success')}
          />
        ) : renderBody()
      }
    </>
  )
}

export default React.memo(UpdateModal);