import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {
  transform<O extends object, K extends keyof O>(
    entities: O[] | null,
    direction: 'asc' | 'desc',
    propertyName: K): O[] {

    if (!entities) {
      return [];
    }
    if (entities.length === 0) {
      return entities;
    }    
    return entities.toSorted((a, b) => {
      const aPropertyValue = a[propertyName];
      const bPropertyValue = b[propertyName];
      if (typeof aPropertyValue === 'number' && typeof bPropertyValue === 'number') {
        return direction === "asc" ? aPropertyValue - bPropertyValue : bPropertyValue - aPropertyValue;
      }
      return 0;
    });
  }
}
