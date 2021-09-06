import React from 'react';
import { Popper, Grow, Paper, ClickAwayListener } from '@material-ui/core'; 

const Menu = ({
  anchorEl, open, fullWidth,
  children, handleClose,
  PopperProps, PaperProps
}) => {
  return (
    <Popper
      {...PopperProps}
      anchorEl={anchorEl}
      open={open}
      role={undefined}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transitionDuration={250}
      transition
      disablePortal
      style={{
        zIndex: 999,
        width: fullWidth 
          ? anchorEl
            ? typeof anchorEl === 'function'
              ? anchorEl().getBoundingClientRect().width
              : anchorEl.getBoundingClientRect().width 
            : 'auto'
          : 'auto'
      }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            zIndex: 9,
            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
          }}
        >
          <Paper {...PaperProps}>
            <ClickAwayListener onClickAway={handleClose}>
              {children}
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}

export default Menu;