import { SortParamsType } from 'models';
import { useTranslation } from 'react-i18next';

import SortedTableCell from 'components/Common/SortedTableCell';

import { useStyles } from './style';

interface ReportInvoiceTableHeadProps {
  order: 'asc' | 'desc';
  orderBy: string;
  handleChangeSortParams(id: string, type: SortParamsType): void;
}

const ReportInvoiceTableHead: React.FC<ReportInvoiceTableHeadProps> = ({
  order,
  orderBy,
  handleChangeSortParams
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <thead>
      <tr className={classes.tr}>
        <td className={classes.td}></td>
        <SortedTableCell 
          id="Seller"
          order={order}
          orderBy={orderBy}
          label={t('#table.reportinvoice.cell.seller')}
          onClick={() => handleChangeSortParams('Seller', 'string')}
          style={{ width: '28%' }}
        />
        <SortedTableCell 
          id="InvoiceNumber"
          order={order}
          orderBy={orderBy}
          label={t('#table.reportinvoice.cell.invoicenumber')}
          onClick={() => handleChangeSortParams('InvoiceNumber', 'number')}
          style={{ width: '15%' }}
        />
        <SortedTableCell 
          id="AccountingDate"
          order={order}
          orderBy={orderBy}
          label={t('#table.reportinvoice.cell.accountingdate')}
          onClick={() => handleChangeSortParams('AccountingDate', 'date')}
          style={{ width: '11%' }}
        />
        <SortedTableCell 
          id="DueDate"
          order={order}
          orderBy={orderBy}
          label={t('#table.reportinvoice.cell.duedate')}
          onClick={() => handleChangeSortParams('DueDate', 'date')}
          style={{ width: '11%' }}
        />
        <SortedTableCell 
          id="PaymentDate"
          order={order}
          orderBy={orderBy}
          label={t('#table.reportinvoice.cell.paymentdate')}
          onClick={() => handleChangeSortParams('PaymentDate', 'date')}
          style={{ width: '11%' }}
        />
        <SortedTableCell 
          id="Amount"
          order={order}
          orderBy={orderBy}
          label={t('#table.reportinvoice.cell.totalamount')}
          onClick={() => handleChangeSortParams('Amount', 'number')}
          style={{ width: '14%' }}
        />
        <td></td>
      </tr>
    </thead>
  )
}

export default ReportInvoiceTableHead;