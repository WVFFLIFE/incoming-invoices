import { SvgIcon } from '@material-ui/core';

const ChevronLeft = ({
  viewBox = "0 0 24 24",
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
    </SvgIcon>
  )
}

export default ChevronLeft;