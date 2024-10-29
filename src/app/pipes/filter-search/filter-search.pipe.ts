import { Movie } from '@/app/shared/type-declorate'
import { Pipe, PipeTransform } from '@angular/core'
import { map, of, take } from 'rxjs'

@Pipe({
    name: 'filterSearch',
    standalone: true
})
export class FilterSearchPipe implements PipeTransform {
    transform(items: Movie[], searchText: string): any[] {
        if (!items) {
            return []
        }
        if (!searchText || searchText.length <= 3) {
            return items
        }

        return items.filter((movie) => {
            return movie.original_title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
        })
    }
}
