import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe implements PipeTransform {

  transform(value: any): any {
    
    const len = value.length;
    if(!len || len == 0) return value;

    if(typeof(value)==="string"){
      let valueReverse = "";
      for(let i = len - 1; i >= 0; i--) {
        valueReverse += value.charAt(i);        
      }
      return valueReverse;
    }

    let valueReverse = [];
    for(let i = len - 1; i >= 0; i--) {
      valueReverse.push(value[i]);
    }
    return valueReverse;
  }
}
