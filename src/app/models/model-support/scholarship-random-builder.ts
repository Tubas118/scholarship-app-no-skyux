import { BasicDataBuilder } from 'src/shared/basic/basic-data-builder';
import { randomTestData } from 'src/shared/test-utils/random-test-data';
import { Scholarship } from '../scholarship';
import { Task } from '../task';
import { TaskRandomBuilder } from './task-random-builder';

export class ScholarshipRandomBuilder implements BasicDataBuilder<string, Scholarship> {
  id: string;
  scholarshipName: string;
  sponsorId: string;
  contactInfo: string;
  contactPhone: string;
  contactEmail: string;
  minimumGpa: string;
  tasks: Task[];

  code?: string;
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
  webpage?: URL;

  constructor() {
    this.id = randomTestData.uuid();
    this.scholarshipName = randomTestData.text();
    this.sponsorId = randomTestData.uuid();
    this.contactInfo = randomTestData.text();
    this.contactPhone = randomTestData.text();
    this.contactEmail = randomTestData.email();
    this.minimumGpa = randomTestData.pickNumberBetween(0, 4).toString();

    const numTasks = randomTestData.pickNumberBetween(1, 5);
    this.tasks = randomTestData.itemList(numTasks, () => {
      let task = new TaskRandomBuilder().build();
      task.done = false;
      task.invalid = false;
      return task;
    });

    this.assignOptionalValues();
  }

  public assignNoUndefinedOptionalValues(): ScholarshipRandomBuilder {
    return this.assignOptionalValues(true);
  }

  public assignOptionalValues(allValuesDefined?: boolean): ScholarshipRandomBuilder {
    this.code = (allValuesDefined || randomTestData.coinFlip()) ? randomTestData.text() : undefined;
    this.submitDate = (allValuesDefined || randomTestData.coinFlip()) ? randomTestData.date() : undefined;
    this.priority = (allValuesDefined || randomTestData.coinFlip()) ? randomTestData.pickNumberBetween(1, 5) : undefined;
    this.deadlineDate = (allValuesDefined || randomTestData.coinFlip()) ? randomTestData.date() : undefined;
    this.targetAmount = (allValuesDefined || randomTestData.coinFlip()) ? randomTestData.pickNumberBetween(1, 2000) : undefined;
    this.awardedAmount = (allValuesDefined || randomTestData.coinFlip()) ? randomTestData.pickNumberBetween(1, 1000) : undefined;
    this.submitted = (allValuesDefined || randomTestData.coinFlip()) ? randomTestData.coinFlip() : undefined;
    this.membershipRequired = (allValuesDefined || randomTestData.coinFlip()) ? randomTestData.coinFlip() : undefined;
    this.qualified = (allValuesDefined || randomTestData.coinFlip()) ? randomTestData.coinFlip() : undefined;
    this.previouslyApplied = (allValuesDefined || randomTestData.coinFlip()) ? randomTestData.coinFlip() : undefined;
    this.previouslyAwarded = (allValuesDefined || randomTestData.coinFlip()) ? randomTestData.coinFlip() : undefined;
    this.webpage = (allValuesDefined || randomTestData.coinFlip()) ? new URL(`http://${randomTestData.text()}.com`) : undefined;
    return this;
  }

  public assignUndefinedToOptionalValues(): ScholarshipRandomBuilder {
    this.code = undefined;
    this.submitDate = undefined;
    this.priority = undefined;
    this.deadlineDate = undefined;
    this.targetAmount = undefined;
    this.awardedAmount = undefined;
    this.submitted = undefined;
    this.membershipRequired = undefined;
    this.qualified = undefined;
    this.previouslyApplied = undefined;
    this.previouslyAwarded = undefined;
    this.webpage = undefined;
    return this;
  }

  public build(assignedFields?: Scholarship): Scholarship {
    return {
      ...this,
      ...assignedFields
    };
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
