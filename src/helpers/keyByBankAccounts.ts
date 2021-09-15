import {
  EnhancedBankAccountModel,
  EnhancedInvoiceModel,
} from 'models';

import _ from 'lodash';
import { floatify } from 'helpers';

function keyByBankAccounts(
  invoices: EnhancedInvoiceModel[]
): EnhancedBankAccountModel[] {
  let enhancedBankAccountsDict: { [key: string]: EnhancedBankAccountModel } = {};

  _.each(invoices, (invoice) => {
    const { BankAccount } = invoice;

    if (BankAccount) {
      const { Id } = BankAccount;

      if (_.has(enhancedBankAccountsDict, Id)) {
        enhancedBankAccountsDict[Id] = {
          ...enhancedBankAccountsDict[Id],
          Invoices: _.concat(
            enhancedBankAccountsDict[Id].Invoices,
            _.omit(invoice, 'BankAccount')
          ),
          TotalAmount: floatify(enhancedBankAccountsDict[Id].TotalAmount + (invoice.Amount || 0)),
        }
      } else {
        enhancedBankAccountsDict[Id] = {
          ...BankAccount,
          Invoices: [_.omit(invoice, 'BankAccount')],
          TotalAmount: invoice.Amount || 0
        }
      }
    } else {
      if (_.has(enhancedBankAccountsDict, 'empty')) {
        enhancedBankAccountsDict['empty'] = {
          ...enhancedBankAccountsDict['empty'],
          Invoices: _.concat(
            enhancedBankAccountsDict['empty'].Invoices,
            _.omit(invoice, 'BankAccount')
          ),
          TotalAmount: floatify(enhancedBankAccountsDict['empty'].TotalAmount + (invoice.Amount || 0)),
        }
      } else {
        enhancedBankAccountsDict['empty'] = {
          AllowedBalance: null,
          Balance: null,
          Description: null,
          Id: 'empty',
          Invoices: [_.omit(invoice, 'BankAccount')],
          TotalAmount: invoice.Amount || 0,
          IsMain: null,
          LastUpdated: null,
          Limit: null,
          Link: null,
          Name: '',
          Operator: null
        }
      }
    }
  });

  return _.values(enhancedBankAccountsDict);
}

export default keyByBankAccounts;