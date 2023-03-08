import { SwalUtils } from './../../shared/utils/swal/swal-utils';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { ListingDataComponent } from 'src/app/shared/components/listing-data/listing-data.component';
import { CompanysComponent } from './company/companys/companys.component';
import { CompanyComponent } from './company/company/company.component';

import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NgChartsModule } from 'ng2-charts';
import { TableModule } from 'src/app/shared/utils/table/table.module';
import { ButtonLoadingModule } from 'src/app/shared/utils/button-loading/button-loading.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ExpenseCategoriesComponent } from './expense-categori/expense-categories/expense-categories.component';
import { ExpenseCategoriComponent } from './expense-categori/expense-categori/expense-categori.component';
import { BillingLimitComponent } from './billing-limit/billing-limit.component';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { customCurrencyMaskConfig } from 'src/assets/config/customCurrencyMaskConfig';
import { ExpensesComponent } from './expense/expenses/expenses.component';
import { ExpenseComponent } from './expense/expense/expense.component';
import { InvoicesComponent } from './invoice/invoices/invoices.component';
import { InvoiceComponent } from './invoice/invoice/invoice.component';
import { DialogInvoiceComponent } from './invoice/invoice/dialog.invoice.component';
import { DialogExpenseComponent } from './expense/expense/dialog.expense.component';
import { HistoricalReleaseComponent } from './historical-release/historical-release.component';


@NgModule({
  declarations: [
    HomeComponent,
    ListingDataComponent,
    CompanysComponent,
    CompanyComponent,
    ExpenseCategoriesComponent,
    ExpenseCategoriComponent,
    BillingLimitComponent,
    ExpensesComponent,
    ExpenseComponent,
    DialogExpenseComponent,
    InvoicesComponent,
    InvoiceComponent,
    DialogInvoiceComponent,
    HistoricalReleaseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonLoadingModule,

    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatRippleModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,

    NgChartsModule,
    TableModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SweetAlert2Module.forRoot(),
    CurrencyMaskModule,
  ],
  providers: [
    provideNgxMask(),
    SwalUtils,
    { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig }
  ],
})
export class DashboardModule { }
