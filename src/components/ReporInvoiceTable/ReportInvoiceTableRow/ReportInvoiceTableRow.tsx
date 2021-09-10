import { InvoiceModel } from 'models';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import _get from 'lodash/get';
import { 
  defaultFormat, 
  formatNum, 
  isRejectedInvoice 
} from 'helpers';

import { PendingIcon } from 'components/Icons';
import CancelIcon from '@material-ui/icons/CancelPresentationOutlined';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import Tooltip from 'components/Tooltip';
import Box from '@material-ui/core/Box';

import clsx from 'clsx';
import { useStyles } from "./style";

interface ReportInvoiceTableRowProps {
  invoice: Omit<InvoiceModel, 'BankAccounts'>
}

const ReportInvoiceTableRow: React.FC<ReportInvoiceTableRowProps> = ({
  invoice,
}) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const Icon = isRejectedInvoice(invoice)
    ? (
      invoice.RejectComment ? (
        <Tooltip
          arrow
          title={invoice.RejectComment}
        >
          <CancelIcon 
            className={clsx(classes.icon, classes.cancelIcon)} 
          />
        </Tooltip>
      ) : (
        <Tooltip
          arrow
          title={t("#modal.filter.rejected")}
        >
          <CancelIcon 
            className={clsx(classes.icon, classes.cancelIcon)} 
          />
        </Tooltip>
      )
    )
    : invoice.InvoiceStatus.Value === 100000003
      ? (
        <Tooltip
          arrow
          title={t("#modal.filter.paid")}
        >
          <CheckIcon 
            className={clsx(classes.icon, classes.checkIcon)} 
          />
        </Tooltip>
      )
      : invoice.InvoiceStatus.Value === 100000001
        ? (
          <Tooltip
            arrow
            title={t("#modal.filter.pendingpaid")}
          >
            <PendingIcon 
              className={clsx(classes.icon, classes.pendingIcon)} 
            />
          </Tooltip>
        )
        : <span className={classes.icon}></span>;

  return (
    <tr className={clsx(classes.tr, {
      [classes.rejected]: isRejectedInvoice(invoice)
    })}>
      <td className={clsx(classes.td, classes.right)}>
        <Box
          component="span"
          display="inline-flex"
          alignItems="center"
        >
          {Icon}
        </Box>
      </td>
      <td className={classes.td}>
        {_get(invoice, 'Seller')}
      </td>
      <td className={clsx(classes.td, classes.light)}>
        <span className={classes.underline}>
          {_get(invoice, 'InvoiceNumber')}
        </span>
      </td>
      <td className={clsx(classes.td, classes.light)}>
        {defaultFormat(_get(invoice, 'AccountingDate'))}
      </td>
      <td className={clsx(classes.td, classes.light)}>
        {defaultFormat(_get(invoice, 'DueDate'))}
      </td>
      <td className={clsx(classes.td, classes.light)}>
        {defaultFormat(_get(invoice, 'PaymentDate'))}
      </td>
      <td className={classes.td}>
        {formatNum(_get(invoice, 'Amount'))}
      </td>
      <td className={classes.td}>

      </td>
    </tr>
  )
}

export default memo(ReportInvoiceTableRow);