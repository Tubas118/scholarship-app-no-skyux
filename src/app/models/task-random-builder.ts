import { BasicDataBuilder } from 'src/shared/basic/basic-data-builder';
import { randomTestData } from 'src/shared/test-utils/random-test-data';
import { Note, Task } from './task';

export class TaskRandomBuilder implements BasicDataBuilder<string, Task> {
  public id: string;
  public scholarshipId: string;
  public summary: string;
  public assignedTo: string;
  public notes?: Note[];
  public done?: boolean;
  public invalid?: boolean;

  constructor() {
    this.id = randomTestData.uuid();
    this.scholarshipId = randomTestData.uuid();
    this.summary = randomTestData.text() + ' ' + randomTestData.text();
    this.assignedTo = randomTestData.text();
    this.done = randomTestData.coinFlip();
    this.invalid = randomTestData.coinFlip();

    this.notes = randomTestData.coinFlip
      ? undefined
      : randomTestData.itemList(randomTestData.pickNumberBetween(0, 4), new NoteRandomBuilder().build());
  }

  public build(): Task {
    return JSON.parse(JSON.stringify(this)) as Task;
  }
}

export class NoteRandomBuilder {
  public details: string;
  public timestamp: Date;
  public userId: string;

  constructor() {
    this.details = randomTestData.text() + ' ' + randomTestData.text();
    this.timestamp = randomTestData.date();
    this.userId = randomTestData.uuid();
  }

  public build(): Note {
    return JSON.parse(JSON.stringify(this)) as Note;
  }
}
