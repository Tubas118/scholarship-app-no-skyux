import { BasicData } from "src/shared/basic/basic-data";
import { Task } from "../../task";

export const SCHOLARSHIP_SCHEMA_V3 = 3;

export interface ScholarshipV3 extends BasicData<string> {
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
  tasks: Task[];
}
