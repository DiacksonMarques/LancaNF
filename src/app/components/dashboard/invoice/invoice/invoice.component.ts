import { Invoice } from './../../../../core/models/Invoice';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, Observable, startWith } from 'rxjs';
import { Company } from 'src/app/core/models/Company';
import { CompanysService } from 'src/app/core/services/companys.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { SwalUtils } from 'src/app/shared/utils/swal/swal-utils';
import { GenericValue } from 'src/app/core/models/GenericValue';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit{

  formInvoice!: FormGroup;
  loading = false;
  type!: string;
  companys!: Company[];
  filteredCompanys!:Observable<Company[]>;
  months!: GenericValue[];

  constructor(
    private serviceInvoice: InvoiceService,
    private serviceCompany: CompanysService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private swalUtils: SwalUtils,
  ){ }

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.data?.['type'];

    this.loadValueAutoCompelte();
    this.loadForm();
    if(this.type && this.type != "save"){
      this.setValueForm();
    }
  }

  submitForm(): void{
    if(this.formInvoice.valid){
      this.loading = true;

      let observableInvoice: Observable<Invoice>;
      if(this.type == 'save'){
        observableInvoice = this.serviceInvoice.postInvoice(this.formInvoice.value);
      } else {
        observableInvoice = this.serviceInvoice.putInvoice(this.formInvoice.value);
      }

      observableInvoice.pipe(finalize(() => this.loading = false))
      .subscribe(response => {
        if(response){
          this.swalUtils.showSucessSave('Nota Fiscal');
          if(this.type == "save"){
            this.router.navigateByUrl(`/dashboard/invoice/view/${response.id}`);
          }
        }
      });
    }
  }

  private loadForm(): void{
    this.formInvoice = this.formBuilder.group({
      id: [null],
      valueInvoice: [null, [Validators.required]],
      numberInvoice: [null, [Validators.required]],
      descriptioninvoice: [null, [Validators.required]],
      monthInvoice: [null, [Validators.required]],
      receiptDate: [null],
      company: [null, [Validators.required]]
    });

    this.filteredCompanys = this.formInvoice.controls['company'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCompany(value || ''))
    );
  }

  private setValueForm(): void{
    this.serviceInvoice.getByIdInvoice(this.activatedRoute.snapshot.params?.['id'])
    .subscribe(response => {
      this.formInvoice.setValue(response);
    })
  }

  loadValueAutoCompelte(): void{
    this.months = this.serviceInvoice.getMonths();
    this.serviceCompany.getAllCompanys().subscribe(response => {
      this.companys = response;

      if(this.formInvoice){
        this.filteredCompanys = this.formInvoice.controls['company'].valueChanges.pipe(
          startWith(''),
          map(value => this._filterCompany(value || ''))
        );
      }
    });
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
    this.router.navigateByUrl(`/dashboard/invoices`);
  }
}
