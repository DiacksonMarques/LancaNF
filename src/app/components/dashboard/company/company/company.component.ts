import { SwalUtils } from './../../../../shared/utils/swal/swal-utils';
import { finalize, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanysService } from './../../../../core/services/companys.service';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/core/models/Company';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {

  formCompany!: FormGroup;
  loading = false;
  type!: string

  constructor(
    private serviceCompany: CompanysService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private swalUtils: SwalUtils
  ){ }

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.data?.['type'];

    this.loadForm();
    if(this.type && this.type != "save"){
      this.setValueForm();
    }
  }

  submitForm(): void{
    if(this.formCompany.valid){
      this.loading = true;

      let observableCompany: Observable<Company>;
      if(this.type == 'save'){
        observableCompany = this.serviceCompany.postCompany(this.formCompany.value);
      } else {
        observableCompany = this.serviceCompany.putCompany(this.formCompany.value);
      }

      observableCompany.pipe(finalize(() => this.loading = false))
      .subscribe(response => {
        if(response){
          this.swalUtils.showSucessSave('Empresa');
          if(this.type == "save"){
            this.router.navigateByUrl(`/dashboard/company/view/${response.id}`);
          }
        }
      });
    }
  }

  private loadForm(): void{
    this.formCompany = this.formBuilder.group({
      id: [null],
      cnpj: [null, [Validators.required]],
      companyName: [null, [Validators.required]],
      corporateName: [null, [Validators.required]],
    })
  }

  private setValueForm(): void{
    this.serviceCompany.getByIdCompanys(this.activatedRoute.snapshot.params?.['id'])
    .subscribe(response => {
      this.formCompany.setValue(response);
    })
  }

  returnList(): void{
    this.router.navigateByUrl(`/dashboard/companys`);
  }
}
