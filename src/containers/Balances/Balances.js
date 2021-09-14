import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  setSortParams,
  setFilter,
  setSearchTerm,
  selectSubstitute,
  changeRowsPerPage,
  changeCurrentPage,
  refreshBalancesData,
  initError
} from 'actions/balancesActions';
import { setSelectedCooperative, setCurrentTab } from 'actions/settingsActions';
import { useDispatch, useSelector, batch } from 'react-redux';
import {
  getCooperatives,
  sortBalancesSelector,
  loadingBalancesSelector,
  filterBalancesSelector,
  searchTermBalancesSelector,
  substituteSelector,
  paginationParamsBalancesSelector,
  getTotalCooperativesItemsSelector,
  getBalancesError
} from 'selectors';
import {
  BalancesView,
  ControlsBar,
  FiltersBar,
  SearchControl,
  FlexWrapper,
  RefreshButton,
  Autocomplete,
  Pagination,
  Loader,
  Dialog,
  ErrorModal
} from 'components';

const filtersList = [
  { id: 'inadequateBalance', label: '#filter.inadequatebalance' },
  { id: 'all', label: '#filter.all' }
]

const Balances = () => {
  const {
    cooperatives, loading,
    sortParams, activeFilter,
    searchTerm, substitute,
    totalItems, paginationParams,
    error
  } = useSelector(state => ({
    cooperatives: getCooperatives(state),
    loading: loadingBalancesSelector(state),
    sortParams: sortBalancesSelector(state),
    paginationParams: paginationParamsBalancesSelector(state),
    activeFilter: filterBalancesSelector(state),
    searchTerm: searchTermBalancesSelector(state),
    substitute: substituteSelector(state),
    totalItems: getTotalCooperativesItemsSelector(state),
    error: getBalancesError(state)
  }));
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    dispatch(refreshBalancesData());

    /* eslint-disable-next-line */
  }, []);

  const handleChangeRowsPerPage = (e) => {
    const val = e.target.value;
    dispatch(changeRowsPerPage(val))
  }

  const handleChangeCurrentPage = (page) => {
    dispatch(changeCurrentPage(page))
  }

  const handleSetSortParams = (...args) => {
    dispatch(setSortParams(...args))
  }

  const handleChangeFilter = filter => {
    dispatch(setFilter(filter))
  }

  const handleChangeSearchTerm = useCallback((e) => {
    const { value } = e.target;

    dispatch(setSearchTerm(value))
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(refreshBalancesData());
  }

  const handleChangeSubstitute = (value) => {
    batch(() => {
      dispatch(selectSubstitute(value));
      // dispatch(setSelectedCooperative([]));
    })
  }

  const handleSelectCooperative = useCallback(cooperative => {
    batch(() => {
      dispatch(setSelectedCooperative([cooperative]));
      dispatch(setCurrentTab('payment', false))
    })
  }, [dispatch]);

  const closeErrorModal = useCallback(() => {
    dispatch(initError())
  }, [dispatch])

  return (
    <>
      <FlexWrapper className="mb-20">
        <p className="tab-title">
          {t('#sidebar.tab.balances')}
        </p>
        <FlexWrapper>
          <RefreshButton
            handleClick={handleRefresh}
          />
        </FlexWrapper>
      </FlexWrapper>
      <ControlsBar>
        <FlexWrapper>
          <Autocomplete
            options={substitute.options}
            value={substitute.value}
            handleChangeValue={handleChangeSubstitute}
            compareField="Name"
          />
          <FiltersBar
            filtersList={filtersList}
            activeFilter={activeFilter}
            handleChangeFilter={handleChangeFilter}
          />
        </FlexWrapper>
        <SearchControl
          value={searchTerm}
          handleChangeValue={handleChangeSearchTerm}
        />
      </ControlsBar>
      <BalancesView
        data={cooperatives}
        sortParams={sortParams}
        searchTerm={searchTerm}
        handleSetSortParams={handleSetSortParams}
        handleClickItem={handleSelectCooperative}
      />
      {cooperatives.length ? (
        <Pagination
          onChangeRowsPerPage={handleChangeRowsPerPage}
          onChangeCurrentPage={handleChangeCurrentPage}
          totalItems={totalItems}
          itemsPerPage={paginationParams.rowsPerPage}
          currentPage={paginationParams.currentPage}
          options={[5, 10, 15]}
        />
      ) : null}
      <Loader
        visible={loading}
      />
      <Dialog
        maxWidth="sm"
        open={error.status}
        handleClose={closeErrorModal}
      >
        <ErrorModal 
          message={error.message}
        />
      </Dialog>
    </>
  )
}

export default Balances;