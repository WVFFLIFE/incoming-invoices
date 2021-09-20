import CrmAction from './CrmAction';

class InternalAPI {

  message_code = {
    GetSubstitutors: 1,
    GetBankAccounts: 2,
    GetPurchaseInvoices: 3,
    GetPaidInvoices: 4,
    ChangeBankAccount: 5,
    ChangeAccountingDate: 6,
    RejectInvoice: 7,
    PayInvoices: 8,
    CheckBalanceDate: 9,
    GetInvoicesForReport: 10,
    GetInvoicePDF: 11,
    GetInvoicesPDF: 12
  };

  getSubstitutors = async (substitutorId = null) => {
    return await this.fetchIncomingInvoicesData(this.message_code.GetSubstitutors,
      { SubstitutorId: substitutorId });
  }

  getCooperatives = async (substitutorId = null) => {
    return await this.fetchIncomingInvoicesData(this.message_code.GetBankAccounts,
      { SubstitutorId: substitutorId });
  }

  getPurchaseInvoices = async (substitutorId = null) => {
    return await this.fetchIncomingInvoicesData(this.message_code.GetPurchaseInvoices,
      { SubstitutorId: substitutorId });
  }

  getPaidInvoices = async (substitutorId = null) => {
    return await this.fetchIncomingInvoicesData(this.message_code.GetPaidInvoices,
      { SubstitutorId: substitutorId });
  }

  getInvoicesForReport = async (payerId, date, substitutorId = null) => {
    return await this.fetchIncomingInvoicesData(this.message_code.GetInvoicesForReport,
      {
        SubstitutorId: substitutorId,
        PayerId: payerId,
        Date: date
      });
  }

  updateInvoiceBankAccount = async (invoiceId, bankAccountId, substitutorId = null) => {
    return await this.fetchIncomingInvoicesData(this.message_code.ChangeBankAccount,
      {
        InvoiceId: invoiceId,
        BankAccountId: bankAccountId,
        SubstitutorId: substitutorId
      });
  }

  // invoiceIds: []
  updateInvoicesAccountingDate = async (invoiceIds, accountingDate, substitutorId = null) => {
    return await this.fetchIncomingInvoicesData(this.message_code.ChangeAccountingDate,
      {
        InvoiceIds: invoiceIds,
        AccountingDate: accountingDate,
        SubstitutorId: substitutorId
      });
  }

  rejectInvoice = async (invoiceId, comment, substitutorId = null) => {
    return await this.fetchIncomingInvoicesData(this.message_code.RejectInvoice,
      {
        InvoiceId: invoiceId,
        Comment: comment,
        SubstitutorId: substitutorId
      });
  }

  payInvoices = async (invoicesIds, substitutorId = null, IsPayNow = false) => {
    return await this.fetchIncomingInvoicesData(this.message_code.PayInvoices,
      {
        Payments: invoicesIds.map(e => ({ InvoiceId: e, IsPayNow })),
        SubstitutorId: substitutorId,
      }
    );
  }

  checkBalanceDate = async (invoicesIds, substitutorId = null) => {
    return await this.fetchIncomingInvoicesData(this.message_code.CheckBalanceDate,
      {
        Payments: invoicesIds.map(e => ({ InvoiceId: e })),
        SubstitutorId: substitutorId
      }
    );
  }

  getInvoicePDF = async (invoiceId) => {
    return await this.fetchIncomingInvoicesData(this.message_code.GetInvoicePDF,
      {
        InvoiceId: invoiceId
      }
    );
  }

  getInvoicesPDF = async (payerId, date, substitutorId = null) => {
    return await this.fetchIncomingInvoicesData(this.message_code.GetInvoicesPDF,
      {
        SubstitutorId: substitutorId,
        PayerId: payerId,
        Date: date,
        LanguageCode: window?.USER_LANGUAGE_CODE
      });
  }

  fetchIncomingInvoicesData = async (messageCode, requestJson) => {
    const requestXml = CrmAction.GetTransferedDataActionRequestXml(messageCode, requestJson);

    return await new Promise(
      (success, error) => CrmAction.Execute({
        requestXml: requestXml,
        async: true,
        successCallback: (data) => { success(data.OutJsonObject); console.log(data); },
        errorCallback: (data) => error(data.message)
      }));
  }

}

export default new InternalAPI();