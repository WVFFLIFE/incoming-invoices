import {
  InvoiceModel,
  EnhancedBankAccountModel,
} from 'models';

import {
  floatify,
  isPaidInvoice,
  isPendingInvoice,
  isRejectedInvoice,
  isUnpaidInvoice
} from 'helpers';
import _uniqBy from 'lodash/uniqBy';

function countTotalAmount(invoices: Omit<InvoiceModel, 'BankAccounts'>[]) {
  return invoices.reduce((acc, next) => {
    return floatify(acc + (next.Amount || 0));
  }, 0);
}

export function filterByQuickFilter(
  bankAccounts: EnhancedBankAccountModel[],
  filter: string
) {
  return bankAccounts.map(bankAccount => {
    const filteredInvoices = bankAccount.Invoices.filter(invoice => {
      if (filter === 'pending')
        return isPendingInvoice(invoice);
      if (filter === 'paid')
        return isPaidInvoice(invoice);
      if (filter === 'rejected')
        return isRejectedInvoice(invoice);
      if (filter === 'unpaid')
        return isUnpaidInvoice(invoice);

      return true;
    });

    return {
      ...bankAccount,
      Invoices: filteredInvoices,
      TotalAmount: countTotalAmount(filteredInvoices)
    }
  });
}

export function getTotalCounts(
  bankAccounts: EnhancedBankAccountModel[]
) {
  const invoices =
    _uniqBy(bankAccounts.map(bankAccount => bankAccount.Invoices).flat(), 'Id');

  return {
    totalInvoices: invoices.length,
    totalAmount: countTotalAmount(invoices)
  }
}
