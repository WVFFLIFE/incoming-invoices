import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  makeStyles,
  Button
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles({
  button: {
    minWidth: 'auto',
    marginRight: 20,
    padding: '10px 15px',
    background: '#fff',
    borderRadius: 20,
    boxShadow: '0 2px 7px 0 rgba(151,151,151,0.2)',
    "&:last-child": {
      marginRight: 0
    }
  },
  text: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    letterSpacing: 0.1,
    color: '#30344B',
    textTransform: 'capitalize'
  },
  icon: {
    marginRight: 12,
    fontSize: '1.3rem',
    color: '#30344B'
  }
})

const RefreshButton = ({ handleClick, ...rest }) => {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <Button
      classes={{
        root: classes.button
      }}
      onClick={handleClick}
      {...rest}
    >
      <RefreshIcon className={classes.icon}/>
      <span className={classes.text}>{t('#button.refresh')}</span>
    </Button>
  )
}

export default RefreshButton;