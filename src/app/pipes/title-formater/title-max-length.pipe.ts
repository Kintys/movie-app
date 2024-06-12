import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleMaxLength',
  standalone: true,
})
export class TitleMaxLengthPipe implements PipeTransform {
  transform(value: string): string {
    if (value == null) return '';
    if (value.length > 250) return value.slice(0, 253) + '...';
    return value;
  }
}
