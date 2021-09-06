import Popover from '@material-ui/core/Popover';

import { useStyles } from './style';

const Dropdown = ({
  open,
  anchorEl,
  onClose,
  defaultWidth,
  children
}) => {
  const classes = useStyles();

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      className={classes.popover}
    >
      <div style={{ width: defaultWidth }}>
        {children}
      </div>
    </Popover>
  )
}

export default Dropdown;