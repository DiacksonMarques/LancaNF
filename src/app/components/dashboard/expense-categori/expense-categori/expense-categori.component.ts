import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { ExpenseCategori } from 'src/app/core/models/ExpenseCategori';
import { ExpenseCategoriService } from 'src/app/core/services/expense-categori.service';
import { SwalUtils } from 'src/app/shared/utils/swal/swal-utils';

@Component({
  selector: 'app-expense-categori',
  templateUrl: './expense-categori.component.html',
  styleUrls: ['./expense-categori.component.scss']
})
export class ExpenseCategoriComponent {

  formExpenseCategori!: FormGroup;
  loading = false;
  type!: string

  constructor(
    private serviceExpenseCategori: ExpenseCategoriService,
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
    if(this.formExpenseCategori.valid){
      this.loading = true;

      let observableExpenseCategori: Observable<ExpenseCategori>;
      if(this.type == 'save'){
        observableExpenseCategori = this.serviceExpenseCategori.postExpenseCategori(this.formExpenseCategori.value);
      } else {
        observableExpenseCategori = this.serviceExpenseCategori.putExpenseCategori(this.formExpenseCategori.value);
      }

      observableExpenseCategori.pipe(finalize(() => this.loading = false))
      .subscribe(response => {
        if(response){
          this.swalUtils.showSucessSave('Categorai de Despesa');
          if(this.type == "save"){
            this.router.navigateByUrl(`/dashboard/expense-categori/view/${response.id}`);
          }
        }
      });
    }
  }

  private loadForm(): void{
    this.formExpenseCategori = this.formBuilder.group({
      id: [null],
      nameCategori: [null, [Validators.required]],
      descriptionCategori: [null, [Validators.required]],
      filed: [false, [Validators.required]]
    })
  }

  private setValueForm(): void{
    this.serviceExpenseCategori.getByIdExpenseCategori(this.activatedRoute.snapshot.params?.['id'])
    .subscribe(response => {
      this.formExpenseCategori.setValue(response);
    })
  }

  returnList(): void{
    this.router.navigateByUrl(`/dashboard/expense-categories`);
  }
}
