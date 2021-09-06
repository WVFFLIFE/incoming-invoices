import React, { useMemo } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useStyles } from './style';

const Select = ({
  value, options, onChange,
  disabled
}) => {
  const classes = useStyles();

  const autocompleteClasses = useMemo(() => ({
    root: classes.selectMonthRoot,
    endAdornment: classes.endAdornment,
    option: classes.option
  }), [classes])

  const renderInput = (params) => {
    return (
      <TextField
        {...params}
        InputProps={{
          ...params.InputProps,
          disableUnderline: true,
          classes: {
            input: classes.input
          }
        }}
      />
    )
  }

  const getOptionLabel = option => `${option}`

  return (
    <Autocomplete
      disabled={disabled}
      value={value}
      options={options}
      onChange={onChange}
      classes={autocompleteClasses}
      renderInput={renderInput}
      getOptionLabel={getOptionLabel}
      popupIcon={<ExpandMoreIcon className={classes.selectIcon} />}
      disableClearable
    />
  )
}

export default React.memo(Select);