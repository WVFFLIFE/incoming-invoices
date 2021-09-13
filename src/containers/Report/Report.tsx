import {
  CooperativeModel,
  DefaultError,
  InvoiceModel
} from 'models';
import {
  useMemo,
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
import services from 'services';
import { formatNum } from 'helpers';
import {
  filterByQuickFilter,
  getTotalCounts 
} from './helpers';

import {
  ControlsBar,
  FlexWrapper,
  Loader
} from 'components';
import {
  PrintIcon,
  DownloadIcon,
} from 'components/Icons';
import Button from 'components/Button';
import CoooperativePicker from 'components/CooperativePicker';
import DatePicker from 'components/Controls/DatePicker';
import Search from 'components/Controls/Search';
import Box from '@material-ui/core/Box';
import FiltersBar from 'components/FiltersBar';
import ReportTable from 'components/ReportTable';

import clsx from 'clsx';
import { useStyles } from './style';

const filtersList = [
  { id: 'all', label: '#filter.allinvoices' },
  { id: 'pending', label: '#filter.pending' },
  { id: 'paid', label: '#filter.paid' },
  { id: 'rejected', label: '#filter.rejected' },
  { id: 'unpaid', label: '#filter.unpaid' }
];

interface Res {
  invoices: InvoiceModel[];
  loading: boolean;
  error: DefaultError;
  totalAmountLA2900: number;
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
    invoices: [],
    totalAmountLA2900: 0,
    error: {
      status: false,
      message: ''
    },
    loading: false,
  })
  const [dateFilter, setDateFilter] = useState<Date | null>(new Date());
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

        const { PurchaseInvoices, IsSuccess, Error, LA2900TotalAmount } = await services.getInvoicesForReport(
          payerId,
          date,
          substitutorId,
        )

        if (IsSuccess) {
          setRes(s => ({
            ...s,
            invoices: PurchaseInvoices || [],
            totalAmountLA2900: LA2900TotalAmount,
            loading: false,
          }))
        } else {
          setRes({
            invoices: [],
            totalAmountLA2900: 0,
            loading: false,
            error: {
              status: true,
              message: Error || 'System error'
            }
          })
        }
      } catch (err) {
        setRes({
          invoices: [],
          totalAmountLA2900: 0,
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
  const enhancedBankAccounts = useMemo(() => keyByBankAccounts(res.invoices), [res.invoices]);

  const filteredBankAccounts = useMemo(() => {
    return filterByQuickFilter(enhancedBankAccounts, quickFilter);
  }, [enhancedBankAccounts, quickFilter]);

  const { totalAmount, totalInvoices } = useMemo(() => {
    return getTotalCounts(filteredBankAccounts);
  }, [filteredBankAccounts]);

  const renderCounters = () => {
    return (
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        marginBottom="10px"
        padding="10px 15px"
      >
        <Box
          display="inline-flex"
        >
          <span className={clsx(classes.text, classes.cooperative)}>
            <b>
              {selectedCooperative.Name}
            </b>
          </span>
          <span className={classes.divider}>|</span>
          <span className={clsx(classes.text, classes.totalInvoices)}>
            {t("#report.totalinvoices", { totalInvoices })}
          </span>
        </Box>
        <Box
          display="inline-flex"
        >
          <span className={clsx(classes.text, classes.totalAmount)}>
            {t("#report.totalamount")}
            {":"}
            {" "}
            <b>
              {formatNum(totalAmount)}
              {" "}
              €
            </b>
          </span>
          <span className={classes.divider}>|</span>
          <span className={clsx(classes.text, {
            [classes.red]: res.totalAmountLA2900 !== parseFloat(totalAmount.toFixed(2))
          })}>
            {t("#report.la2900")}
            {":"}
            {" "}
            <b>
              {formatNum(res.totalAmountLA2900)}
            </b>
          </span>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <FlexWrapper className="mb-20">
        <h1 className="tab-title">
          {t('#report.title')}
        </h1>
        <Box
          display="flex"
          alignItems="center"
        >
          <Button
            className={classes.printBtn}
            label={t('#report.button.printpdf')}
            icon={PrintIcon}
            onClick={() => { }}
          />
          <Button
            className={classes.loadBtn}
            label={t('#report.button.loadpdf')}
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
                disabled={!!!selectedCooperative}
              // dateInput
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
              searchTerm={searchTerm}
              handleChangeSearchTerm={handleChangeSearchTerm}
            />
          </Box>
        </FlexWrapper>
      </ControlsBar>
      {selectedCooperative ? renderCounters() : null}
      <Box>
        {
          showNotification ? (
            <div className={classes.notificationBox}>
              <span className={classes.notification}>
                {
                  !selectedCooperative
                    ? t('#report.notification.selectcooperative')
                    : !dateFilter
                      ? 'Please select the date'
                      : null
                }
              </span>
            </div>
          ) : (
            <ReportTable
              bankAccounts={filteredBankAccounts}
            />
          )
        }
      </Box>
      <Loader
        visible={res.loading}
      />
    </>
  )
}

export default Report;