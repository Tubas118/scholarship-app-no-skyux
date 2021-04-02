import { ComponentFixture } from "@angular/core/testing";
import { BaseSpecPage, ChildElementGetterByCssName, ElementArrayGetterByCssName } from "src/lib/utils/dom-utils";
import { ScholarshipListComponent } from "../scholarship-list.component";

export class ScholarshipListSpecPage extends BaseSpecPage<ScholarshipListComponent> {
  constructor(public fixture: ComponentFixture<ScholarshipListComponent>) {
    super(fixture);
  }

  readonly allScholarshipRows = new ElementArrayGetterByCssName<HTMLElement[]>('.lrock-selectable', this);

  readonly scholarshipName = new ChildElementGetterByCssName<HTMLElement>('.ct-scholarship-name');

  readonly scholarshipOpenTasks = new ChildElementGetterByCssName<HTMLElement>('.ct-open-tasks');

  readonly scholarshipTotalTasks = new ChildElementGetterByCssName<HTMLElement>('.ct-total-tasks');
}
