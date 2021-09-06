import React from 'react';
import {makeStyles, Button} from '@material-ui/core';
import {EditIcon} from 'components/Icons';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles({
  button: {
    minWidth: 'auto',
    marginRight: 20,
    padding: '10px 15px',
    background: '#fff',
    borderRadius: 20,
    boxShadow: '0 2px 7px 0 rgba(151,151,151,0.2)'
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
    color: '#224060'
  },
  disabled: {
    opacity: .5
  }
})

const EditButton = ({
  handleClick,
  ...rest
}) => {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <Button
      {...rest}
      classes={{
        root: classes.button,
        disabled: classes.disabled
      }}
      onClick={handleClick}
    >
      <EditIcon className={classes.icon}/>
      <span className={classes.text}>{t('#button.edit')}</span>
    </Button>
  )
}

export default EditButton;