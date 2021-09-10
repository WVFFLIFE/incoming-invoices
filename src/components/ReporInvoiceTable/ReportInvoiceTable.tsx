import { SortParams, SortParamsType, InvoiceModel } from 'models';
import { useState, useMemo } from 'react';

import _orderBy from 'lodash/orderBy';
import _get from 'lodash/get';
import { orderByType } from 'helpers';

import { StyledTable } from 'components/StyledComponents';
import ReportInvoiceTableHead from "./ReportInvoiceTableHead";
import ReportInvoiceTableBody from './ReportInvoiceTableBody';

interface ReportInvoiceTableProps {
  invoices: Omit<InvoiceModel, 'BankAccounts'>[];
}

const ReportInvoiceTable: React.FC<ReportInvoiceTableProps> = ({
  invoices
}) => {
  const [sortParams, setSortParams] = useState<SortParams>({
    order: 'asc',
    orderBy: 'Default',
    type: 'string',
  });

  const handleChangeSortParams = (
    id: string,
    type: SortParamsType
  ) => {
    setSortParams({
      order: sortParams.orderBy === id
        ? sortParams.order === 'asc' ? 'desc' : 'asc'
        : 'asc',
      orderBy: id,
      type,
    })
  }

  const sortedInvoices = useMemo(() => {
    const { order, orderBy, type } = sortParams;

    return _orderBy(
      invoices,
      (invoice) => orderByType(_get(invoice, orderBy), type),
      [order]
    )
  }, [sortParams, invoices])

  return (
    <StyledTable>
      <ReportInvoiceTableHead 
        order={sortParams.order}
        orderBy={sortParams.orderBy}
        handleChangeSortParams={handleChangeSortParams}
      />
      <ReportInvoiceTableBody 
        invoices={sortedInvoices}
      />
    </StyledTable>
  )
}

export default ReportInvoiceTable;