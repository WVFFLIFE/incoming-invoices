import { BaseInvoiceModel } from 'models';
import pfg from 'assets/pfg.pdf'

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import services from 'services';
import { saveAs } from 'file-saver';
import { getPDFLang } from 'helpers';

import { IconButton } from 'components/StyledComponents';
import { PrintIcon, SaveIcon } from 'components/Icons';
import ProgressBar from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import clsx from 'clsx';
import { useStyles } from './style';

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

interface InvoiceDetailedViewProps {
  invoice: BaseInvoiceModel;
}

interface State {
  loading: boolean;
  base64str: string | null;
  error: boolean;
}

const InvoiceDetailedView: React.FC<InvoiceDetailedViewProps> = ({
  invoice
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [state, setState] = useState<State>({
    loading: true,
    error: false,
    base64str: null,
  });
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const onLoad = () => {
    if (iframeRef.current && state.base64str) {

      (iframeRef.current as any).contentWindow.PDFViewerApplication.open(
        base64ToUint8Array(state.base64str)
      );
      setIframeLoaded(true);
    }
  }

  const saveInvoice = () => {
    if (state.base64str && iframeLoaded) {
      saveAs(base64ToBlob(state.base64str), `${invoice.InvoiceNumber}.pdf`);
    }
  }

  const printInvoice = () => {
    if (state.base64str && iframeLoaded) {
      (iframeRef.current as any)
        .contentWindow
        .PDFViewerApplication
          .triggerPrinting()
    }
  }

  useEffect(() => {
    const fetchPDF = async (id: string) => {
      try {
        setState(s => ({ ...s, loading: true }));

        const res = await services.getInvoicePDF(id);

        if (res.IsSuccess) {
          setState({
            base64str: res.InvoicePDF,
            loading: false,
            error: false,
          })
        } else {
          setState({
            base64str: null,
            loading: false,
            error: true,
          })
        }
      } catch (err) {
        console.error(err);

        setState({
          base64str: null,
          loading: false,
          error: true,
        })
      }
    }

    if (invoice.Id) {
      fetchPDF(invoice.Id)
    }
  }, [invoice.Id]);

  const renderContent = () => {
    if (state.loading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="20px"
        >
          <ProgressBar
            style={{ outline: 0 }}
            color="inherit"
          />
        </Box>
      )
    }

    if (state.base64str && !state.loading) {
      return (
        <iframe
          ref={iframeRef}
          className={classes.iframe}
          src={`static/viewer/web/viewer.html#locale=${getPDFLang()}`}
          title={`Invoice ${invoice.InvoiceNumber}`}
          onLoad={onLoad}
        />
      )
    }
  }

  return (
    <div>
      <div className={classes.topBar}>
        <h2 className={classes.title}>
          {t('#report.invoicenumber', { invoiceNumber: invoice.InvoiceNumber })}
        </h2>
        {
          state.base64str
            ? (
              <div>
                <IconButton 
                  className={classes.iconBtn}
                  disabled={!iframeLoaded}
                  onClick={printInvoice}
                >
                  <PrintIcon className={classes.icon} />
                </IconButton>
                <IconButton
                  disabled={!iframeLoaded}
                  className={clsx(classes.iconBtn, classes.saveIconBtn)}
                  onClick={saveInvoice}
                >
                  <SaveIcon className={classes.icon} />
                </IconButton>
              </div>
            ) : null
        }
      </div>
      {renderContent()}
      <iframe
          ref={iframeRef}
          className={classes.iframe}
          src={`/web/viewer.html#locale=${getPDFLang()}`}
          title={`Invoice ${invoice.InvoiceNumber}`}
          onLoad={onLoad}
        />
    </div>
  )
}

export default InvoiceDetailedView;