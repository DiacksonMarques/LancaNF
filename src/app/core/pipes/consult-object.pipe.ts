import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consultObject'
})
export class ConsultObjectPipe implements PipeTransform {

  transform(value: any, args: string): string {
    return value[args];
  }

}
