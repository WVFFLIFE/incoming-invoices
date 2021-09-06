import { useState } from 'react';

import { ResizableBox } from 'react-resizable';
import Popover from '@material-ui/core/Popover';

import { useStyles } from './style';

const ResizableDropdown = (props) => {
  const {
    width,
    height,
    children
  } = props;

  const [resizableParams, setResizableParams] = useState(() => ({
    width,
    height: height || 413
  }));

  const onResize = (event, { element, size, handle }) => {
    setResizableParams({ width: size.width, height: size.height })
  };

  return (
    <ResizableBox
      width={resizableParams.width}
      height={resizableParams.height}
      minConstraints={[width, 413]}
      axis="both"
      onResize={onResize}
    >
      {children}
    </ResizableBox>
  )
}

const Dropdown = (props) => {
  const {
    open,
    anchorEl,
    onClose,
    children,
    resizable,
    defaultWidth
  } = props;

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
      {
        resizable
          ? (
            <ResizableDropdown
              width={defaultWidth}
            >
              {children}
            </ResizableDropdown>
          ) : (
            <div style={{ width: defaultWidth }}>
              {children}
            </div>
          )
      }
    </Popover>
  )
}

export default Dropdown;