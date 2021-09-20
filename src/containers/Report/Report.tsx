import {
  CooperativeModel,
  DefaultError,
  EnhancedInvoiceModel
} from 'models';
import {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent
} from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCooperativesOptions,
  selectedCooperativeSelector
} from 'selectors';
import { setSelectedCooperative } from 'actions/settingsActions';

import keyByBankAccounts from 'helpers/keyByBankAccounts';
import format from 'date-fns/format';
import services from 'services';
import { formatNum } from 'helpers';
import {
  filterBankAccountsInvoices,
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

function base64ToUint8Array(base64: string) {
  const raw = atob(base64);
  let uint8Array = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) {
    uint8Array[i] = raw.charCodeAt(i);
  }
  return uint8Array;
}

function base64ToBlob(base64: string) {
  const binary = atob(base64.replace(/\s/g, ''));
  const len = binary.length;
  const buffer = new ArrayBuffer(len);
  const view = new Uint8Array(buffer);

  for (let i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i);
  }

  return new Blob([view], { type: 'application/pdf' })
}

interface Res {
  invoices: EnhancedInvoiceModel[];
  base64: string | null;
  loading: boolean;
  error: DefaultError;
  totalAmountLA2900: number;
}

const Report = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const dispatch = useDispatch();
  const {
    selectedCooperatives,
    cooperatives,
    substitute,
  } = useSelector((state: any) => ({
    cooperatives: (getCooperativesOptions(state) as any),
    selectedCooperatives: selectedCooperativeSelector(state),
    substitute: state.balances.substitute.value
  }));

  const [res, setRes] = useState<Res>({
    invoices: [],
    base64: null,
    totalAmountLA2900: 0,
    error: {
      status: false,
      message: ''
    },
    loading: false,
  })
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [quickFilter, setQuickFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const [selectedCooperative] = selectedCooperatives;

  const fetchInvoices = async (
    payerId: string,
    date: string,
    substitutorId: string | null = null
  ) => {
    try {
      const { PurchaseInvoices, IsSuccess, Error, LA2900TotalAmount } = await services.getInvoicesForReport(
        payerId,
        date,
        substitutorId,
      );
  
      if (IsSuccess) {
        if (IsSuccess) {
          setRes(s => ({
            ...s,
            invoices: PurchaseInvoices || [],
            totalAmountLA2900: LA2900TotalAmount,
            loading: false,
          }))
        } else {
          setRes({
            base64: null,
            invoices: [],
            totalAmountLA2900: 0,
            loading: false,
            error: {
              status: true,
              message: Error || 'System error'
            }
          })
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  const fetchInvoicesPDF = async (
    payerId: string,
    date: string,
    substitutorId: string | null = null
  ) => {
    try {
      const { InvoicesPDF, IsSuccess } = await services.getInvoicesPDF(
        payerId,
        date,
        substitutorId,
      );

      if (IsSuccess) {
        setRes(s => ({
          ...s,
          base64: InvoicesPDF || null
        }))
      } else {
        setRes(s => ({
          ...s,
          base64: null
        }))
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function getData(
      payerId: string,
      date: string,
      substitutorId: string | null = null
    ) {
      setRes(s => ({
        ...s,
        loading: true,
        base64: null,
      }))

      await fetchInvoices(payerId, date, substitutorId);
      await fetchInvoicesPDF(payerId, date, substitutorId);

      setRes(s => ({
        ...s,
        loading: false,
      }));
    }

    if (selectedCooperative?.Id && dateFilter) {
      getData(
        selectedCooperative?.Id,
        format(dateFilter, 'yyyy-MM-dd'),
        substitute?.Id
      );
    }

  }, [dateFilter, selectedCooperative, substitute?.Id]);

  const saveInvoice = () => {
    if (res.base64 && iframeLoaded) {
      saveAs(
        base64ToBlob(res.base64), 
        `${t('#report.pdf.name', { coopName: selectedCooperative?.Name || '' })}.pdf`
      );
    }
  }

  const printInvoice = () => {
    if (res.base64 && iframeLoaded) {
      (iframeRef.current as any)
        .contentWindow
        .PDFViewerApplication
        .triggerPrinting()
    }
  }

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
    dispatch(setSelectedCooperative([coop]));
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
    return filterBankAccountsInvoices(enhancedBankAccounts, quickFilter, searchTerm);
  }, [enhancedBankAccounts, quickFilter, searchTerm]);

  const { totalAmount, totalInvoices } = useMemo(() => {
    return getTotalCounts(filteredBankAccounts);
  }, [filteredBankAccounts]);

  const onLoad = () => {
    if (iframeRef.current && res.base64) {

      (iframeRef.current as any).contentWindow.PDFViewerApplication.open(
        base64ToUint8Array(res.base64)
      );
      setIframeLoaded(true);
    }
  }

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
              {" "}
              €
            </b>
          </span>
        </Box>
      </Box>
    )
  }

  return (
    <>
      {
        res.base64
          ? (
            <iframe
              ref={iframeRef}
              className={classes.visuallyHidden}
              title="data iframe"
              src={`static/viewer/web/viewer.html`}
              onLoad={onLoad}
            />
          ) : null
      }
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
            disabled={!!!res.base64 || !!!res.invoices.length || !iframeLoaded}
            onClick={printInvoice}
          />
          <Button
            className={classes.loadBtn}
            label={t('#report.button.loadpdf')}
            icon={DownloadIcon}
            disabled={!!!res.base64 || !!!res.invoices.length || !iframeLoaded}
            onClick={saveInvoice}
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
                disabled={!!!res.invoices.length}
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
                      ? t('#report.notification.selectdate')
                      : null
                }
              </span>
            </div>
          ) : (
            <ReportTable
              bankAccounts={filteredBankAccounts}
              searchTerm={searchTerm}
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