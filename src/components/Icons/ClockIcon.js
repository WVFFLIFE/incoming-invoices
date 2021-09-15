import { SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledSvgIcon = withStyles({
  root: {
    width: 12,
    height: 12
  }
})(SvgIcon);

const ClockIcon = (props) => {
  return (
    <StyledSvgIcon {...props} viewBox="0 0 12 12">
      <g fill="none" fillRule="evenodd" stroke="#DB2641" transform="translate(1 1)">
        <circle cx="5" cy="5" r="5" strokeWidth="1.5" />
        <path d="M5 2.504L5 5.504 7.545 5.504" />
      </g>
    </StyledSvgIcon>
  )
}

export default ClockIcon;