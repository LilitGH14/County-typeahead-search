import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length',
  standalone: true,
})
export class LengthPipe implements PipeTransform {
  transform(value: any): any {
    return value && Array.isArray(value) ? value.length : 0;
  }
}
