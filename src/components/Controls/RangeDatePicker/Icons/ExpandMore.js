import { SvgIcon } from '@material-ui/core';

const ExpandMore = ({
  viewBox = "0 0 24 24",
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </SvgIcon>
  )
}

export default ExpandMore;