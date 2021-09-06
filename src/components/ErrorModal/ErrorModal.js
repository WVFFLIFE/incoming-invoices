import React from 'react';
import { useStyles } from './style';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@material-ui/icons/InfoOutlined';

const ErrorModal = ({
  message
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <h2 className={classes.title}>
        {t('#custom.error')}
      </h2>
      <div className={classes.flex}>
        <div className={classes.left}>
          <InfoIcon className={classes.infoIcon} />
        </div>
        <div className={classes.right}>
          <p className={classes.description}>
            {message}
          </p>
        </div>
      </div>
    </>
  )
}

export default ErrorModal;