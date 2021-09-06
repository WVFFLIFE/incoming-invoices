import React, { useState, useRef } from 'react';
import {
  Popover,
  Button
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import BalanceOptions from 'components/BalancesOptions';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BalanceIcon, ContractIcon } from 'components/Icons';
import {formatNum} from 'helpers';

import { useStyles } from './style';
import clsx from 'clsx';

const BalancesPicker = ({
  selectedItems,
  options,
  handleChange,
  selectOne,
  selectedSubstitute
}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const ref = useRef();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const renderValue = () => {
    const [option] = selectedItems;
    return (
      <>
        <div className={classes.valueWrapper}>
          <span className={classes.name}>{option?.Name}</span>
        </div>
        <div className={classes.flex}>
          <div className={clsx(classes.flex, classes.balanceWrapper)}>
            <BalanceIcon className={classes.balancesIcon} />
            <span className={classes.balancesText}>{formatNum(option.AllowedBalance)}</span>
          </div>
          <div className={clsx(classes.flex, classes.allowedBalanceWrapper)}>
            <ContractIcon className={classes.balancesIcon} />
            <span className={classes.balancesText}>{formatNum(option.InvoiceSum)}</span>
          </div>
        </div>
      </>
    )
  }

  const open = !!anchorEl;
  const valueIndex = options && selectedItems.length === 1
    ? options.findIndex(option => option.Id === selectedItems[0].Id)
    : null;
  const disabledPrev = valueIndex === null || valueIndex === 0;
  const disabledNext = valueIndex === null || valueIndex === options.length - 1;
  const rect = ref.current?.getBoundingClientRect();

  return (
    <>
      <div
        className={classes.root}
        ref={ref}
        onClick={handleOpen}
        onKeyDown={(e) => {
          e.preventDefault();
          if (e.key === 'Enter') {
            handleOpen(e)
          }
        }}
        tabIndex="0"
      >
        {
          selectedItems.length > 1 ? (
            <span className={classes.selectedAmount}>
              {selectedItems.length === options.length ? (
                selectOne 
                ? t('#control.allcooperativesselected')
                : selectedSubstitute
                  ? t('#control.allsubstitutorcooperativesselected', { name: selectedSubstitute.Name })
                  : t('#control.allowncooperativeselected')
              ) : (
                `${selectedItems.length} ${t('#control.partailcooperativesselected')}`
              )}
            </span>
          ) : selectedItems.length === 1 ? (
            <>
              <Button
                classes={{
                  root: clsx(classes.button, classes.buttonPrev),
                  disabled: classes.buttonDisabled
                }}
                disabled={disabledPrev}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange([options[valueIndex - 1]])
                }}
              >
                <ChevronLeftIcon className={classes.icon} />
              </Button>
              {renderValue()}
              <Button
                classes={{
                  root: clsx(classes.button, classes.buttonNext),
                  disabled: classes.buttonDisabled
                }}
                disabled={disabledNext}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange([options[valueIndex + 1]])
                }}
              >
                <ChevronRightIcon className={classes.icon} />
              </Button>
            </>
          ) : (
            <span className={classes.selectedAmount}>
              {t('#control.selectcooperative')}
            </span>
          )
        }
        <Button
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
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <BalanceOptions
            options={options}
            selectedItems={selectedItems}
            handleClose={handleClose}
            handleSelect={handleChange}
            width={rect?.width}
            selectOne={selectOne}
          />
        </Popover>
    </>
  )
}

export default React.memo(BalancesPicker);