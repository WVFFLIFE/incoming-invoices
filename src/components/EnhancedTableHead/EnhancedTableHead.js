import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from 'components/Checkbox';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
    background: '#fff',
    boxShadow: '0 11px 15px 0 rgba(0,0,0,0.05)'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  label: {
    marginRight: 5,
    fontSize: 10,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    letterSpacing: 0.33,
    color: 'rgba(100, 99, 103, .8)',
    textTransform: 'uppercase'
  },
  sortIcon: {
    fontSize: 15,
    transition: '.15s linear'
  },
  sortIconAsc: {
    transform: 'rotate(180deg)'
  },
  fieldSortWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  alignRight: {
    textAlign: 'right !important'
  }
})

const EnhancedTableHead = ({
  headCells,
  onRequestSort,
  sortParams: {key, order},
  withCheckbox = false,
  checked = false,
  cellClassName,
  handleChangeCheckbox
}) => {
  const classes = useStyles();
  const {t} = useTranslation();

  const renderCheckbox = () => {
    return (
      <div className={cellClassName}>
        <Checkbox 
          checked={checked}
          onChange={handleChangeCheckbox}
        />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      { withCheckbox ? renderCheckbox() : null }
      {headCells.map((headCell, idx) => {
        const isActive = headCell.id === key;

        return (
          <div
            className={clsx(cellClassName, {
              [classes.alignRight]: headCell.label.includes('amount')
            })}
            key={headCell.id}
          >
            {headCell.label ? (
              <div
                className={classes.fieldSortWrapper}
                onClick={() => onRequestSort(headCell.id, headCell.type)}
              >
                <span className={classes.label}>
                  {t(headCell.label)}
                </span>
                <ExpandMoreIcon className={clsx(classes.sortIcon, {
                  [classes.sortIconAsc]: order === 'asc' && isActive
                })} />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(EnhancedTableHead);