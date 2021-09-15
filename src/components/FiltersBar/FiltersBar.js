import React from 'react';
import {
  makeStyles
} from '@material-ui/core';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex'
  },
  filterItem: {
    padding: '7px 10px',
    fontSize: 10,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    letterSpacing: 0.47,
    border: '1px solid #B0B9C5',
    borderRight: 0,
    borderRadius: 1,
    color: '#64798F',
    cursor: 'pointer',
    textTransform: 'uppercase',
    '&:last-child': {
      borderRight: '1px solid #B0B9C5'
    }
  },
  activeFilter: {
    background: '#64798F',
    color: '#fff',
    cursor: 'default'
  },
  withMargin: {
    marginRight: 12,
    border: '1px solid #B0B9C5',
    '&:last-child': {
      marginRight: 0
    }
  },
  disabled: {
    cursor: "default",
    opacity: .5
  }
})

const FiltersBar = ({
  filtersList,
  activeFilter,
  handleChangeFilter,
  disabled = false,
  withMargin = false
}) => {
  const classes = useStyles();

  const {t} = useTranslation();

  return (
    <div className={classes.root}>
      {filtersList.map(filterItem => {
        const isActive = filterItem.id === activeFilter;

        return (
          <div 
            key={filterItem.id} 
            className={clsx(classes.filterItem, {
              [classes.activeFilter]: isActive,
              [classes.withMargin]: withMargin,
              [classes.disabled]: filterItem?.disabled || disabled
            })}
            onClick={
              filterItem?.disabled || disabled
                ? undefined 
                : () => handleChangeFilter(filterItem.id)}
          >
            {t(filterItem.label)}
          </div>
        )
      })}
    </div>
  )
}

export default FiltersBar;