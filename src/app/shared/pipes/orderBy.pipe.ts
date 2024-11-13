import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'orderBy',
    pure: false
  })
  export class OrderByPipe implements PipeTransform {  
    transform(entities: any[], direction: 'asc' | 'desc', propName: string): any[] {
        if (entities.length === 0) {
            return entities;
        }
        return entities.toSorted((a, b) => 
            direction === "asc" ? 
                a[propName] - b[propName] : 
                b[propName] - a[propName]);
    }
  }
  