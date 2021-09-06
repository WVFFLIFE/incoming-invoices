import React, { useState } from 'react';
import {
  Button,
  Collapse,
  Badge
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import BankAccountDetails from 'components/BankAccountDetails';
import clsx from 'clsx';
import orderBy from 'lodash/orderBy';
import omit from 'lodash/omit';
import {
  formatNum, 
  isBalanceInadequate as isBalanceInadequateFn,
  getText
} from 'helpers';
import { useStyles } from './style';

const CooperativeItem = ({
  data,
  searchTerm,
  handleClickItem
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandedClick = () => {
    setExpanded(!expanded);
  }

  const getTextView = getText(searchTerm);
  const isBankAccounts = !!data.BankAccounts.length;
  const isAllowedBalanceInadequate = typeof data?.AllowedBalance === 'number' && data.UrgentBalance > 0 && data.AllowedBalance < data.UrgentBalance;
  const isBalanceInadequate = typeof data?.AllowedBalance !== 'number' && data.UrgentBalance > 0 && data.Balance < data.UrgentBalance;
  const isUrgentZero = typeof data.UrgentBalance === 'number' && data.UrgentBalance === 0;

  return (
    <div 
      onClick={isBankAccounts ? handleExpandedClick : () => {}}
      className={clsx(classes.root, {
        [classes.border]: isBalanceInadequateFn(data),
        [classes.rootActive]: isBankAccounts
      })}
    >
      <div className={classes.contentRoot}>
        <div className={classes.contentWrapper} >
          <Badge
            badgeContent={`+${data.BankAccounts.length}`}
            invisible={data.BankAccounts.length <= 1}
            classes={{
              badge: classes.badge,
              anchorOriginTopRightRectangle: classes.anchorOriginTopRightRectangle
            }}
          >
            <span className={classes.name}>{getTextView(data.Name)}</span>
          </Badge>
          {isBankAccounts ? (
            <Button
              onClick={handleExpandedClick}
              classes={{
                root: classes.expandButton
              }}
            >
              <ExpandMoreIcon className={clsx(classes.expandIcon, {
                [classes.expandIconActive]: expanded
              })} />
            </Button>
          ) : null}
        </div>
        <div className={classes.contentWrapper}>
          <span className={classes.limit}>
            {getTextView(formatNum(data.Limit))}
          </span>
        </div>
        <div className={clsx(classes.contentWrapper, {
          [classes.withDot]: isAllowedBalanceInadequate
        })}>
          <span className={clsx(classes.allowedBalance, {
            [classes.pinkBalance]: isAllowedBalanceInadequate,
            [classes.bold]: data.AllowedBalance > data.UrgentBalance
          })}>
            {
              getTextView(formatNum(data.AllowedBalance))
            }
          </span>
          {isAllowedBalanceInadequate ? <span className={classes.dot}></span> : null}
        </div>
        <div className={clsx(classes.contentWrapper, classes.contentWrapperBalance, {
          [classes.withDot]: isBalanceInadequate
        })}>
          <span className={clsx(classes.balance, {
            [classes.inadequateBalance]: data.Balance < 0,
            [classes.pinkBalance]: isBalanceInadequate,
          })}>
            {
              getTextView(formatNum(data.Balance))
            }
          </span>
          {isBalanceInadequate ? <span className={classes.dot}></span> : null}
        </div>
        <div className={classes.contentWrapper}>
          <span className={clsx(classes.urgent, {
            [classes.zeroUrgent]: isUrgentZero
          })}>
            {getTextView(formatNum(data.UrgentBalance))}
          </span>
        </div>
        <div className={classes.contentWrapper}>
          <span className={classes.sumInvoice}>
            {getTextView(formatNum(data.InvoiceSum))}
          </span>
        </div>
        <div className={classes.contentWrapper}>
          <Button
            classes={{
              root: classes.iconButton
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleClickItem(omit(data, 'BankAccounts'))
            }}
          >
            <MenuIcon className={classes.menuIcon} />
          </Button>
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit classes={{wrapperInner: classes.collapseWrapperInner}}>
        {
          orderBy(data.BankAccounts, ['IsMain'], ['desc'])
          .map(BankAccount => (
            <BankAccountDetails
              key={BankAccount.Id}
              data={BankAccount}
            />
          ))
        }
      </Collapse>
    </div>
  )
}

export default React.memo(CooperativeItem);