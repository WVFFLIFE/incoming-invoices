import { SortParamsType } from 'models';
import { useTranslation } from 'react-i18next';

import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { IconButton } from 'components/StyledComponents';
import SortedTableCell from 'components/Common/SortedTableCell';
import { ExpandIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

interface ReportTableHeadProps {
  order: 'asc' | 'desc';
  orderBy: string;
  expanded: boolean;
  handleChangeSortParams(id: string, type: SortParamsType): void;
  handleToggleExpanded(): void;
}

const ReportTableHead: React.FC<ReportTableHeadProps> = ({
  order,
  orderBy,
  expanded,
  handleToggleExpanded,
  handleChangeSortParams
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <thead>
      <tr className={classes.tr}>
        <td className={clsx(classes.td, classes.expandTd)}>
          <IconButton
            className={classes.expandIconBtn}
            onClick={handleToggleExpanded}
          >
            {
              expanded
                ? <ExpandIcon className={classes.expandIcon} />
                : <ArrowDown className={classes.expandIcon} />
            }
          </IconButton>
        </td>
        <SortedTableCell 
          id="Name"
          order={order}
          orderBy={orderBy}
          label={t('#table.cell.bankaccountname')}
          onClick={() => handleChangeSortParams('Name', 'string')}
        />
        <SortedTableCell 
          id="Operator.Name"
          order={order}
          orderBy={orderBy}
          label={t('#table.cell.operator')}
          onClick={() => handleChangeSortParams('Operator.Name', 'string')}
        />
        <SortedTableCell 
          id="Description"
          order={order}
          orderBy={orderBy}
          label={t('#table.cell.description')}
          onClick={() => handleChangeSortParams('Description', 'string')}
        />
        <SortedTableCell 
          id="TotalAmount"
          order={order}
          orderBy={orderBy}
          label={t('#table.cell.totalamount')}
          onClick={() => handleChangeSortParams('TotalAmount', 'number')}
        />
      </tr>
    </thead>
  )
}

export default ReportTableHead;