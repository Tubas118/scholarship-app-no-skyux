import { BasicData } from '../../shared/basic/basic-data';

export interface Scholarship extends BasicData<string> {
  scholarshipName: string;
  code?: string;
  sponsor: string;
  sponsorContactInfo: string;
  contactPhone: string;
  contactEmail: string;
  status: string;
  statusType?: number;
  submitDate?: Date;
  deadlineDate?: Date;
  targetAmount?: number;
  awaredAmount?: number;
}

export const CURRENT_SCHEMA_VERSION = 2;

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

export const statusTypeMap = {
  SUBMITTED: 2,
  APPLY: 1,
  LEAD: 1,
  FOLLOW_UP: 3,
  MAYBE: 1,
  NMI: 99,
  CHECK: 1,
  PASS: 99,
  BROKEN: 99,
  PASSED_DEADLINE: 99,
  INVALID: 99
}
