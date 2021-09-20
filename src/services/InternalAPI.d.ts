import { Guid } from 'guid-typescript';
import { 
  BaseEntityModel,
  EntityResponseModel,
  BaseResponseModel,
  EnhancedInvoiceModel
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
  CheckBalanceDate = 9,
  GetInvoicesForReport = 10,
  GetInvoicePDF = 11,
  GetInvoicesPDF = 12
}

interface SubstitutorsResponseModel extends BaseResponseModel {
  Substitutors: BaseEntityModel[] | null;
}
interface CooperativesRes extends BaseResponseModel {
  Cooperatives: CooperativeModel[] | null;
}
interface PurchaseInvoicesResponseModel extends BaseResponseModel {
  PurchaseInvoices: EnhancedInvoiceModel[] | null;
}
interface UpdateInvoiceRes extends BaseResponseModel {
  UpdateMessages: UpdateMessagesModel[] | null;
}
interface PaidInvoicesRes extends BaseResponseModel {
  PurchaseInvoices: EnhancedInvoiceModel[] | null;
}
interface CheckBalanceDateResponceModel extends BaseResponseModel {
  Payers: BaseEntityModel[];
  InvoicesIds: Guid[];
  IsAllUpToDate: boolean;
}
interface PurchaseInvoicesForReportResponseModel extends PurchaseInvoicesResponseModel {
  LA2900TotalAmount: number;
}
interface InvoicePDFResponseModel extends BaseResponseModel {
  InvoicePDF: string;
}
interface InvoicesPDFResponseModel extends BaseResponseModel {
  InvoicesPDF: string;
}

declare class InternalAPI {
  static message_code: MessageCode;

  public getSubstitutors(
    substitutorId?: string
  ): Promise<SubstitutorsResponseModel>;

  public getCooperatives(
    substitutorId?: string
  ): Promise<CooperativesRes>;

  public getPurchaseInvoices(
    substitutorId?: string
  ): Promise<PurchaseInvoicesResponseModel>;

  public getPaidInvoices(
    substitutorId?: string
  ): Promise<PaidInvoicesRes>;

  public updateInvoiceBankAccount(
    invoiceId: string,
    bankAccountId: string,
    substitutorId: string
  ): Promise<UpdateInvoiceRes>;

  public updateInvoicesAccountingDate(
    invoiceIds: string[],
    accountingDate: string,
    substitutorId?: string
  ): Promise<UpdateInvoiceRes>;

  public rejectInvoice(
    invoiceId: string,
    comment: string,
    substitutorId?: string
  ): Promise<UpdateInvoiceRes>;

  public payInvoices(
    invoiceIds: string[],
    substitutorId?: string,
    isPayNow?: boolean,
  ): Promise<EntityResponseModel>;

  public checkBalanceDate(
    invoicesIds: string[],
    substitutorId?: string
  ): Promise<CheckBalanceDateResponceModel>;

  public getInvoicesForReport(
    payerId: string,
    date: string,
    substitutorId?: string | null,
  ): Promise<PurchaseInvoicesForReportResponseModel>;

  public getInvoicePDF(
    invoiceId: string
  ): Promise<InvoicePDFResponseModel>;

  public getInvoicesPDF(
    payerId: string,
    date: string,
    substitutorId?: string | null,
  ): Promise<InvoicesPDFResponseModel>;

  private fetchIncomingInvoicesData(
    messageCode: MessageCode,
    requestJSON: any, 
  ): Promise<unknown>;

};

export default new InternalAPI();