import React, { memo, useCallback, useState } from 'react';

import Popover from '@material-ui/core/Popover';
import Output from './Output';
import DatePickerModal from './DatePickerModal';

const DatePicker = ({
  start,
  end,
  handleChangeDate,
  disabled
}) => {  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggleVisibility = useCallback(
    (e) => setAnchorEl(e.currentTarget),
    []
  )

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleApply = (start, end) => {
    handleChangeDate({ start, end });
    handleClose();
  }

  return (
    <>
      <Output
        startDate={start}
        endDate={end}
        handleToggleVisibility={handleToggleVisibility}
        disabled={disabled}
      />
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transitionDuration={250}
      >
        <DatePickerModal 
          start={start}
          end={end}
          handleApply={handleApply}
          handleClose={handleClose}
        />
      </Popover>
    </>
  )
}

export default memo(DatePicker);