import React from 'react';
import {
  makeStyles,
  Tooltip as MuiTooltip
} from '@material-ui/core';

const useStyles = makeStyles({
  tooltip: {
    padding: 10,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    letterSpacing: 0.2,
    background: '#F0F3F7',
    borderRadius: 0,
    boxShadow: '0 1px 2px 0 rgba(48, 52, 75, 0.5)',
    color: '#000'
  },
  arrow: {
    color: '#F0F3F7'
  },
})

const Tooltip = ({
  children, 
  placement = "bottom-start", 
  ...rest
}) => {
  const classes = useStyles();

  return (
    <MuiTooltip
      classes={{
        arrow: classes.arrow,
        tooltip: classes.tooltip,
      }}
      placement={placement}
      {...rest}
    >
      {children}
    </MuiTooltip>
  )
}

export default Tooltip;