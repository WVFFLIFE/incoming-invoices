import { 
  CooperativeModel, 
  EnhancedBankAccountModel,
  DefaultError 
} from 'models';
import { 
  useState, 
  useEffect, 
  useCallback, 
  ChangeEvent 
} from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { getCooperativesOptions } from 'selectors';
import { selectReportCooperative } from 'actions/reportActions';

import keyByBankAccounts from 'helpers/keyByBankAccounts';
import format from 'date-fns/format';
import services from 'services/InternalAPI';

import {
  ControlsBar, 
  FlexWrapper,
  Loader
} from 'components';
import {
  PrintIcon,
  DownloadIcon,
  FilterIcon
} from 'components/Icons';
import Button from 'components/Button';
import CoooperativePicker from 'components/CooperativePicker';
import DatePicker from 'components/Controls/DatePicker';
import Search from 'components/Controls/Search';
import Box from '@material-ui/core/Box';
import FiltersBar from 'components/FiltersBar';
import { IconButton } from 'components/StyledComponents';

import { useStyles } from './style';

const filtersList = [
  { id: 'all', label: '#filter.allinvoices' },
  { id: 'pending', label: '#filter.pending' },
  { id: 'paid', label: '#filter.paid' },
  { id: 'rejected', label: '#filter.rejected' },
  { id: 'unpaid', label: '#filter.unpaid' }
];

interface Res {
  bankAccounts: EnhancedBankAccountModel[];
  loading: boolean;
  error: DefaultError;
}

const Report = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { 
    selectedCooperative, 
    cooperatives,
    substitute, 
  } = useSelector((state: any) => ({
    cooperatives: (getCooperativesOptions(state) as any),
    selectedCooperative: state.report.selectedCooperative,
    substitute: state.balances.substitute.value
  }));

  const [res, setRes] = useState<Res>({
    bankAccounts: [],
    error: {
      status: false,
      message: ''
    },
    loading: false,
  })
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [quickFilter, setQuickFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function getInvoices(
      payerId: string,
      date: string,
      substitutorId: string | null = null
    ) {
      try {
        setRes(s => ({ 
          ...s, 
          loading: true, 
          error: { status: false, message: '' } 
        }));
  
        const { PurchaseInvoices, IsSuccess, Error } = await services.getInvoicesForReport(
          payerId,
          date,
          substitutorId,
        )

        if (IsSuccess) {
          setRes(s => ({
            ...s,
            bankAccounts: PurchaseInvoices ? 
              keyByBankAccounts(PurchaseInvoices)
              : [],
            loading: false,
          }))
        } else {
          setRes({
            bankAccounts: [],
            loading: false,
            error: {
              status: true,
              message: Error || 'System error'
            }
          })
        }
      } catch (err) {
        setRes({
          bankAccounts: [],
          loading: false,
          error: {
            status: true,
            message: `System error: ${err}`
          }
        })
      }
      
    }

    if (selectedCooperative?.Id && dateFilter) {
      getInvoices(
        selectedCooperative?.Id,
        format(dateFilter, 'yyyy-MM-dd'),
        substitute?.Id
      );
    }
    
  }, [dateFilter, selectedCooperative?.Id, substitute?.Id]);

  const handleChangeDateFilter = useCallback(
    (date: Date | null) => {
      setDateFilter(date);
    },
    []
  );

  const handleChangeSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const handleSelectCooperative = (coop: CooperativeModel) => {
    dispatch(selectReportCooperative(coop));
  }

  const handleChangeQuickFilter = useCallback(
    (filter: string) => {
      setQuickFilter(filter)
    },
    []
  )

  const showNotification = !selectedCooperative || !dateFilter;

  console.log(res.bankAccounts, 'BANK_ACCOUNTS');

  return (
    <>
      <FlexWrapper className="mb-20">
        <h1 className="tab-title">
          {t('#tab.title.report')}
        </h1>
        <Box
          display="flex"
          alignItems="center"
        >
          <Button
            className={classes.printBtn}
            label="Print PDF"
            icon={PrintIcon}
            onClick={() => { }}
          />
          <Button
            className={classes.loadBtn}
            label="Load PDF"
            icon={DownloadIcon}
            onClick={() => { }}
          />
        </Box>
      </FlexWrapper>
      <ControlsBar>
        <FlexWrapper className={classes.wrapper}>
          <Box
            display="flex"
            alignItems="center"
          >
            <Box marginRight="20px">
              <CoooperativePicker
                cooperatives={cooperatives}
                selectedCooperative={selectedCooperative}
                handleChangeCooperative={handleSelectCooperative}
              />
            </Box>
            <Box marginRight="20px">
              <DatePicker
                currentDate={dateFilter}
                onChange={handleChangeDateFilter}
              />
            </Box>
            <Box>
              <FiltersBar
                activeFilter={quickFilter}
                filtersList={filtersList}
                handleChangeFilter={handleChangeQuickFilter}
              />
            </Box>
          </Box>
          <Box>
            <Search
              className={classes.mr20}
              searchTerm={searchTerm}
              handleChangeSearchTerm={handleChangeSearchTerm}
            />
            <IconButton className={classes.iconButton}>
              <FilterIcon />
            </IconButton>
          </Box>
        </FlexWrapper>
      </ControlsBar>
      <Box>
        {
          showNotification ? (
            <div className={classes.notificationBox}>
              <span className={classes.notification}>
                {
                  !selectedCooperative
                    ? 'Please select one organization only!'
                    : !dateFilter
                      ? 'Please select the date'
                      : null
                }
              </span>
            </div>
          ) : null
        }
      </Box>
      <Loader
        visible={res.loading}
      />
    </>
  )
}

export default Report;