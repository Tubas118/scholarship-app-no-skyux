import { BasicDataBuilder } from 'src/shared/basic/basic-data-builder';
import { randomTestData } from 'src/shared/test-utils/random-test-data';
import { Scholarship } from '../scholarship';
import { Task } from '../task';
import { TaskRandomBuilder } from './task-random-builder';

export class ScholarshipRandomBuilder implements BasicDataBuilder<string, Scholarship> {
  id: string;
  scholarshipName: string;
  code?: string;
  sponsorId: string;
  contactInfo: string;
  contactPhone: string;
  contactEmail: string;
  minimumGpa: string;
  submitDate?: Date;
  priority?: number;
  deadlineDate?: Date;
  targetAmount?: number;
  awardedAmount?: number;
  submitted?: boolean;
  membershipRequired?: boolean;
  qualified?: boolean;
  previouslyApplied?: boolean;
  previouslyAwarded?: boolean;
  tasks: Task[];
  webpage?: URL;

  constructor() {
    this.id = randomTestData.uuid();
    this.scholarshipName = randomTestData.text();
    this.code = randomTestData.coinFlip() ? randomTestData.text() : undefined;
    this.sponsorId = randomTestData.uuid();
    this.contactInfo = randomTestData.text();
    this.contactPhone = randomTestData.text();
    this.contactEmail = randomTestData.email();
    this.minimumGpa = randomTestData.pickNumberBetween(0, 4).toString();
    this.submitDate = randomTestData.coinFlip() ? randomTestData.date() : undefined;
    this.priority = randomTestData.coinFlip() ? randomTestData.pickNumberBetween(1, 5) : undefined;
    this.targetAmount = randomTestData.coinFlip() ? randomTestData.pickNumberBetween(1, 2000) : undefined;
    this.awardedAmount = randomTestData.coinFlip() ? randomTestData.pickNumberBetween(1, 1000) : undefined;
    this.submitted = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
    this.membershipRequired = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
    this.qualified = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
    this.previouslyApplied = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
    this.previouslyAwarded = randomTestData.coinFlip() ? randomTestData.coinFlip() : undefined;
    this.webpage = randomTestData.coinFlip() ? new URL(`http://${randomTestData.text()}.com`) : undefined;

    this.tasks = randomTestData.itemList(randomTestData.pickNumberBetween(0, 5), () => {
      let task = new TaskRandomBuilder().build();
      task.done = false;
      task.invalid = false;
      return task;
    });
  }

  public build(): Scholarship {
    return JSON.parse(JSON.stringify(this)) as Scholarship;
  }

  /** @deprecated */
  public sponsor: string;
  /** @deprecated */
  public sponsorContactInfo: string;
  /** @deprecated */
  public essayRequired?: boolean;
  /** @deprecated */
  public essaySubmitted?: boolean;
  /** @deprecated */
  public financialsRequired?: boolean;
  /** @deprecated */
  public financialsSubmitted?: boolean;
  /** @deprecated */
  public status: string;
  /** @deprecated */
  public statusType?: number;
}
