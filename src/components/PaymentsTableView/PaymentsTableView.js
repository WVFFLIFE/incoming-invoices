import React from 'react';
import {
  EnhancedTableHead,
  InvoiceItem,
  InvoiceItemDetails
} from 'components';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import clsx from 'clsx';

const headCells = [
  { id: 'Payer.Name', label: '#table.cell.payer', type: 'string' },
  { id: 'Seller', label: '#table.cell.sellersuplier', type: 'string' },
  { id: 'DueDate', label: '#table.cell.duedate', type: 'date' },
  { id: 'Amount', label: '#table.cell.amount.amounttopay', type: 'float' },
  { id: 'SendToBank', label: '' }
];

const useStyles = makeStyles({
  cell: {
    width: 'calc(100% / 4 - 96px / 4)',
    padding: '15px 20px',
    '&:first-child': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      paddingLeft: 0,
      paddingRight: 0
    },
    '&:last-child': {
      width: 56
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

const PaymentsTableView = ({
  data,
  sortParams,
  searchTerm,
  isPayNow,
  onChangeSortParams,
  handleSelectAllInvoices,
  handleSelectInvoice,
  selectedInvoices,
  selectedCooperativesLength,
  ableToSelectLength,
  handleUpdateDate,
  handleRejectInvoice,
  handleUpdateBankAccount,
  handleSendPayments,
  handleChangePayNowStatus
}) => {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <div className={clsx({
      [classes.rootNotFound]: !data.length
    })}>
      {data.length ? (
        <>
          <EnhancedTableHead
            withCheckbox
            headCells={headCells}
            sortParams={sortParams}
            onRequestSort={onChangeSortParams}
            cellClassName={classes.cell}
            handleChangeCheckbox={handleSelectAllInvoices}
            checked={ableToSelectLength <= selectedInvoices.length}
          />
          {data.map(item => (
            <InvoiceItem
              data={item}
              isPayNow={isPayNow}
              searchTerm={searchTerm}
              handleChangePayNowStatus={handleChangePayNowStatus}
              key={item.Id}
              handleChangeCheckbox={handleSelectInvoice}
              checked={selectedInvoices.includes(item.Id)}
              handleSendPayments={handleSendPayments}
              selectedCooperativesLength={selectedCooperativesLength}
              collapseComponent={
                <InvoiceItemDetails
                  data={item}
                  searchTerm={searchTerm}
                  handleUpdateDate={handleUpdateDate}
                  handleRejectInvoice={handleRejectInvoice}
                  handleUpdateBankAccount={handleUpdateBankAccount}
                  checked={selectedInvoices.includes(item.Id)}
                />
              }
            />
          ))}
        </>
      ) : (
          <p className={classes.notFound}>{t('#records.notfound')}</p>
      )}
    </div>
  )
}

export default React.memo(PaymentsTableView);