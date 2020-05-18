import { BasicData } from '../../shared/basic/basic-data';

export interface Scholarship extends BasicData<string> {
  scholarshipName: string;
  sponsor: string;
  sponsorContactInfo: string;
  contactPhone: string;
  contactEmail: string;
  status: string;
}

export enum ScholarshipStatus {
  SUBMITTED = 'active-submitted',
  APPLY = 'b-apply',
  LEAD = 'lead',
  FOLLOW_UP = 'follow-up',
  MAYBE = 'g-Maybe',
  NMI = 'h--NMI',
  CHECK = 'k+Check',
  PASS = 'z-pass',
  BROKEN = 'z-broken',
  PASSED_DEADLINE = 'z-passed-deadline',
  INVALID = 'z-invalid'
}
