import { InvoiceModel } from 'models';

import ReportInvoiceTableRow from '../ReportInvoiceTableRow';

interface ReportInvoiceTableBodyProps {
  invoices: Omit<InvoiceModel, 'BankAccounts'>[]
}

const ReportInvoiceTableBody: React.FC<ReportInvoiceTableBodyProps> = ({
  invoices
}) => {
  return (
    <tbody>
      {
        invoices.map(invoice => (
          <ReportInvoiceTableRow 
            key={invoice.Id}
            invoice={invoice}
          />
        ))
      }
    </tbody>
  )
}

export default ReportInvoiceTableBody;