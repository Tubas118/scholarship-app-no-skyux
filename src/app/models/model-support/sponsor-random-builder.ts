import { BasicDataBuilder } from "src/shared/basic/basic-data-builder";
import { randomTestData } from "src/shared/test-utils/random-test-data";
import { CURRENT_SPONSOR_SCHEMA, Sponsor } from "../sponsor";

export class SponsorRandomBuilder implements Sponsor, BasicDataBuilder<string, Sponsor> {
  sponsor: string;
  contactInfo: string;
  contactPhone: string;
  contactEmail: string;
  id: string;
  version?: number;
  schemaVersion: number;

  constructor() {
    this.id = randomTestData.uuid();
    this.sponsor = randomTestData.text();
    this.contactInfo = randomTestData.text();
    this.contactPhone = randomTestData.text();
    this.contactEmail = randomTestData.text();
    this.version = randomTestData.pickNumberBetween(0, 10);
    this.schemaVersion = CURRENT_SPONSOR_SCHEMA;
  }

  build(assignedFields?: Sponsor): Sponsor {
    return {
      ...this,
      ...assignedFields
    };
  }
}
