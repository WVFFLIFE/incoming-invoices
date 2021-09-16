import { EnhancedBankAccountModel } from 'models';
import { memo, useState, useEffect, useRef } from 'react';

import _get from 'lodash/get';
import { formatNum, getText } from 'helpers';

import Collapse from '@material-ui/core/Collapse';
import { IconButton } from 'components/StyledComponents';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import ReportInvoiceTable from 'components/ReporInvoiceTable';

import clsx from 'clsx';
import { useStyles } from './style';

interface ReportTableRowProps {
  bankAccount: EnhancedBankAccountModel;
  expanded: boolean;
  searchTerm: string;
}

const ReportTableRow: React.FC<ReportTableRowProps> = ({
  bankAccount,
  expanded,
  searchTerm,
}) => {
  const classes = useStyles();

  const rendered = useRef(false);

  const [open, setOpen] = useState(() => 
    expanded || !!bankAccount.IsMain
  );

  useEffect(() => {
    if (rendered.current) {
      setOpen(expanded);
    } else {
      rendered.current = true;
    }
  }, [expanded]);

  const onToggle = () => {
    setOpen(!open);
  }

  const highlight = getText(searchTerm);

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
          {highlight(_get(bankAccount, 'Name'))}
        </td>
        <td className={classes.td}>
          {highlight(_get(bankAccount, 'Operator.Name'))}
        </td>
        <td className={classes.td}>
          {highlight(_get(bankAccount, 'Description'))}
        </td>
        <td className={classes.td}>
          {highlight(
            formatNum(_get(bankAccount, 'TotalAmount')),
            'number'
          )}
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
              searchTerm={searchTerm}
            />
          </Collapse>
        </td>
      </tr>
    </>
  )
}

export default memo(ReportTableRow);