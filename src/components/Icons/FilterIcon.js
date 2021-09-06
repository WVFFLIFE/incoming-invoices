import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledSvgIcon = withStyles({
  root: {
    width: 13,
    height: 12
  }
})(SvgIcon);

const FilterIcon = (props) => {
  return (
    <StyledSvgIcon {...props} viewBox="0 0 13 12">
      <path d="M11.936 1c-.24-.563-.784-.912-1.402-.912H1.59C.973.074.43.438.19 1c-.24.563-.126 1.2.304 1.638l3.801 3.937v3.3c0 .162.089.313.228.4l2.589 1.563c.076.05.164.075.252.075.076 0 .165-.026.228-.063.151-.088.24-.237.24-.412V6.561l3.801-3.937c.43-.425.544-1.063.304-1.625zm-.986.988L7.01 6.063c-.089.087-.127.2-.127.325v4.225l-1.641-.988V6.388c0-.125-.051-.238-.127-.325l-3.94-4.075c-.24-.25-.152-.538-.114-.625.038-.088.177-.35.53-.35h8.93c.354 0 .493.262.53.35.051.087.14.375-.1.625z" />
    </StyledSvgIcon>
  )
}

export default FilterIcon;