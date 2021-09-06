import React from 'react';
import {
  EnhancedTableHead,
  PaidInvoiceItem
} from 'components';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const useStyles = makeStyles({
  cell: {
    width: 'calc(100% / 5)',
    padding: '15px 20px',
    textAlign: 'center',
    '&:first-child': {
      textAlign: 'left'
    },
    '&:last-child': {
      textAlign: 'right'
    }
  },
  rootNotFound: {
    padding: 30,
    background: "#fff"
  },
  notFound: {
    margin: 0,
    fontSize: 18,
    fontFamily: 'Proxima Nova',
    fontWeight: 300,
    color: 'rgba(0, 0, 0, .75)',
    textAlign: 'center'
  }
})

const headCells = [
  { id: 'Payer.Name', label: '#table.cell.payer', type: 'string' },
  { id: 'Seller', label: '#table.cell.seller', type: 'string' },
  { id: 'DueDate', label: '#table.cell.duedate', type: 'date' },
  { id: 'PaymentDate', label: '#table.cell.paiddate', type: 'date' },
  { id: 'Amount', label: '#table.cell.amount.paidamount', type: 'float' }
]

const PaidTableView = ({
  data,
  sortParams,
  searchTerm,
  onChangeSortParams
}) => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <div className={clsx({
      [classes.rootNotFound]: !data.length
    })}>
      {data.length ? (
        <>
          <EnhancedTableHead
            headCells={headCells}
            sortParams={sortParams}
            onRequestSort={onChangeSortParams}
            cellClassName={classes.cell}
          />
          {data.map(item => (
            <PaidInvoiceItem
              data={item}
              key={item.Id}
              searchTerm={searchTerm}
            />
          ))}
        </>
      ) : (
        <p className={classes.notFound}>{t('#records.notfound')}</p>
      )}
    </div>
  )
}

export default React.memo(PaidTableView);