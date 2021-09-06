import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledSvgIcon = withStyles({
    root: {
        width: 12,
        height: 12
    }
})(SvgIcon);

const IcArrowIcon = (props) => {
    return (
        <StyledSvgIcon {...props} viewBox="0 0 12 12">
            <g fill="none" fillRule="evenodd" stroke="#FFF">
                <path d="M0 3.087L9.21 3.087M6.815 0L9.902 3.087 6.815 6.175" transform="translate(1 3)" />
            </g>
        </StyledSvgIcon>
    )
}

export default IcArrowIcon;