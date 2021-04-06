import { ComponentFixture } from "@angular/core/testing";
import { BaseSpecPage, TextboxGetterByName } from "src/lib/utils/dom-utils";
import { ScholarshipEditComponent } from "../scholarship-edit.component";
//import { lrock.testing.TextboxGetterByCssName }

export class ScholarshipEditSpecPage extends BaseSpecPage<ScholarshipEditComponent> {
  constructor(public fixture: ComponentFixture<ScholarshipEditComponent>) {
    super(fixture);
  }

  readonly scholarshipName = new TextboxGetterByName('scholarshipName', this);

  readonly scholarshipCode = new TextboxGetterByName('scholarshipCode', this);

  readonly targetAmount = new TextboxGetterByName('targetAmount', this);

  readonly sponsorId = new TextboxGetterByName('sponsorId', this);

  // TODO - webpage
  // TODO - deadlineDate
  // TODO - submitDate
  // TODO - submitted

  readonly minimumGpa = new TextboxGetterByName('minimumGpa', this);

  readonly contactInfo = new TextboxGetterByName('contactInfo', this);

  readonly contactPhone = new TextboxGetterByName('contactPhone', this);

  // TODO - contactEmail
}
