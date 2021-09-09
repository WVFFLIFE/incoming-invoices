export interface Option {
  Id: string | null;
  Name: string | null;
}

export interface Status {
  Value: number | null;
  Label: string | null;
}

export interface ValidationModel {
  EntityId: string | null;
  Message: string | null;
  MessageCode: number | null;
  ResponseCode: number | null;
}

export interface BankAccountModel {
  AllowedBalance: number | null;
  Balance: number | null;
  Description: string | null;
  Id: string | null;
  IsMain: boolean | null;
  LastUpdated: string | null;
  Limit: number | null;
  Name: string | null;
  Operator: Option | null;
}

export interface CooperativeModel {
  AllowedBalance: number | null;
  Balance: number | null;
  BankAccounts: BankAccountModel[] | null;
  Id: string | null;
  InvoiceSum: number | null;
  Limit: number | null;
  Name: string | null;
  UrgentBalance: number | null;
}

export interface InvoiceModel {
  AccountingDate: string | null;
  AllowedEdit: string | null;
  AllowedPay: string | null;
  Amount: number | null;
  BankAccounts: BankAccountModel[] | null;
  BuyerBankAccountId: string | null;
  Comment: string | null;
  DueDate: string | null;
  Id: string | null;
  InvoiceDate: string | null;
  InvoiceNumber: string | null;
  InvoiceStatus: Status | null;
  Link: string | null;
  Name: string | null;
  Payer: Option | null;
  PaymentDate: string | null;
  RejectComment: string | null;
  Seller: string | null;
  Validation: ValidationModel[] | null;
} 

export interface UpdateMessagesModel {
  Id: string | null;
  IsUpdated: string | null;
  Message: string;
}

export interface EnhancedBankAccountModel extends BankAccountModel {
  Invoices: Omit<InvoiceModel, 'BankAccounts'>[];
}

export interface DefaultError {
  status: boolean;
  message: string;
}