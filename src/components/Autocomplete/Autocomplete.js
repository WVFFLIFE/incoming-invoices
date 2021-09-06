import React from 'react';
import { useTranslation } from 'react-i18next';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import {TextField} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from './style';

const Autocomplete = ({
  options,
  value,
  handleChangeValue,
  compareField
}) => {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <MuiAutocomplete
      classes={{
        root: classes.root,
        inputRoot: classes.inputRoot,
        endAdornment: classes.endAdornment,
        option: classes.option,
        paper: classes.paper,
      }}
      value={value}
      onChange={(e, newValue) => handleChangeValue(newValue)}
      getOptionSelected={(option, value) => option?.[compareField] === value?.[compareField]}
      getOptionLabel={option => option[compareField]}
      options={options}
      popupIcon={<ExpandMoreIcon className={classes.icon}/>}
      closeIcon={<CloseIcon className={classes.icon}/>}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t('#control.substitute')}
          variant="standard"
          InputProps={{
            ...params.InputProps,
            classes: {
              root: classes.input
            },
            disableUnderline: true,
            endAdornment: (
              <React.Fragment>
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}

export default Autocomplete;