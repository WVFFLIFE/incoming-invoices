import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { formatNum } from 'helpers';
import toLower from 'lodash/toLower';

import Box from '@material-ui/core/Box';
import DropdownSearch from 'components/DropdownSearch';
import FiltersBar from 'components/FiltersBar';
import { BalanceIcon, ContractIcon } from 'components/Icons';
import { CancelButton, ApplyButton } from 'components/StyledComponents';

import clsx from 'clsx';
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

const Body = ({
  cooperatives,
  selectedCooperative,
  handleChangeCooperative,
  onClose
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const searchInput = useRef();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [localSelectedCooperative, setLocalSelectedCooperative] = useState(() => selectedCooperative || null);

  useEffect(() => {
    setLocalSelectedCooperative(selectedCooperative);
  }, [selectedCooperative]);

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  }, []);

  const handleChangeLocalSelectedCooperative = (coop) => {
    setLocalSelectedCooperative(coop);
  }

  const handleChangeFilter = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  const handleChangeSearchTerm = useCallback(
    (e) => {
      const { value } = e.target;

      setSearchTerm(value);
    },
    []
  );

  const onApply = () => {
    handleChangeCooperative(localSelectedCooperative);
    onClose();
  }

  const filterFn = getFilterFn(activeFilter);
  const filteredCooperatives = useMemo(() => {
    if (Array.isArray(cooperatives)) {
      return cooperatives
        .filter(cooperative =>
          filterBySearchTerm(cooperative, searchTerm) && filterFn(cooperative)
        );
    }

    return undefined;
  }, [cooperatives, filterFn, searchTerm]);

  return (
    <div className={classes.body}>
      <DropdownSearch
        ref={searchInput}
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      <FiltersBar
        filtersList={filtersList}
        activeFilter={activeFilter}
        handleChangeFilter={handleChangeFilter}
        withMargin
      />
      <ul className={classes.cooperativesList}>
        {
          Array.isArray(filteredCooperatives) && filteredCooperatives
            .map(cooperative => {
              const inadequateBalances = filterByInadequateBalance(cooperative),
                selected = localSelectedCooperative?.Id === cooperative.Id;

              return (
                <li
                  key={cooperative.Id}
                  className={clsx(classes.cooperativeItem, {
                    [classes.selected]: selected
                  })}
                  onClick={
                    () => handleChangeLocalSelectedCooperative(
                      selected ? null : cooperative
                    )
                  }
                >
                  <span className={classes.cooperativeName}>
                    {cooperative.Name}
                  </span>
                  <Box
                    display="flex"
                    alignItems="center"
                    marginLeft="20px"
                  >
                    <Box 
                      display="flex" 
                      alignItems="center"
                      paddingRight="15px"
                    >
                      <BalanceIcon className={clsx(classes.balancesIcon, {
                        [classes.errorBalancesIcon]: inadequateBalances
                      })} />
                      <span className={clsx(classes.amount, {
                        [classes.inadequateBalances]: inadequateBalances
                      })}>
                        {formatNum(cooperative.AllowedBalance)}
                      </span>
                    </Box>
                    <Box 
                      display="flex" 
                      alignItems="center"
                      paddingLeft="15px"
                    >
                      <ContractIcon className={classes.balancesIcon} />
                      <span className={classes.amount}>{formatNum(cooperative.InvoiceSum)}</span>
                    </Box>
                  </Box>
                </li>
              )
            })
        }
      </ul>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        marginTop="20px"
      >
        <CancelButton 
          className={classes.mr20}
          onClick={onClose}
        >
          {t('#report.button.cancel')}
        </CancelButton>
        <ApplyButton onClick={onApply} disabled={cooperatives.length === 0}>
          {t('#report.button.apply')}
        </ApplyButton>
      </Box>
    </div>
  )
}

export default Body;