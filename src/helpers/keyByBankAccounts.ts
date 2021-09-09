import { 
  EnhancedBankAccountModel,
  InvoiceModel, 
} from 'models';

import _, { has } from 'lodash';

function keyByBankAccounts(invoices: InvoiceModel[]): EnhancedBankAccountModel[] {
  let enhancedBankAccountsDict: { [key: string]: EnhancedBankAccountModel } = {};

  _.each(invoices, (invoice) => {
    const { BankAccounts } = invoice;
    if (_.size(BankAccounts)) {
      _.each(BankAccounts, (BankAccount) => {
        const { Id } = BankAccount;

        if (!Id) return;

        if (has(enhancedBankAccountsDict, Id)) {
          _.set(
            enhancedBankAccountsDict,
            `${Id}.Invoices`,
            _.concat(
              enhancedBankAccountsDict[Id].Invoices, 
              _.omit(invoice, 'BankAccounts')
            )
          )
        } else {
          _.set(
            enhancedBankAccountsDict,
            Id,
            { ...BankAccount, Invoices: _.omit(invoice, 'BankAccounts') }
          )
        }
      })
    }
  });

  return _.values(enhancedBankAccountsDict);
}

export default keyByBankAccounts;