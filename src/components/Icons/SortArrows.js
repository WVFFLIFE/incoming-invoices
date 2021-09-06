import { SvgIcon } from '@material-ui/core';

const SortArrows = ({
  viewBox = "0 0 10 10",
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path d="M7.42873 4.36879L5.30018 2.17765L3.17171 4.36881L2.5 3.71627L5.30017 0.833252L8.10054 3.71628L7.42873 4.36879ZM5.30018 8.18972L7.42873 5.99858L8.10054 6.65109L5.30017 9.53412L2.5 6.6511L3.17171 5.99856L5.30018 8.18972Z" />
    </SvgIcon>
  )
}

export default SortArrows;