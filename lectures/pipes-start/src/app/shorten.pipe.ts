import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, limit: number): any {

    if(value.length <= limit) {
      return value;
    }

    return value.substr(0, limit) + " ...";
  }

}