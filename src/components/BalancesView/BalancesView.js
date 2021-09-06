import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
  EnhancedTableHead,
  CooperativeItem
} from 'components';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  cell: {
    width: 'calc(100% / 7 - 72px / 6)',
    padding: '15px 10px',
    textAlign: 'center',
    '&:first-child': {
      width: 'calc(100% * 2 / 7 - 72px / 6)',
      paddingLeft: 30,
      textAlign: 'left',
    },
    '&:last-child': {
      width: 72
    }
  },
  notFound: {
    margin: '30px 0',
    fontSize: 18,
    fontFamily: 'Proxima Nova',
    fontWeight: 300,
    color: 'rgba(0, 0, 0, .75)',
    textAlign: 'center'
  }
})

const headCells = [
  { id: 'Name', label: '#table.cell.cooperative', type: 'string' },
  { id: 'Limit', label: `#table.cell.amount.limit`, type: 'float' },
  { id: 'AllowedBalance', label: '#table.cell.amount.allowedbalance', type: 'float' },
  { id: 'Balance', label: '#table.cell.amount.balance', type: 'float' },
  { id: 'UrgentBalance', label: '#table.cell.amount.urgent', type: 'float' },
  { id: 'InvoiceSum', label: '#table.cell.amount.suminvoice', type: 'float' },
  { id: 'OpenInvoice', label: '' }
];

const BalancesView = ({
  data,
  sortParams,
  handleSetSortParams,
  handleClickItem,
  searchTerm
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      {data.length ? (
        <>
          <EnhancedTableHead
            headCells={headCells}
            onRequestSort={handleSetSortParams}
            sortParams={sortParams}
            cellClassName={classes.cell}
          />
          {data.map(item => (
            <CooperativeItem
              key={item.Id}
              data={item}
              handleClickItem={handleClickItem}
              searchTerm={searchTerm}
            />
          ))}
        </>
      ) : (
          <p className={classes.notFound}>
            {t('#records.notfound')}
          </p>
        )}
    </div>
  )
}

export default BalancesView;