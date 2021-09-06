import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Button
} from '@material-ui/core';
import {PdfIcon} from 'components/Icons';

const useStyles = makeStyles({
  button: {
    minWidth: 'auto',
    padding: '10px 15px',
    background: '#224060',
    borderRadius: 20,
  },
  icon: {
    marginRight: 12,
    color: "#fff"
  },
  text: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    letterSpacing: 0.32,
    color: '#FFFFFF',
    textTransform: 'none'
  }
})

const PdfButton = () => {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <Button classes={{
      root: classes.button
    }}>
      <PdfIcon className={classes.icon}/>
      <span className={classes.text}>
        {t('#button.exporttopdf')}
      </span>
    </Button>
  )
}

export default PdfButton;