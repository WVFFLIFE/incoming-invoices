import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledSvgIcon = withStyles({
  root: {
    width: 12,
    height: 12
  }
})(SvgIcon);

const IcArrowsIcon = (props) => {
  return (
    <StyledSvgIcon {...props} viewBox="0 0 12 12">
      <g fill="none" fillRule="evenodd">
        <path fill="#FFF" fillRule="nonzero" d="M10 2.5L10 3.5 1 3.5 1 2.5z" />
        <path stroke="#FFF" d="M8.299 1L10.299 3 8.299 5" />
        <path fill="#FFF" fillRule="nonzero" d="M10 8.5L10 9.5 1 9.5 1 8.5z" />
        <path stroke="#FFF" d="M8.299 7L10.299 9 8.299 11" />
      </g>
    </StyledSvgIcon>
  )
}

export default IcArrowsIcon;