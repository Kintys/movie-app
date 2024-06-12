import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingSeparation',
  standalone: true,
})
export class RatingSeparationPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';
    return value.toString().replace(/^(\d)(\d)$/, '$1.$2');
  }
}
