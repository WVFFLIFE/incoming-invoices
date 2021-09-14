import {
  SortParams,
  SortParamsType,
  InvoiceModel,
  PaginationParams
} from 'models';
import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import _orderBy from 'lodash/orderBy';
import _get from 'lodash/get';
import { orderByType } from 'helpers';

import { StyledTable } from 'components/StyledComponents';
import Pagination from 'components/Pagination';
import ReportInvoiceTableHead from "./ReportInvoiceTableHead";
import ReportInvoiceTableRow from './ReportInvoiceTableRow';

import { useStyles } from './style';

interface ReportInvoiceTableProps {
  invoices: Omit<InvoiceModel, 'BankAccounts'>[];
  searchTerm: string;
}

const paginationOptions = [6, 12, 24];

const ReportInvoiceTable: React.FC<ReportInvoiceTableProps> = ({
  invoices,
  searchTerm
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [sortParams, setSortParams] = useState<SortParams>({
    order: 'asc',
    orderBy: 'Default',
    type: 'string',
  });
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    currentPage: 0,
    itemsPerPage: 12,
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
  };

  const handleChangeItemsPerPage = useCallback((e) => {
    const val = e.target.value;

    setPaginationParams(s => ({
      ...s,
      itemsPerPage: val
    }))
  }, []);

  const handleChangeCurrentPage = useCallback((page: number) => {
    setPaginationParams(s => ({
      ...s,
      currentPage: page - 1
    }))
  }, []);

  const sortedInvoices = useMemo(() => {
    const { order, orderBy, type } = sortParams;

    return _orderBy(
      invoices,
      (invoice) => orderByType(_get(invoice, orderBy), type),
      [order]
    )
  }, [sortParams, invoices]);

  const invoicesPerPage = useMemo(() => {
    const { currentPage, itemsPerPage } = paginationParams;

    const start = currentPage * itemsPerPage,
      end = start + itemsPerPage;

    return sortedInvoices.slice(start, end);
  }, [sortedInvoices, paginationParams]);

  return (
    <>
      <StyledTable>
        <ReportInvoiceTableHead
          order={sortParams.order}
          orderBy={sortParams.orderBy}
          handleChangeSortParams={handleChangeSortParams}
        />
        <tbody>
          {
            sortedInvoices.length
              ? invoicesPerPage.map(invoice => (
                <ReportInvoiceTableRow 
                  key={invoice.Id}
                  invoice={invoice}
                  searchTerm={searchTerm}
                />
              ))
              : (
                <tr>
                  <td colSpan={8} className={classes.empty}>
                    {t('#records.notfound')}
                  </td>
                </tr>
              )
          }
        </tbody>
      </StyledTable>
      {
        sortedInvoices.length
          ? (
            <div className={classes.paginationWrapper}>
              <Pagination
                currentPage={paginationParams.currentPage}
                itemsPerPage={paginationParams.itemsPerPage}
                options={paginationOptions}
                totalItems={sortedInvoices.length}
                onChangeRowsPerPage={handleChangeItemsPerPage}
                onChangeCurrentPage={handleChangeCurrentPage}
              />
            </div>
          ) : null
      }
    </>
  )
}

export default ReportInvoiceTable;