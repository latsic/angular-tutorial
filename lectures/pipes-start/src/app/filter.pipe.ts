import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false // Be careful, triggers recalc of pipe if data on the page changes
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    
    if(value.length === 0) {
      return value;
    }
    if(filterString.length == 0) {
      return value;
    }

    const resultArray = [];

    for(const item of value) {
      if(item[propName] === filterString) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }

}
