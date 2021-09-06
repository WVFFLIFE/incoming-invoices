import React, { useState } from 'react';
import {
  makeStyles,
  Button,
  Collapse
} from '@material-ui/core';
import Tooltip from 'components/Tooltip';
import PaidInvoiceItemDetails from 'components/PaidInvoiceItemDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/CancelPresentationOutlined';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import { TimeIcon, MessageIcon } from 'components/Icons';
import clsx from 'clsx';
import { formatNum, isRejectedInvoice, formatDate, getText } from 'helpers';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    background: '#fff',
    borderBottom: '1px solid rgba(236,236,236,0.5)',
    '&:last-child': {
      borderBottom: 0
    }
  },
  contentRoot: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff'
  },
  contentWrapper: {
    width: 'calc(100% / 5)',
    padding: 20,
    textAlign: 'center',
    '&:first-child': {
      textAlign: 'left'
    },
    '&:last-child': {
      textAlign: 'right'
    }
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    fontFamily: 'Lato',
    color: '#333'
  },
  textBold: {
    fontWeight: 700,
  },
  textMedium: {
    fontWeight: 500,
  },
  textLight: {
    fontWeight: 300,
  },
  expandButton: {
    minWidth: 'auto',
    width: 16,
    height: 16,
    marginLeft: 7,
    padding: 2,
    borderRadius: '50%'
  },
  expandIcon: {
    fontSize: '1.1rem',
    color: '#000',
    transition: '.2s linear'
  },
  expandIconActive: {
    transform: 'rotate(180deg)'
  },
  commentIcon: {
    fontSize: '1.1rem',
    color: '#224060'
  },
  commentIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 6,
    padding: 4,
    borderRadius: '50%',
    cursor: 'pointer',
    transition: '.25s linear',
    '&:hover': {
      background: '#F0F3F7'
    }
  },
  statusIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 31,
  },
  icon: {
    fontSize: '1rem'
  },
  cancelIcon: {
    color: '#DB0041'
  },
  checkIcon: {
    color: '#218D7A',
    fontSize: '1rem'
  },
  pendingIcon: {
    fill: '#64798F'
  },
  backgroundRoot: {
    background: 'rgba(255,71,71,0.05)'
  },
})

const PaidInvoiceItem = ({
  data,
  searchTerm
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const handleExpandedClick = () => {
    setExpanded(!expanded);
  }

  const Icon = isRejectedInvoice(data)
    ? (
      data?.RejectComment ? (
        <Tooltip
          arrow
          title={data?.RejectComment}
        >
          <CancelIcon className={clsx(classes.icon, classes.cancelIcon)} />
        </Tooltip>
      ) : (
          <Tooltip
            arrow
            title={t("#modal.filter.rejected")}
          >
            <CancelIcon className={clsx(classes.icon, classes.cancelIcon)} />
          </Tooltip>
        )
    )
    : data.InvoiceStatus.Value === 100000003
      ? (
        <Tooltip
          arrow
          title={t("#modal.filter.paid")}
        >
          <CheckIcon className={clsx(classes.icon, classes.checkIcon)} />
        </Tooltip>
      )
      : data.InvoiceStatus.Value === 100000001
        ? (
          <Tooltip
            arrow
            title={t("#modal.filter.pendingpaid")}
          >
            <TimeIcon className={clsx(classes.icon, classes.pendingIcon)} />
          </Tooltip>
        )
        : <span className={classes.icon}></span>;

  const getTextView = getText(searchTerm);
  const DueDate = formatDate(data.DueDate);
  const PaidDate = formatDate(data?.PaymentDate);

  return (
    <div className={classes.root}>
      <div
        onClick={handleExpandedClick}
        className={clsx(classes.contentRoot, {
          [classes.backgroundRoot]: isRejectedInvoice(data)
        })}
      >
        <div className={clsx(classes.contentWrapper, classes.flex)}>
          <div className={classes.statusIconWrapper}>
            {Icon}
          </div>
          <span className={clsx(classes.text, classes.textBold)}>{data.Payer.Name}</span>
          {data.Comment ? (
            <Tooltip
              placement="bottom-start"
              arrow
              title={data.Comment}
            >
              <div className={classes.commentIconWrapper}>
                <MessageIcon className={classes.commentIcon} />
              </div>
            </Tooltip>
          ) : null}
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
        </div>
        <div className={classes.contentWrapper}>
          <span className={clsx(classes.text, classes.textMedium)}>
            {getTextView(data.Seller)}
          </span>
        </div>
        <div className={classes.contentWrapper}>
          <span className={clsx(classes.text, classes.textLight)}>
            {getTextView(DueDate)}
          </span>
        </div>
        <div className={classes.contentWrapper}>
          <span className={clsx(classes.text, classes.textLight)}>
            {getTextView(PaidDate)}
          </span>
        </div>
        <div className={classes.contentWrapper}>
          <span className={clsx(classes.text, classes.textMedium)}>
            {getTextView(formatNum(data.Amount))}
          </span>
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <PaidInvoiceItemDetails
          data={data}
          searchTerm={searchTerm}
        />
      </Collapse>
    </div>
  )
}

export default PaidInvoiceItem;