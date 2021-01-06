import { BasicDataBuilder } from 'src/shared/basic/basic-data-builder';
import { randomTestData } from 'src/shared/test-utils/random-test-data';
import { Scholarship } from './scholarship';

export class ScholarshipRandomBuilder implements BasicDataBuilder<string, Scholarship> {
  public id: string;
  public scholarshipName: string;
  public code?: string;
  public sponsor: string;
  public sponsorContactInfo: string;
  public contactPhone: string;
  public contactEmail: string;
  public minimumGpa: string;
  public status: string;
  public statusType?: number;
  public submitDate?: Date;
  public deadlineDate?: Date;
  public targetAmount?: number;
  public awardedAmount?: number;
  public submitted?: boolean;
  public previouslyApplied?: boolean;
  public previouslyAwarded?: boolean;
  public essayRequired?: boolean;
  public essaySubmitted?: boolean;
  public financialsRequired?: boolean;
  public financialsSubmitted?: boolean;
  public membershipRequired?: boolean;
  public qualified?: boolean;

  constructor() {
    this.id = randomTestData.uuid();
    this.scholarshipName = randomTestData.text();
    this.code = randomTestData.coinFlip() ? randomTestData.text() : undefined;
    this.sponsor = randomTestData.text();
    this.sponsorContactInfo = randomTestData.text();
    this.contactPhone = randomTestData.text();
    this.contactEmail = randomTestData.email();
    this.minimumGpa = randomTestData.pickNumberBetween(0, 4).toString();
    this.status = randomTestData.text();
    this.statusType = randomTestData.coinFlip() ? randomTestData.pickNumberBetween(0, 100) : undefined;
    this.submitDate = randomTestData.coinFlip() ? randomTestData.date() : undefined;
    this.targetAmount = randomTestData.coinFlip() ? randomTestData.pickNumberBetween(1, 2000) : undefined;
    this.awardedAmount = randomTestData.coinFlip() ? randomTestData.pickNumberBetween(1, 1000) : undefined;
    this.submitted = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
    this.previouslyApplied = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
    this.previouslyAwarded = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
    this.essayRequired = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
    this.essaySubmitted = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
    this.financialsRequired = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
    this.financialsSubmitted = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
    this.membershipRequired = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
    this.qualified = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
  }

  public build(): Scholarship {
    return JSON.parse(JSON.stringify(this)) as Scholarship;
  }
}
