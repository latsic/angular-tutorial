import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  
    const len = value.length;
    if(!len || len == 0) return value;

    let valueCopy = value.slice();

    valueCopy.sort((s1, s2) => {
      if(s1.name < s2.name) return -1;
      if(s1.name > s2.name) return 1;
      return 0;
    });

    return valueCopy;
  }

}
