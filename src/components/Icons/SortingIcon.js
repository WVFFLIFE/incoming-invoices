import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledSvgIcon = withStyles({
    root: {
        width: 10,
        height: 10
    }
})(SvgIcon);

const SortingIcon = (props) => {
    return (
        <StyledSvgIcon {...props} viewBox="0 0 10 10">
            <path d="M7.429 5.999l.672.652-2.8 2.883L2.5 6.651 3.172 6 5.3 8.189 7.43 6zM5.3.833l2.8 2.883-.671.653L5.3 2.178l-2.128 2.19-.672-.652L5.3.833z"/>
        </StyledSvgIcon>
    )
}

export default SortingIcon;