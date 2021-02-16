import { DatePipe } from "@angular/common";

export abstract class ModelSupport<T, C> {
  constructor(protected datepipe: DatePipe) { }

  abstract newModel(assignedFields?: T): T;

  abstract compare(compare1: C, compare2: C): number;

  getSortDateOrLow(date: Date): string {
    return (date !== undefined) ? this.datepipe.transform(date, 'yyyy-MM-dd') : '0000-00-00';
  }

  getSortDateOrHigh(date: Date): string {
    return (date !== undefined) ? this.datepipe.transform(date, 'yyyy-MM-dd') : '9999-99-99';
  }
}
