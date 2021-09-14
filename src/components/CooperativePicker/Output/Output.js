import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { formatNum } from 'helpers';

import { Box, Button } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BalanceIcon, ContractIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

const Output = forwardRef(({
  disabled,
  disabledNextBtn,
  disabledPrevBtn,
  open,
  selectNext,
  selectPrev,
  selectedCooperative,
  onOpen,
}, ref) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleKeyDown = (e) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      onOpen(e);
    }
  }

  const renderValue = () => {
    return (
      <>
        <Box 
          flex={1} 
          marginRight="10px"
          justifyContent="flex-start"
        >
          <span className={classes.name}>{selectedCooperative.Name}</span>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flex={1}
          justifyContent="flex-end"
        >
          <Box
            display="flex"
            alignItems="center"
            className={classes.balanceWrapper}
          >
            <BalanceIcon className={classes.balancesIcon} />
            <span className={classes.balancesText}>
              {formatNum(selectedCooperative.AllowedBalance)}
            </span>
          </Box>
          <span className="divider">|</span>
          <Box
            display="flex"
            alignItems="center"
          >
            <ContractIcon className={classes.balancesIcon} />
            <span className={classes.balancesText}>
              {formatNum(selectedCooperative.InvoiceSum)}
            </span>
          </Box>
        </Box>
      </>
    )
  }

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.disabled]: disabled
        }
      )}
      ref={ref}
      onClick={disabled ? undefined : onOpen}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      <Box display="flex" alignItems="center" flex={1}>
        {
          selectedCooperative
            ? (
              <Button
                disabled={disabledPrevBtn}
                className={classes.button}
                onClick={
                  disabledPrevBtn
                    ? undefined
                    : selectPrev
                }
              >
                <ChevronLeftIcon className={classes.arrowIcon} />
              </Button>
            ) : null
        }
          <Box
            display="flex"
            alignItems="center"
            flex={1} 
            margin={selectedCooperative ? "0 5px" : 0}
          >
            {
              selectedCooperative
              ? renderValue()
              : (
                <span className={classes.selectPayer}>
                  {`- ${t('#control.selectpayer')} -`}
                </span>
              )
            }
          </Box>
        {
          selectedCooperative
            ? (
              <Button 
                className={classes.button}
                disabled={disabledNextBtn}
                onClick={
                  disabledNextBtn
                    ? undefined
                    : selectNext
                }
              >
                <ChevronRightIcon className={classes.arrowIcon} />
              </Button>
            ) : null
        }
      </Box>
      <Button
        disabled={disabled}
        className={clsx(classes.button, classes.expandBtn, {
          [classes.expandOpen]: open
        })}
        classes={{
          disabled: classes.buttonDisabled
        }}
        disableRipple
      >
        <ExpandMoreIcon className={classes.arrowIcon} />
      </Button>
    </div>
  )
});

export default Output;