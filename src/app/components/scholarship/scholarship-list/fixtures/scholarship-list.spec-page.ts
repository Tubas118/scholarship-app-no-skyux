import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ScholarshipListComponent } from "../scholarship-list.component";

export class ScholarshipListSpecPage {
  constructor(private fixture: ComponentFixture<ScholarshipListComponent>) { }

  get allScholarshipRows(): HTMLElement[] {
    return this.fixture.nativeElement.querySelectorAll('.lrock-selectable');
  }

  get allScholarshipDebugRows(): DebugElement[] {
    return this.fixture.debugElement.queryAll(By.css('.lrock-selectable'));
  }

  scholarshipRow(id: string): HTMLElement {
    return this.scholarshipDebugRow(id)?.nativeElement;
  }

  scholarshipDebugRow(id: string): DebugElement {
    return this.fixture.debugElement.query(By.css(id));
  }

  scholarshipDebugOpenTasks(row: DebugElement): DebugElement {
    return row.query(By.css('.ct-open-tasks'));
  }

  scholarshipDebugTotalTasks(row: DebugElement): DebugElement {
    return row.query(By.css('.ct-total-tasks'));
  }

  scholarshipOpenTasks(row: HTMLElement): HTMLElement {
    return row.querySelector('.ct-open-tasks');
  }

  scholarshipTotalTasks(row: HTMLElement): HTMLElement {
    return row.querySelector('.ct-total-tasks');
  }
}
