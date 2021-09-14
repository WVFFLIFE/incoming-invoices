import { InvoiceModel } from 'models';
import { memo, useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import services from 'services';
import { saveAs } from 'file-saver';

import _get from 'lodash/get';
import {
  defaultFormat,
  formatNum,
  isRejectedInvoice,
  getText
} from 'helpers';

import { IconButton } from 'components/StyledComponents';
import { PendingIcon, SaveIcon } from 'components/Icons';
import CancelIcon from '@material-ui/icons/CancelPresentationOutlined';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import Tooltip from 'components/Tooltip';
import Box from '@material-ui/core/Box';
import Dialog from 'components/Dialog';
import InvoiceDetailedView from '../InvoiceDetailedView';

import clsx from 'clsx';
import { useStyles } from "./style";

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

interface ReportInvoiceTableRowProps {
  invoice: Omit<InvoiceModel, 'BankAccounts'>;
  searchTerm: string;
}

interface ModalState {
  invoice: Omit<InvoiceModel, 'BankAccounts'> | null;
  open: boolean;
}

const ReportInvoiceTableRow: React.FC<ReportInvoiceTableRowProps> = ({
  invoice,
  searchTerm,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    invoice: null
  });

  const saveInvoice = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      const res = await services.getInvoicePDF(invoice.Id);

      if (res.IsSuccess) {
        saveAs(base64ToBlob(res.InvoicePDF), `${invoice.InvoiceNumber}.pdf`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const selectInvoice = (invoice: Omit<InvoiceModel, 'BankAccounts'>) => {
    setModalState({
      invoice,
      open: true
    });
  }

  const initSelectedInvoice = () => {
    setModalState(prevState => ({
      ...prevState,
      invoice: null
    }));
  }

  const handleCloseModal = () => {
    setModalState(prevState => ({
      ...prevState,
      open: false,
    }))
  }

  const disablePropagation = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  }

  const highlight = getText(searchTerm);

  const Icon = isRejectedInvoice(invoice)
    ? (
      invoice.RejectComment ? (
        <Tooltip
          arrow
          title={invoice.RejectComment}
        >
          <CancelIcon
            className={clsx(classes.icon, classes.cancelIcon)}
          />
        </Tooltip>
      ) : (
        <Tooltip
          arrow
          title={t("#modal.filter.rejected")}
        >
          <CancelIcon
            className={clsx(classes.icon, classes.cancelIcon)}
          />
        </Tooltip>
      )
    )
    : invoice.InvoiceStatus.Value === 100000003
      ? (
        <Tooltip
          arrow
          title={t("#modal.filter.paid")}
        >
          <CheckIcon
            className={clsx(classes.icon, classes.checkIcon)}
          />
        </Tooltip>
      )
      : invoice.InvoiceStatus.Value === 100000001
        ? (
          <Tooltip
            arrow
            title={t("#modal.filter.pendingpaid")}
          >
            <PendingIcon
              className={clsx(classes.icon, classes.pendingIcon)}
            />
          </Tooltip>
        )
        : <span className={classes.icon}></span>;

  return (
    <>
      <tr
        className={clsx(classes.tr, {
          [classes.rejected]: isRejectedInvoice(invoice)
        })}
        onClick={() => selectInvoice(invoice)}
      >
        <td className={clsx(classes.td, classes.right)}>
          <Box
            component="span"
            display="inline-flex"
            alignItems="center"
          >
            {Icon}
          </Box>
        </td>
        <td className={classes.td}>
          {highlight(_get(invoice, 'Seller'))}
        </td>
        <td className={clsx(classes.td, classes.light)}>
          {
            invoice.Link
              ? (
                <a
                  className={clsx(classes.link, classes.underline)}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${invoice.Link}`}
                  onClick={disablePropagation}
                >
                  {highlight(_get(invoice, 'InvoiceNumber'))}
                </a>
              ) : highlight(_get(invoice, 'InvoiceNumber'))
          }
        </td>
        <td className={clsx(classes.td, classes.light)}>
          {highlight(
            defaultFormat(_get(invoice, 'AccountingDate'))
          )}
        </td>
        <td className={clsx(classes.td, classes.light)}>
          {highlight(
            defaultFormat(_get(invoice, 'DueDate'))
          )}
        </td>
        <td className={clsx(classes.td, classes.light)}>
          {highlight(
            defaultFormat(_get(invoice, 'PaymentDate'))
          )}
        </td>
        <td className={classes.td}>
          {highlight(
            formatNum(_get(invoice, 'Amount')),
            'number'
          )}
        </td>
        <td className={clsx(classes.td, classes.center)}>
          <IconButton className={classes.saveBtn} onClick={saveInvoice}>
            <SaveIcon className={classes.saveIcon} />
          </IconButton>
        </td>
      </tr>
      <Dialog
        open={modalState.open}
        handleClose={handleCloseModal}
        maxWidth="md"
        TransitionProps={{
          onExited: initSelectedInvoice
        }}
      >
        {
          modalState.invoice && (
            <InvoiceDetailedView 
              invoice={modalState.invoice}
            />
          )
        }
      </Dialog>
    </>
  )
}

export default memo(ReportInvoiceTableRow);