import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledSvgIcon = withStyles({
    root: {
        width: 8,
        height: 10
    }
})(SvgIcon);

const SumIcon = (props) => {
    return (
        <StyledSvgIcon {...props} viewBox="0 0 8 10">
            <path fill="none" fillRule="evenodd" stroke="#00A6E7" strokeWidth="1.7" d="M9 55L3 55 6 59 3 63 9 63" opacity=".9" transform="translate(-1 -54)"/>
        </StyledSvgIcon>
    )
}

export default SumIcon;