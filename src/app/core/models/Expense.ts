import { ExpenseCategori } from './ExpenseCategori';
import { Company } from './Company';
export interface Expense{
  id: number;
  expenseAmount: number;
  expenseName: string;
  accrualDate: Date;
  expenseCategori: ExpenseCategori;
  company?: Company;
}
