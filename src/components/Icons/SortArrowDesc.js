import { SvgIcon } from '@material-ui/core';

const SortArrowDesc = ({
  viewBox = "0 0 10 10",
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path d="M5.09119 5.52353L7.21736 3.33474L7.88907 3.98728L5.76312 6.17613L5.76408 6.17705L5.09217 6.86893L5.09119 6.86793L5.0889 6.8703L4.41699 6.17841L4.4193 6.17617L2.29199 3.98592L2.9637 3.33337L5.09119 5.52353Z" />
    </SvgIcon>
  )
}

export default SortArrowDesc;