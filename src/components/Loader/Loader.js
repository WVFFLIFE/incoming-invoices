import React from 'react';
import Backdrop from 'components/Backdrop';
import ProgressBar from '@material-ui/core/CircularProgress';
import {styled} from '@material-ui/core';

const StyledProgressBar = styled(ProgressBar)({
  outline: 0
})

const Loader = ({
  visible
}) => {

  return (
    <Backdrop
      open={visible}
    >
      <StyledProgressBar color="inherit"/>
    </Backdrop>
  )
}

export default Loader;