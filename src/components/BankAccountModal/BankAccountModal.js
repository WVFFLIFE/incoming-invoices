import React, { useState } from 'react';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import { orderByType } from 'helpers';
import Button from '@material-ui/core/Button';
import BankAccountModalItem from 'components/BankAccountModalItem';
import EnhancedTableHead from 'components/EnhancedTableHead';
import { useTranslation } from 'react-i18next';
import { useStyles } from './style';

const headCells = [
  { id: 'Name', label: '#details.bankaccountname', type: 'string' },
  { id: 'Description', label: '#details.description', type: 'string' },
  { id: 'Operator.Name', label: '#details.operator', type: 'string' },
  { id: 'Limit', label: '#table.cell.amount.limit', type: 'float' },
  { id: 'AllowedBalance', label: '#table.cell.amount.allowedbalance', type: 'float' },
  { id: 'Balance', label: '#table.cell.amount.balance', type: 'float' }
]

const BankAccountModal = ({
  invoiceId,
  data,
  handleClose,
  activeId,
  handleUpdateBankAccount
}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const [sortParams, setSortParams] = useState({
    order: 'asc',
    key: 'Name',
    type: 'string'
  })
  const [activeBankAccount, setActiveBankAccount] = useState(activeId);

  const onChangeSortParams = (sortKey, sortType = 'string') => {
    setSortParams(prevState => ({
      key: sortKey,
      order: prevState.order === 'desc' ? 'asc' : 'desc',
      type: sortType
    }))
  }

  const handleChangeActiveBankAcccount = id => {
    setActiveBankAccount(id);
  }

  const handleChangeBankAccount = () => {
    handleUpdateBankAccount(invoiceId, activeBankAccount);
    handleClose();
  }

  return (
    <>
      <h2 className={classes.title}>
        {t('#bankaccount.change.title')}
      </h2>
      <p className={classes.description}>
        {t("#bankaccount.change.subtitle")}
      </p>
      <div>
        <EnhancedTableHead
          sortParams={sortParams}
          headCells={headCells}
          onRequestSort={onChangeSortParams}
          cellClassName={classes.cell}
        />
        {
          orderBy(
            data,
            c => orderByType(get(c, sortParams.key), sortParams.type),
            [sortParams.order || 'asc']
          ).map(item => (
            <BankAccountModalItem
              key={item.Id}
              data={item}
              isActive={activeBankAccount === item.Id}
              handleClick={handleChangeActiveBankAcccount}
            />
          ))
        }
      </div>
      <div className={classes.actionsWrapper}>
        <Button
          classes={{
            root: classes.cancelBtn
          }}
          onClick={handleClose}
        >
          {t('#button.cancel')}
        </Button>
        <Button
          onClick={handleChangeBankAccount}
          classes={{
            root: classes.resolveBtn
          }}
        >
          {t('#button.changeaccount')}
        </Button>
      </div>
    </>
  )
}

export default BankAccountModal;