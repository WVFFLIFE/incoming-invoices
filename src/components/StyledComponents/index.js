import {
  Button,
  styled
} from '@material-ui/core';

import MuiWarningIcon from '@material-ui/icons/ReportProblemOutlined';
import MuiErrorIcon from '@material-ui/icons/ErrorOutlineOutlined';
import MuiCancelIcon from '@material-ui/icons/CancelPresentationOutlined';

export const WarningIcon = styled(MuiWarningIcon)(() => ({
  fontSize: '1rem',
  color: '#DB9200'
}));

export const ErrorIcon = styled(MuiErrorIcon)(() => ({
  fontSize: '1rem',
  color: "#DB0041",
}));

export const CancelIcon = styled(MuiCancelIcon)(() => ({
  fontSize: '1rem',
  color: '#DB0041'
}));

export const IconButton = styled(Button)({
  minWidth: 'auto',
  padding: 1,
  borderRadius: '50%',
});

const PickerButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 'auto',
  padding: '7px 16px',
  fontSize: 14,
  fontFamily: 'Lato',
  borderRadius: 20,
  textTransform: 'capitalize'
})

export const CancelButton = styled(PickerButton)({
  background: '#fff',
  boxShadow: '0px 2px 7px rgba(151, 151, 151, 0.4)',
  color: '#224060'
});

export const ApplyButton = styled(PickerButton)({
  background: '#224060',
  color: '#fff'
});