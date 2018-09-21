import { Pipe, PipeTransform } from '@angular/core';
import { IPhone } from '../models/phoneData.model';

@Pipe ({
    name: 'filterProduct'
})

export class FilterPipe implements PipeTransform {
    transform(value: IPhone[], filterBy: string): IPhone[] {
        filterBy = filterBy ? filterBy.toLowerCase() : null ;
        return filterBy ? value.filter((product: IPhone) =>
            product.name.toLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
