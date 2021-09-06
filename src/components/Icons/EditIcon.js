import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledSvgIcon = withStyles({
  root: {
    width: 12,
    height: 12
  }
})(SvgIcon);

const EditIcon = (props) => {
  return (
    <StyledSvgIcon {...props} viewBox="0 0 12 12">
      <path d="M11,11.5 C11,11.7761424 10.7761424,12 10.5,12 L1.5,12 C1.22385763,12 1,11.7761424 1,11.5 C1,11.2238576 1.22385763,11 1.5,11 L10.5,11 C10.7761424,11 11,11.2238576 11,11.5 Z" id="Combined-Shape"></path>
      <path d="M7.88223365,1.04878017 C8.07822836,0.858012508 8.39113151,0.860126835 8.58453035,1.05352568 L8.58453035,1.05352568 L10.3609867,2.829982 C10.5581173,3.02711267 10.5559532,3.34738558 10.3561766,3.54183429 L10.3561766,3.54183429 L3.84719483,9.87722593 C3.75384482,9.96808636 3.62871987,10.018927 3.49845152,10.018927 L3.49845152,10.018927 L1.7219952,10.018927 C1.44585282,10.018927 1.2219952,9.7950694 1.2219952,9.51892703 L1.2219952,9.51892703 L1.2219952,7.74247071 C1.2219952,7.60751942 1.27654609,7.47829852 1.37325188,7.38417181 L1.37325188,7.38417181 Z M2.3259952,7.851079 L2.22201496,7.95368393 L2.22201496,9.01858674 L3.29611016,9.01787963 L3.3949952,8.921079 L2.3259952,7.851079 Z M8.22605864,2.10803217 L3.0429952,7.154079 L4.1119952,8.223079 L9.2959112,3.17788473 L8.22605864,2.10803217 Z" id="Combined-Shape"></path>
    </StyledSvgIcon>
  )
}

export default EditIcon;

