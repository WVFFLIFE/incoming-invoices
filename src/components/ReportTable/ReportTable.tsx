import { SortParams, EnhancedBankAccountModel, SortParamsType } from 'models';
import { useState, useMemo } from 'react';
import { orderByType } from 'helpers';
import _orderBy from 'lodash/orderBy';
import _get from 'lodash/get';

import ReportTableHead from './ReportTableHead';
import ReportTableBody from './ReportTableBody';
import { StyledTable } from 'components/StyledComponents';

interface ReportTableProps {
  bankAccounts: EnhancedBankAccountModel[];
}

const ReportTable: React.FC<ReportTableProps> = ({
  bankAccounts
}) => {
  const [expandedAll, setExpandedAll] = useState(false);
  const [sortParams, setSortParams] = useState<SortParams>({
    order: 'asc',
    orderBy: 'Default',
    type: 'string',
  });

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
      <ReportTableBody 
        bankAccounts={sortedBankAccounts}
        expanded={expandedAll}
      />
    </StyledTable>
  )
}

export default ReportTable;