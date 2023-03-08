import { CompanysService } from './../../../../core/services/companys.service';
import { ExpenseCategori } from './../../../../core/models/ExpenseCategori';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, forkJoin, map, Observable, startWith } from 'rxjs';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { SwalUtils } from 'src/app/shared/utils/swal/swal-utils';
import { ExpenseCategoriService } from 'src/app/core/services/expense-categori.service';
import { Company } from 'src/app/core/models/Company';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class DialogExpenseComponent implements OnInit {

  formExpense!: FormGroup;
  loading = false;
  type!: string;
  expenseCategories!: ExpenseCategori[];
  filteredExpenseCategories!:Observable<ExpenseCategori[]>;
  companys!: Company[];
  filteredCompanys!:Observable<Company[]>;

  constructor(
    private serviceExpense: ExpenseService,
    private serviceExpenseCategories: ExpenseCategoriService,
    private serviceCompany: CompanysService,
    private formBuilder: FormBuilder,
    private swalUtils: SwalUtils,
    public dialogRef: MatDialogRef<DialogExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean,
  ){ }

  ngOnInit(): void {

    if(this.data != null && this.data){
      this.type = "dialog";
    }

    this.loadValueAutoCompelte();
    this.loadForm();
  }

  submitForm(): void{
    if(this.formExpense.valid){
      this.loading = true;

      this.serviceExpense.postExpense(this.formExpense.value).pipe(finalize(() => this.loading = false))
      .subscribe(response => {
        if(response){
          this.swalUtils.showSucessSave('Despesa').then(() => {
              this.dialogRef.close();
            }
          );
        }
      });
    }
  }

  private loadForm(): void{
    this.formExpense = this.formBuilder.group({
      id: [null],
      expenseAmount: [null, [Validators.required]],
      expenseName: [null, [Validators.required]],
      accrualDate: [null, [Validators.required]],
      payDay: [null],
      expenseCategori: [null, [Validators.required]],
      company: [null],
    });

    this.filteredExpenseCategories = this.formExpense.controls['expenseCategori'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterExpenseCategories(value || ''))
    );

    this.filteredCompanys = this.formExpense.controls['company'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCompany(value || ''))
    );
  }

  loadValueAutoCompelte(): void{
    forkJoin({
      expenseCategori: this.serviceExpenseCategories.getAllFilterExpenseCategories(),
      company: this.serviceCompany.getAllCompanys(),
    }).subscribe(response => {
      this.expenseCategories = response.expenseCategori;
      this.companys = response.company;

      if(this.formExpense){
        this.filteredExpenseCategories = this.formExpense.controls['expenseCategori'].valueChanges.pipe(
          startWith(''),
          map(value => this._filterExpenseCategories(value || ''))
        );

        this.filteredCompanys = this.formExpense.controls['company'].valueChanges.pipe(
          startWith(''),
          map(value => this._filterCompany(value || ''))
        );
      }
    });
  }

  private _filterExpenseCategories(value: string): ExpenseCategori[] {
    if(value && typeof value == "string"){
      const filterValue = value.toLowerCase();

      return this.expenseCategories.filter(option => option.nameCategori.toLowerCase().includes(filterValue));
    }

    return this.expenseCategories;
  }

  displayWithExpenseCategories(value: ExpenseCategori): string{
    return value && value.nameCategori ? value.nameCategori : '';
  }

  private _filterCompany(value: string): Company[] {
    if(value && typeof value == "string"){
      const filterValue = value.toLowerCase();

      return this.companys.filter(option => option.companyName.toLowerCase().includes(filterValue));
    }

    return this.companys;
  }

  displayWithCompany(value: Company): string{
    return value && value.companyName ? value.companyName : '';
  }

  returnList(): void{
    this.dialogRef.close();
  }
}
