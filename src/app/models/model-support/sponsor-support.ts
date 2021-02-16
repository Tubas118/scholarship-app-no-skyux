import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { CURRENT_SPONSOR_SCHEMA, Sponsor } from '../sponsor';
import { ModelSupport } from './all-generic-model-support';

@Injectable({
  providedIn: 'root'
})
export class SponsorSupport extends ModelSupport<Sponsor, Sponsor> {
  constructor(protected datepipe: DatePipe) {
    super(datepipe);
  }

  newModel(assignedFields?: Sponsor): Sponsor {
    let sponsor = {
      sponsor: '',
      contactInfo: '',
      contactPhone: '',
      contactEmail: '',
      schemaVersion: CURRENT_SPONSOR_SCHEMA
    } as Sponsor;
    return {
      ...sponsor,
      ...assignedFields
    };
  }

  compare(compare1: Sponsor, compare2: Sponsor): number {
    return compare1 > compare2 ? 1 : -1;
  }
}
