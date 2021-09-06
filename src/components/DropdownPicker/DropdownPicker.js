import { useState } from 'react';

import { ResizableBox } from 'react-resizable';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import clsx from 'clsx';
import { useStyles } from "./style";

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

  const onResize = (event, {element, size, handle}) => {
    setResizableParams({width: size.width, height: size.height})
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

const DropdownPickerModal = (props) => {
  const {
    open,
    anchorEl,
    onClose,
    renderBody,
    resizable,
    defaultWidth
  } = props;

  const content = typeof renderBody === 'function' && renderBody(onClose);

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
    >
      {
        resizable
          ? (
            <ResizableDropdown
              width={defaultWidth}
            >
              {content}
            </ResizableDropdown>
          ) : content
      }
    </Popover>
  )
}

const DropdownMenu = (props) => {
  const [defaultAnchorEl, setDefaultAnchorEl] = useState(null);
  const {
    className,
    disabled = false,
    renderValue,
    renderModalBody,
    resizable,
    defaultWidth
  } = props;

  const classes = useStyles();

  const onOpen = (e) => {
    setDefaultAnchorEl(e.currentTarget);
  }

  const onClose = () => {
    setDefaultAnchorEl(null);
  }

  const handleKeyDown = (e) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      onOpen(e);
    }
  }

  const open = !!defaultAnchorEl;

  return (
    <>
      <div
        className={clsx(
          classes.root,
          {
            [classes.rootOpen]: open
          },
          className,
          {
            [classes.disabled]: disabled
          }
        )}
        onClick={disabled ? undefined : onOpen}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
      >
        <div className={classes.label}>
          {renderValue ? renderValue() : 'Placeholder'}
        </div>
        <Button
          disabled={disabled}
          classes={{
            root: clsx(classes.button, classes.expandButton),
            disabled: classes.buttonDisabled
          }}
        >
          <ExpandMoreIcon className={clsx(classes.icon, {
            [classes.expandOpen]: open
          })} />
        </Button>
      </div>
      <DropdownPickerModal
        anchorEl={defaultAnchorEl}
        open={open}
        resizable={resizable}
        onClose={onClose}
        renderBody={renderModalBody}
        defaultWidth={defaultWidth}
      />
    </>
  )
}

export default DropdownMenu;