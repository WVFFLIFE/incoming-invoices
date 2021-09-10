import { EnhancedBankAccountModel } from 'models';
import { memo, useState, useEffect } from 'react';

import _get from 'lodash/get';
import { formatNum } from 'helpers';

import Collapse from '@material-ui/core/Collapse';
import { IconButton } from 'components/StyledComponents';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import ReportInvoiceTable from 'components/ReporInvoiceTable';

import clsx from 'clsx';
import { useStyles } from './style';

interface ReportTableRowProps {
  bankAccount: EnhancedBankAccountModel;
  expanded: boolean;
}

const ReportTableRow: React.FC<ReportTableRowProps> = ({
  bankAccount,
  expanded,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(() => expanded);

  useEffect(() => {
    setOpen(expanded);
  }, [expanded]);

  const onToggle = () => {
    setOpen(!open);
  }

  return (
    <>
      <tr
        onClick={onToggle}
      >
        <td className={classes.expandedTd}>
          <IconButton className={classes.expandIconBtn}>
            <ArrowDown className={clsx(classes.expandIcon, {
              [classes.rotated]: open
            })} />
          </IconButton>
        </td>
        <td className={classes.td}>
          {_get(bankAccount, 'Name')}
        </td>
        <td className={classes.td}>
          {_get(bankAccount, 'Operator.Name')}
        </td>
        <td className={classes.td}>
          {_get(bankAccount, 'Description')}
        </td>
        <td className={classes.td}>
          {formatNum(_get(bankAccount, 'TotalAmount'))}
        </td>
      </tr>
      <tr className={classes.tr}>
        <td colSpan={5}>
          <Collapse
            in={open}
            unmountOnExit
          >
            <ReportInvoiceTable 
              invoices={bankAccount.Invoices}
            />
          </Collapse>
        </td>
      </tr>
    </>
  )
}

export default memo(ReportTableRow);