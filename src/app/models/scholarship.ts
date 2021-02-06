import { BasicData } from '../../shared/basic/basic-data';
import { Task } from './task';

export const CURRENT_SCHOLARSHIP_SCHEMA = 11;

export interface Scholarship extends BasicData<string> {
  scholarshipName: string;
  code?: string;
  sponsorId: string;
  contactInfo: string;
  contactPhone: string;
  contactEmail: string;
  minimumGpa: string;
  submitDate?: Date;
  deadlineDate?: Date;
  targetAmount?: number;
  awardedAmount?: number;
  submitted?: boolean;
  membershipRequired?: boolean;
  qualified?: boolean;
  previouslyApplied?: boolean;
  previouslyAwarded?: boolean;
  tasks: Task[];

  /** @deprecated */
  sponsor: string;
  /** @deprecated */
  sponsorContactInfo: string;
  /** @deprecated */
  essayRequired?: boolean;
  /** @deprecated */
  essaySubmitted?: boolean;
  /** @deprecated */
  financialsRequired?: boolean;
  /** @deprecated */
  financialsSubmitted?: boolean;

  // -- Deprecated in schema version 11
  /** @deprecated */
  status: string;
  /** @deprecated */
  statusType?: number;
}

/** @deprecated */
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

/** @deprecated */
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
