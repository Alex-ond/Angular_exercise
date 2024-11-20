import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform<O extends object, K extends keyof O>(
        entities: O[] | null,
        filterString: string,
        propertyName: K): O[] {

        if (!entities) {
            return [];
        }
        if (entities.length === 0 || filterString === '') {
            return entities;
        }
        return entities.filter(entity => {
            const propertyValue = entity[propertyName];
            return typeof propertyValue === 'string' && propertyValue.indexOf(filterString) > -1;
        });
    }
}