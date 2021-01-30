import { BasicData } from "src/shared/basic/basic-data";

export const SCHOLARSHIP_SCHEMA_V2 = 2;

export interface ScholarshipV2 extends BasicData<string> {
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
}
