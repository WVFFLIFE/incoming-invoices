import React from 'react';
import {
  makeStyles,
  Radio as MuiRadio,
  FormControlLabel
} from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 13,
    height: 13,
    background: 'transparent',
    border: '1px solid #64798F',
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    position: 'relative',
    backgroundColor: '#218D7A',
    borderColor: 'transparent',
    '&:before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      width: 6,
      height: 6,
      top: '50%',
      left: '50%',
      background: '#fff',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
    },
    'input:hover ~ &': {
      backgroundColor: '#196e5f',
    },
  },
});

const useStylesLabel = makeStyles({
  label: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    lineHeight: '18px',
    color: '#000000'
  }
})

function StyledRadio (props) {
  const classes = useStyles();

  return (
    <MuiRadio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  )
}

const Radio = ({
  value,
  label,
  checked,
  handleChange
}) => {
  const classes = useStylesLabel();
  const {t} = useTranslation();

  return (
    <FormControlLabel
      checked={checked}
      onChange={handleChange} 
      value={value}
      control={<StyledRadio />}
      label={t(label)}
      classes={{
        label: classes.label
      }}
    />
  )
}

export default Radio;