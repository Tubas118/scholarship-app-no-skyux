import { BasicData } from "src/shared/basic/basic-data";

export const CURRENT_SPONSOR_SCHEMA = 10;

export interface Sponsor extends BasicData<string> {
  sponsor: string;
  contactInfo: string;
  contactPhone: string;
  contactEmail: string;
}
