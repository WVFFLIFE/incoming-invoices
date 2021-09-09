import Popover from '@material-ui/core/Popover';

import { useStyles } from './style';

const Dropdown = ({
  className,
  open,
  anchorEl,
  onClose,
  defaultWidth,
  children,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left'
  },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'left',
  }
}) => {
  const classes = useStyles();

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      className={classes.popover}
    >
      <div style={{ width: defaultWidth }} className={className}>
        {children}
      </div>
    </Popover>
  )
}

export default Dropdown;