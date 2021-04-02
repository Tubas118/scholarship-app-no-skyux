import { ComponentFixture } from "@angular/core/testing";
import { BaseSpecPage, ChildElementGetterByCssName, ElementArrayGetterByCssName } from "src/lib/utils/dom-utils";
import { ScholarshipListComponent } from "../scholarship-list.component";

export class ScholarshipListSpecPage extends BaseSpecPage<ScholarshipListComponent> {
  constructor(public fixture: ComponentFixture<ScholarshipListComponent>) {
    super(fixture);
  }

  readonly allScholarshipRows = new ElementArrayGetterByCssName<HTMLElement[]>('.lrock-selectable', this);

  readonly scholarshipCode = new ChildElementGetterByCssName<HTMLElement>('.ct-code');

  readonly scholarshipDeadlineDate = new ChildElementGetterByCssName<HTMLElement>('.ct-deadline-date');

  readonly scholarshipName = new ChildElementGetterByCssName<HTMLElement>('.ct-scholarship-name');

  readonly scholarshipOpenTasks = new ChildElementGetterByCssName<HTMLElement>('.ct-open-tasks');

  readonly scholarshipPriority = new ChildElementGetterByCssName<HTMLElement>('.ct-priority');

  //readonly scholarshipSubmitDate = new ChildElementGetterByCssName<HTMLElement>('ct-submit-date');

  readonly scholarshipTargetAmount = new ChildElementGetterByCssName<HTMLElement>('.ct-target-amount');

  readonly scholarshipTotalTasks = new ChildElementGetterByCssName<HTMLElement>('.ct-total-tasks');
}
