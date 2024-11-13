import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter',
    pure: false
  })
  export class FilterPipe implements PipeTransform {  
    transform(entities: any, filterString: string, propNames: string[]): any {
        if (entities.length === 0 || filterString === '') {
            return entities;
        }
        const result = [];
        for (const entity of entities) {
            for (const propName of propNames) {
                if ((entity[propName] as string).indexOf(filterString) > -1) {
                    result.push(entity);
                }
            }            
        }
        return result;
    }
  }
  