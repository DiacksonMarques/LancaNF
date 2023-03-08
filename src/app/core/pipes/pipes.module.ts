import { PhoneFormatPipe } from './phone-format.pipe';
import { CpfcnpjPipe } from './cpfcnpj.pipe';
import { CepPipe } from './cep.pipe';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ConsultObjectPipe } from './consult-object.pipe';



@NgModule({
  declarations: [
    CepPipe,
    CpfcnpjPipe,
    PhoneFormatPipe,
    ConsultObjectPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CepPipe,
    CpfcnpjPipe,
    PhoneFormatPipe,
    ConsultObjectPipe
  ],
  providers: [
    CepPipe,
    CpfcnpjPipe,
    PhoneFormatPipe,
    CurrencyPipe,
    DatePipe,
    ConsultObjectPipe
  ]
})
export class PipesModule {
  static forRoot() {
    return {
        ngModule: PipesModule,
        providers: [],
    };
  }
}
