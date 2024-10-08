import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'dateDisplay'
})
export class DateDisplayPipe implements PipeTransform {
  constructor(private datePipe: DatePipe){}
  transform(value: Timestamp | undefined): string {
    return this.datePipe.transform(value?.toMillis(),'short') ?? '';
  }

}
