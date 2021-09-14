import { SvgIcon } from '@material-ui/core';

const ChevronRight = ({
  viewBox = "0 0 24 24",
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
    </SvgIcon>
  )
}

export default ChevronRight;