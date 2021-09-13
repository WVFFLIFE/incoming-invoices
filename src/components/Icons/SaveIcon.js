import { SvgIcon } from '@material-ui/core';

const SaveIcon = ({
  viewBox = "0 0 16 16",
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path d="M8 1C8.49092 1 8.88889 1.38278 8.88889 1.85496V9.94356L12.3715 6.59391C12.7186 6.26003 13.2814 6.26003 13.6285 6.59391C13.9757 6.92779 13.9757 7.46913 13.6285 7.80301L8.6322 12.6087C8.6196 12.6209 8.60661 12.6328 8.59326 12.6443C8.52315 12.7049 8.44543 12.7528 8.36328 12.7882C8.25237 12.836 8.12941 12.8626 8 12.8626C7.87052 12.8626 7.74751 12.836 7.63656 12.7881C7.55447 12.7528 7.47681 12.7048 7.40673 12.6443C7.39336 12.6328 7.38036 12.6209 7.36773 12.6086L2.37146 7.80301C2.02433 7.46913 2.02433 6.92779 2.37146 6.59391C2.71859 6.26003 3.28141 6.26003 3.62854 6.59391L7.11111 9.94356V1.85496C7.11111 1.38278 7.50908 1 8 1ZM1.88889 13.2901C1.39797 13.2901 1 13.6729 1 14.145C1 14.6172 1.39797 15 1.88889 15H14.1111C14.602 15 15 14.6172 15 14.145C15 13.6729 14.602 13.2901 14.1111 13.2901H1.88889Z" />
    </SvgIcon>
  )
}

export default SaveIcon;