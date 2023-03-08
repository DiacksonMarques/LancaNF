import { Company } from './Company';

export interface Invoice{
  valueInvoice: number;
  numberInvoice: number;
  descriptioninvoice: string;
  monthInvoice: number;
  receiptDate: Date;
  company: Company;
  id: number;
}
