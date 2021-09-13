import {
  EnhancedBankAccountModel,
  InvoiceModel,
} from 'models';

import _ from 'lodash';
import { floatify } from 'helpers';

function keyByBankAccounts(invoices: InvoiceModel[]): EnhancedBankAccountModel[] {
  let enhancedBankAccountsDict: { [key: string]: EnhancedBankAccountModel } = {};

  _.each(invoices, (invoice) => {
    const { BankAccounts } = invoice;
    if (_.size(BankAccounts)) {
      _.each(BankAccounts, (BankAccount) => {
        const { Id } = BankAccount;

        if (!Id) return;

        if (_.has(enhancedBankAccountsDict, Id)) {
          enhancedBankAccountsDict[Id] = {
            ...enhancedBankAccountsDict[Id],
            Invoices: _.concat(
              enhancedBankAccountsDict[Id].Invoices,
              _.omit(invoice, 'BankAccounts')
            ),
            TotalAmount: floatify(enhancedBankAccountsDict[Id].TotalAmount + (invoice.Amount || 0)),
          }
        } else {
          enhancedBankAccountsDict[Id] = {
            ...BankAccount,
            Invoices: [_.omit(invoice, 'BankAccounts')],
            TotalAmount: invoice.Amount || 0
          }
        }
      })
    }
  });

  return _.values(enhancedBankAccountsDict);
}

export default keyByBankAccounts;