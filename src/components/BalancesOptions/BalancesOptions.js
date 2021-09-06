import { useState } from 'react';
import {
  Button
} from '@material-ui/core';
import { List } from 'react-virtualized';
import { ResizableBox } from 'react-resizable';
import { BalanceIcon, ContractIcon } from 'components/Icons';
import FiltersBar from 'components/FiltersBar';
import Checkbox from 'components/Checkbox';
import DropdownSearch from 'components/DropdownSearch';
import clsx from 'clsx';
import find from 'lodash/find';
import toLower from 'lodash/toLower';
import { useTranslation } from 'react-i18next';
import { formatNum } from 'helpers';
import { useStyles } from './style';

const filtersList = [
  { id: 'inadequateBalance', label: '#filter.inadequatebalance' },
  { id: 'all', label: '#filter.all' }
];

const filterAll = el => el;
const filterByInadequateBalance = el => {
  if (el.UrgentBalance === 0) {
    return false;
  }
  if (typeof el?.AllowedBalance === 'number') {
    return el.AllowedBalance < el.UrgentBalance
  }

  if (typeof el?.Balance === 'number') {
    return el.Balance < el.UrgentBalance
  }

  return false;
}

function getFilterFn(filter) {
  switch (filter) {
    case 'all':
      return () => true;
    case 'inadequateBalance':
      return filterByInadequateBalance
    default:
      return filterAll
  }
}

const filterBySearchTerm = (el, searchTerm) => {
  return toLower(el.Name).includes(toLower(searchTerm))
}

const rowHeight = 44;

const BalancesOptions = ({
  selectedItems,
  options,
  handleClose,
  handleSelect,
  width,
  selectOne = false
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedItems, setCheckedItems] = useState([...selectedItems]);
  const [resizableParams, setResizableParams] = useState({ width, height: 413 })
  const selectedAll = options.length === checkedItems.length;

  const onResize = (event, {element, size, handle}) => {
    setResizableParams({width: size.width, height: size.height})
  };

  const handleChangeFilter = (filter) => {
    setActiveFilter(filter);
  }

  const handleChangeSearchTerm = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  }

  const handleChangeCheckedItem = (e, el) => {
    setCheckedItems(prevState => {
      return e.target.checked
        ? [...prevState, el]
        : prevState.filter(prevItem => prevItem.Id !== el.Id)
    })
  }

  const handleChangeOneCheckedItem = (e, el) => {
    let res = e.target.checked ? [el] : [];
    setCheckedItems(res)
  }

  const handleChangeSelectedItem = () => {
    handleSelect([...checkedItems]);
    handleClose();
  }

  const handleSelectAll = () => {
    let res = selectedAll ? [] : [...options];
    setCheckedItems(res)
  }

  const renderRow = (data, { index, key, style }) => {
    const option = data[index];
    const isActive = !!find(checkedItems, { Id: option.Id })
    const inadequateBalances = filterByInadequateBalance(option);

    return (
      <div
        className={clsx(classes.listItem, {
          [classes.activeListItem]: isActive
        })}
        key={option.Id}
        style={style}
      >
        <div className={classes.itemLeftBar}>
          <Checkbox
            checked={isActive}
            onChange={(e) => selectOne ? handleChangeOneCheckedItem(e, option) : handleChangeCheckedItem(e, option)}
          />
          <span className={classes.itemName}>{option.Name}</span>
        </div>
        <div className={classes.flex}>
          <div className={clsx(classes.flex, classes.balanceWrapper)}>
            <BalanceIcon className={clsx(classes.balancesIcon, {
              [classes.errorBalancesIcon]: inadequateBalances
            })} />
            <span className={clsx(classes.amount, {
              [classes.inadequateBalances]: inadequateBalances
            })}>{formatNum(option.AllowedBalance)}</span>
          </div>
          <div className={clsx(classes.flex, classes.allowedBalanceWrapper)}>
            <ContractIcon className={classes.balancesIcon} />
            <span className={classes.amount}>{formatNum(option.InvoiceSum)}</span>
          </div>
        </div>
      </div>
    )
  }

  const renderOptions = (data) => {
    return (
      <List
        width={resizableParams.width - 24} // 24 - padding
        height={resizableParams.height - 193} // 193 - balance options height except list
        rowHeight={rowHeight}
        rowRenderer={(params) => renderRow(data, params)}
        rowCount={data.length}
        overscanRowCount={3}
        style={{ outline: 0 }}
      />
    )
  }

  const handleEnterKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSelect([...checkedItems]);
      e.preventDefault();
      handleClose();
    }
  }

  const filterFn = getFilterFn(activeFilter);
  const currentOptions = options.filter(option => filterBySearchTerm(option, searchTerm) && filterFn(option));

  return (
    <ResizableBox
      width={resizableParams.width}
      height={resizableParams.height}
      minConstraints={[width, 413]}
      axis="both"
      onResize={onResize}
    >
      <div className={classes.root} onKeyDown={handleEnterKeyDown}>
        <DropdownSearch 
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
        <div className={classes.buttonsWrapper}>
          <FiltersBar
            filtersList={filtersList}
            activeFilter={activeFilter}
            handleChangeFilter={handleChangeFilter}
            withMargin
          />
          {selectOne ? null : (
            <div
              onClick={handleSelectAll}
              className={clsx(classes.filterItem, {
                [classes.activeFilter]: selectedAll,
              })}
            >
              {selectedAll ? t('#filter.deselectall') : t('#filter.selectall')}
            </div>
          )}
        </div>
        {options.length ? renderOptions(currentOptions) : null}
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
            classes={{
              root: classes.resolveBtn,
              disabled: classes.disabledApplyButton
            }}
            disabled={options.length === 0}
            onClick={handleChangeSelectedItem}
          >
            {t('#button.use')}
          </Button>
        </div>
      </div>
    </ResizableBox>
  )
}

export default BalancesOptions;