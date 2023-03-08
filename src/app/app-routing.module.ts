import { InvoiceComponent } from './components/dashboard/invoice/invoice/invoice.component';
import { InvoicesComponent } from './components/dashboard/invoice/invoices/invoices.component';
import { ExpenseComponent } from './components/dashboard/expense/expense/expense.component';
import { BillingLimitComponent } from './components/dashboard/billing-limit/billing-limit.component';
import { ExpenseCategoriComponent } from './components/dashboard/expense-categori/expense-categori/expense-categori.component';
import { ExpenseCategoriesComponent } from './components/dashboard/expense-categori/expense-categories/expense-categories.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/dashboard/home/home.component';
import { CompanysComponent } from './components/dashboard/company/companys/companys.component';
import { CompanyComponent } from './components/dashboard/company/company/company.component';
import { ExpensesComponent } from './components/dashboard/expense/expenses/expenses.component';
import { HistoricalReleaseComponent } from './components/dashboard/historical-release/historical-release.component';
import { AuthGuard, AuthGuardLogin } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardLogin],
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },

      //companys
      {
        path: 'companys',
        component: CompanysComponent,
      },
      {
        path: 'company',
        component: CompanyComponent,
        data: {type: 'save'}
      },
      {
        path: 'company/edit/:id',
        component: CompanyComponent,
        data: {type: 'edit'}
      },
      {
        path: 'company/view/:id',
        component: CompanyComponent,
        data: {type: 'view'}
      },

      //expense-categories
      {
        path: 'expense-categories',
        component: ExpenseCategoriesComponent,
      },
      {
        path: 'expense-categori',
        component: ExpenseCategoriComponent,
        data: {type: 'save'}
      },
      {
        path: 'expense-categori/edit/:id',
        component: ExpenseCategoriComponent,
        data: {type: 'edit'}
      },
      {
        path: 'expense-categori/view/:id',
        component: ExpenseCategoriComponent,
        data: {type: 'view'}
      },

      //billing-limit
      {
        path: 'billing-limit',
        component: BillingLimitComponent,
      },

      //expense
      {
        path: 'expenses',
        component: ExpensesComponent,
      },
      {
        path: 'expense',
        component: ExpenseComponent,
        data: {type: 'save'}
      },
      {
        path: 'expense/edit/:id',
        component: ExpenseComponent,
        data: {type: 'edit'}
      },
      {
        path: 'expense/view/:id',
        component: ExpenseComponent,
        data: {type: 'view'}
      },

      //expense
      {
        path: 'invoices',
        component: InvoicesComponent,
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
        data: {type: 'save'}
      },
      {
        path: 'invoice/edit/:id',
        component: InvoiceComponent,
        data: {type: 'edit'}
      },
      {
        path: 'invoice/view/:id',
        component: InvoiceComponent,
        data: {type: 'view'}
      },


      //historical release
      {
        path: 'invoice/historical-release',
        component: HistoricalReleaseComponent,
        data: {type: 'view'}
      },
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
