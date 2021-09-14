import { InvoiceModel } from 'models';
import { useTranslation } from 'react-i18next';

import { useStyles } from './style';

interface InvoiceDetailedViewProps {
  invoice: Omit<InvoiceModel, 'BankAccounts'>;
}

const InvoiceDetailedView: React.FC<InvoiceDetailedViewProps> = ({
  invoice
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <div className={classes.topBar}>
        <h2 className={classes.title}>
          {t('#report.invoicenumber', { invoiceNumber: invoice.InvoiceNumber })}
        </h2>
      </div>
    </div>
  )
}

export default InvoiceDetailedView;