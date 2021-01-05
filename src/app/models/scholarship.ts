import { BasicData } from '../../shared/basic/basic-data';
import { Task } from './task';

export const CURRENT_SCHOLARSHIP_SCHEMA = 3;

export interface Scholarship extends BasicData<string> {
  scholarshipName: string;
  code?: string;
  sponsor: string;
  sponsorContactInfo: string;
  contactPhone: string;
  contactEmail: string;
  minimumGpa: string;
  status: string;
  statusType?: number;
  submitDate?: Date;
  deadlineDate?: Date;
  targetAmount?: number;
  awardedAmount?: number;
  submitted?: boolean;
  previouslyApplied?: boolean;
  previouslyAwarded?: boolean;
  essayRequired?: boolean;
  essaySubmitted?: boolean;
  financialsRequired?: boolean;
  financialsSubmitted?: boolean;
  membershipRequired?: boolean;
  qualified?: boolean;
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
