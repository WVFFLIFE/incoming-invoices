export interface BaseEntityModel {
  Id: string;
  Name: string;
}

export interface BaseOptionSetModel {
  Value: number;
  Label: string;
}

export interface BaseResponseModel {
  Error: string;
  ErrorCode: number;
  IsSuccess: boolean;
}

export interface Status {
  Value: number | null;
  Label: string | null;
}

export enum EntityResponseCode {
  Ok = 1,
  Warrning = 2,
  Error = 3,
  Info = 4
}

export interface EntityResponseModel {
  EntityId: string;
  ResponseCode: EntityResponseCode;
  Message: string;
  MessageCode: number;
}

export interface ValidationModel {
  EntityId: string | null;
  Message: string | null;
  MessageCode: number | null;
  ResponseCode: number | null;
}

export interface BankAccountModel extends BaseEntityModel {
  Operator: BaseEntityModel;
  Limit: number;
  AllowedBalance: number;
  Balance: number;
  Description: string;
  LastUpdated: Date;
  IsMain: boolean;
  Link: string;
}

export interface CooperativeModel extends BaseEntityModel {
  ClosedPeriodEndDate: Date;
  BankAccounts: BankAccountModel[];
  UrgentBalance: number;
  InvoiceSum: number;
  Limit: number;
  AllowedBalance: number;
  Balance: number;
}

export interface InvoiceModel {
  Id: string;
  Payer: BaseEntityModel;
  Seller: string;
  DueDate: Date;
  Amount: number;
  InvoiceNumber: string;
  BankAccounts: BankAccountModel[];
  BuyerBankAccountId: string;
  InvoiceStatus: BaseOptionSetModel;
  PaymentDate: Date;
  InvoiceDate: Date;
  AccountingDate: Date;
  Comment: string;
  RejectComment: string;
  AllowedPay: boolean;
  AllowedEdit: boolean;
  Link: string;
  Validation: EntityResponseModel[];
}

export interface PaymentModel {
  InvoiceId: string;
  IsPayNow: boolean;
}

export interface UpdateItemResponseModel {
  Id: string;
  Message: string;
  IsUpdated: boolean;
}

export interface EnhancedBankAccountModel extends BankAccountModel {
  Invoices: Omit<InvoiceModel, 'BankAccounts'>[];
  TotalAmount: number;
}

export interface DefaultError {
  status: boolean;
  message: string;
}

export type SortParamsType = 'string' | 'date' | 'number' | 'boolean'; 

export interface SortParams {
  order: 'asc' | 'desc';
  orderBy: string;
  type: SortParamsType
}

export interface PaginationParams {
  itemsPerPage: number;
  currentPage: number;
}