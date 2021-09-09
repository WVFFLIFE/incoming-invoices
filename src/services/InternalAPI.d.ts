import { 
  Option, 
  CooperativeModel, 
  InvoiceModel,
  UpdateMessagesModel
} from 'models';

enum MessageCode {
  GetSubstitutors = 1,
  GetBankAccounts = 2,
  GetPurchaseInvoices = 3,
  GetPaidInvoices = 4,
  ChangeBankAccount = 5,
  ChangeAccountingDate = 6,
  RejectInvoice = 7,
  PayInvoices = 8,
  CheckBalanceDate = 9
}

interface Response {
  IsSuccess: boolean | null;
  Error: string | null;
  ErrorCode: number | null;
}

interface SubstitutorsRes extends Response {
  Substitutors: Option[] | null;
}
interface CooperativesRes extends Reponse {
  Cooperatives: CooperativeModel[] | null;
}
interface PurchaseInvoicesRes extends Response {
  PurchaseInvoices: InvoiceModel[] | null;
}
interface UpdateInvoiceRes extends Response {
  UpdateMessages: UpdateMessagesModel[] | null;
}
interface PaidInvoicesRes extends Response {
  PurchaseInvoices: InvoiceModel[] | null;
}

declare class InternalAPI {
  static message_code: MessageCode;
  public getSubstitutors(substitutorId?: string): Promise<SubstitutorsRes>;
  public getCooperatives(substitutorId?: string): Promise<CooperativesRes>;
  public getPurchaseInvoices(substitutorId?: string): Promise<PurchaseInvoicesRes>;
  public getPaidInvoices(substitutorId?: string): Promise<PaidInvoicesRes>;
  public updateInvoiceBankAccount(
    invoiceId: string,
    bankAccountId: string,
    substitutorId: string
  ): Promise<UpdateInvoiceRes>;
  public updateInvoicesAccountingDate(
    invoiceIds: string[],
    accountingDate: string,
    substitutorId?: string
  ): Promise<UpdateInvoiceRes>
  public rejectInvoice(
    invoiceId: string,
    comment: string,
    substitutorId?: string
  ): Promise<UpdateInvoiceRes>;
  public payInvoices(
    invoiceIds: string[],
    substitutorId?: string,
    isPayNow?: boolean,
  ): Promise<unknown>;
  public checkBalanceDate(
    invoicesIds: string[],
    substitutorId?: string
  ): Promise<unknown>;
  public getInvoicesForReport(
    payerId: string,
    date: string,
    substitutorId?: string | null,
  ): Promise<PurchaseInvoicesRes>;
  private fetchIncomingInvoicesData(
    messageCode: MessageCode,
    requestJSON: any, 
  ): Promise<unknown>;
};

export default new InternalAPI();