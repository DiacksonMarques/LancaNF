import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { BillingLimitService } from 'src/app/core/services/billing-limit.service';
import { SwalUtils } from 'src/app/shared/utils/swal/swal-utils';

@Component({
  selector: 'app-billing-limit',
  templateUrl: './billing-limit.component.html',
  styleUrls: ['./billing-limit.component.scss']
})
export class BillingLimitComponent {

  formBillingLimit!: FormGroup;
  loading = false;

  constructor(
    private serviceBillingLimitService: BillingLimitService,
    private formBuilder: FormBuilder,
    private swalUtils: SwalUtils
  ){ }

  ngOnInit(): void {
    this.loadForm();
  }

  submitForm(): void{
    if(this.formBillingLimit.valid){
      this.loading = true;

      this.serviceBillingLimitService.putBillingLimit(this.formBillingLimit.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => {
        if(response){
          this.swalUtils.showSucessSave('Limite de Faturamento');
        }
      });
    }
  }

  private loadForm(): void{
    this.formBillingLimit = this.formBuilder.group({
      id: [null],
      limit: [null, [Validators.required]],
      alert: [true, [Validators.required]],
    });

    this.setValueForm();
  }

  private setValueForm(): void{
    this.serviceBillingLimitService.getByBillingLimit()
    .subscribe(response => {
      this.formBillingLimit.setValue(response);
    })
  }
}
