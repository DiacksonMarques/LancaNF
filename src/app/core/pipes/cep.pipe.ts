import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep',
})
export class CepPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return null;
    }
    const cep = value.replace(/[^0-9]/g, '');

    if (cep.length === 8) {
      return cep.replace(/(\d{2})(\d{3})(\d{3})/g, '$1.$2-$3');
    }

    return value;
  }
}
