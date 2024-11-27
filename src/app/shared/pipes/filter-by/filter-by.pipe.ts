import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform<O extends object, K extends keyof O>(
        entities: O[] | null,
        filter: O[K],
        propertyName: K): O[] {

        if (!entities) {
            return [];
        }
        if (entities.length === 0 || filter === '') {
            return entities;
        }
        return entities.filter(entity => {
            const propertyValue = entity[propertyName];
            
            return typeof propertyValue === 'string' && 
                typeof filter === 'string' && 
                propertyValue.indexOf(filter) > -1;
        });
    }
}