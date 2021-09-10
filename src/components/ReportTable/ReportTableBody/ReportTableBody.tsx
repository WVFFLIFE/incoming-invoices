import { EnhancedBankAccountModel } from 'models';

import ReportTableRow from '../ReportTableRow';

interface ReportTableBodyProps {
  bankAccounts: EnhancedBankAccountModel[];
  expanded: boolean;
}

const ReportTableBody: React.FC<ReportTableBodyProps> = ({
  bankAccounts,
  expanded
}) => {
  return (
    <tbody>
      {
        bankAccounts.map(bankAccount => {
          return (
            <ReportTableRow 
              key={bankAccount.Id}
              bankAccount={bankAccount}
              expanded={expanded}
            />
          )
        })
      }
    </tbody>
  )
}

export default ReportTableBody;