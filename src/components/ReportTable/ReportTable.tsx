import { SortParams, EnhancedBankAccountModel, SortParamsType } from 'models';
import { useState, useMemo, useEffect } from 'react';
import { orderByType } from 'helpers';
import _orderBy from 'lodash/orderBy';
import _get from 'lodash/get';

import ReportTableHead from './ReportTableHead';
import ReportTableRow from './ReportTableRow';
import { StyledTable } from 'components/StyledComponents';

interface ReportTableProps {
  bankAccounts: EnhancedBankAccountModel[];
  searchTerm: string;
}

const ReportTable: React.FC<ReportTableProps> = ({
  bankAccounts,
  searchTerm
}) => {
  const [expandedAll, setExpandedAll] = useState(() => !!searchTerm);
  const [sortParams, setSortParams] = useState<SortParams>({
    order: 'asc',
    orderBy: 'Default',
    type: 'string',
  });

  useEffect(() => {
    if (searchTerm) {
      setExpandedAll(true);
    }
  }, [searchTerm])

  const handleToggleExpanded = () => {
    setExpandedAll(!expandedAll);
  };

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

  const sortedBankAccounts = useMemo(() => {
    const { order, orderBy, type } = sortParams;

    if (sortParams.orderBy === 'Default') {
      return _orderBy(
        bankAccounts,
        (bankAccount) => orderByType(bankAccount.IsMain, 'boolean')
        ['desc']
      )
    }

    return _orderBy(
      bankAccounts,
      (bankAccount) => orderByType(_get(bankAccount, orderBy), type),
      [order]
    )
  }, [sortParams, bankAccounts]);

  return (
    <StyledTable>
      <ReportTableHead 
        order={sortParams.order}
        orderBy={sortParams.orderBy}
        expanded={expandedAll}
        handleToggleExpanded={handleToggleExpanded}
        handleChangeSortParams={handleChangeSortParams}
      />
      <tbody>
      {
        sortedBankAccounts.map(bankAccount => {
          return (
            <ReportTableRow 
              key={bankAccount.Id}
              bankAccount={bankAccount}
              expanded={expandedAll || !!bankAccount.IsMain}
              searchTerm={searchTerm}
            />
          )
        })
      }
      </tbody>
    </StyledTable>
  )
}

export default ReportTable;