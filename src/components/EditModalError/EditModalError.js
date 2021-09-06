import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles({
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
    display: 'flex'
  },
  description: {
    margin: 0,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#30344B'
  },
  cooperativeWrapper: {
    marginBottom: 15,
    padding: 15,
    background: '#F3F9FD',
    color: '#333333',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 700,
    '&:last-child': {
      marginBottom: 0
    }
  },
  infoIcon: {
    marginRight: 10,
    color: '#0A8DC7'
  },
})

const EditModalError = ({
  cooperatives
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <h2 className={classes.title}>
        {t("#modal.updatedate.title")}
      </h2>
      <div className={classes.flex}>
        <div className={classes.left}>
          <InfoIcon className={classes.infoIcon} />
        </div>
        <div className={classes.right}>
          <p className={classes.description}>
            {t('#modal.updatedate.error')}
          </p>
          <p className={classes.description}>
            {t('#modal.updatedate.description')}
          </p>
          {cooperatives.map(Name => {
            return (
              <div
                key={Name}
                className={classes.cooperativeWrapper}
              >
                {Name}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default EditModalError