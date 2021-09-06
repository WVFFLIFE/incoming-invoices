import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledSvgIcon = withStyles({
    root: {
        width: 32,
        height: 32
    }
})(SvgIcon);

const PerBankIcon = ({
    isActive,
    ...rest
}) => {
    return (
        <StyledSvgIcon {...rest} viewBox="0 0 32 32">
            <g fill="none" fillRule="evenodd" opacity={isActive ? "1" : '0.6'}>
                <rect width="32" height="32" fill="#132940" rx="16" />
                <path fill={isActive ? '#000' : '#fff'} stroke="#000" d="M11 8.5c-.276 0-.5.224-.5.5v12c0 .276.224.5.5.5h11c.276 0 .5-.224.5-.5V9c0-.276-.224-.5-.5-.5H11z" />
                <path fill={isActive ? '#000' : '#fff'} stroke="#000" d="M9 10.5c-.276 0-.5.224-.5.5v12c0 .276.224.5.5.5h11c.276 0 .5-.224.5-.5V11c0-.276-.224-.5-.5-.5H9z" />
                <path fill={isActive ? '#fff' : '#000'} fillRule="nonzero" d="M17.53 14h.01c.262 0 .51-.23.5-.499-.012-.27-.22-.498-.5-.498-.232 0-5.746-.007-6.03 0H11.5c-.261 0-.51.23-.499.498.012.27.22.498.499.498.232 0 5.746.007 6.03 0zM15.081 15.999c.26 0 .51-.23.498-.498-.011-.271-.219-.499-.498-.499H11.5c-.261 0-.51.23-.499.499.012.27.22.498.499.498h3.582zM17.53 19h.01c.262 0 .51-.23.5-.499-.012-.27-.22-.498-.5-.498-.232 0-5.746-.007-6.03 0H11.5c-.261 0-.51.23-.499.498.012.27.22.498.499.498.232 0 5.746.007 6.03 0zM15.081 20.999c.26 0 .51-.23.498-.498-.011-.271-.219-.499-.498-.499H11.5c-.261 0-.51.23-.499.499.012.27.22.498.499.498h3.582z" />
            </g>
        </StyledSvgIcon>
    )
}

export default PerBankIcon;