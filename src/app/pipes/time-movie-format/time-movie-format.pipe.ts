import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeMovieFormat',
  standalone: true,
})
export class TimeMovieFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';
    const stringValue = value.toString().padStart(6, '0');
    return stringValue
      .toString()
      .replace(/^(\d{2})(\d{2})(\d{2})$/, '$1:$2:$3');
  }
}
