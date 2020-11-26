import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'previousDate'
})
export class PreviousDatePipe implements PipeTransform {

  transform(value: Date, previous: number): Date {
    let daysAgo = new Date();
    if (value) {
      daysAgo.setDate(value.getDate() - previous);
    } 
 
    return daysAgo;
  }

}
