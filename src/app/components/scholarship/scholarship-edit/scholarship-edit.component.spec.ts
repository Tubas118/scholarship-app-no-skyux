import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader, TranslateService, TranslatePipe } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ScholarshipRandomBuilder } from 'src/app/models/model-support/scholarship-random-builder';
import { ScholarshipSupport } from 'src/app/models/model-support/scholarship-support';
import { SponsorRandomBuilder } from 'src/app/models/model-support/sponsor-random-builder';
import { TaskSupport } from 'src/app/models/model-support/task-support';
import { Scholarship } from 'src/app/models/scholarship';
import { SponsorService } from 'src/app/services/sponsor-service';
import { CheckboxComponent } from 'src/lib/components/checkbox/checkbox.component';
import { DateSelectComponent } from 'src/lib/components/date-select/date-select.component';
import { SelectValueComponent } from 'src/lib/components/selectbox/selectbox.component';
import { TextboxComponent } from 'src/lib/components/textbox/textbox.component';
import { AppConfigSettings } from 'src/shared/basic/basic-service-impl';
import { HttpLoaderFactory } from 'src/shared/components/shared-components-module';
import { AppConfigService } from 'src/shared/services/app-config/app-config.service';
import { UuidIdService } from 'src/shared/services/uuid-id-service';
import { TaskDashboardComponent } from '../../task/task-dashboard/task-dashboard.component';
import { TaskListComponent } from '../../task/task-list/task-list.component';
import { ScholarshipEditSpecPage } from './fixtures/scholarship-edit.spec-page';
import { ScholarshipEditComponent } from './scholarship-edit.component';

describe('scholarship-edit component', () => {
  let fixture: ComponentFixture<ScholarshipEditComponent>;
  let component: ScholarshipEditComponent;
  let elements: ScholarshipEditSpecPage;
  let datePipe: DatePipe;
  let formBuilder = new FormBuilder();
  let scholarshipSupport: ScholarshipSupport;
  let sponsorService: SponsorService;
  let taskSupport: TaskSupport;

  let spyHttpClient = jasmine.createSpyObj('HttpClient', ['post', 'put', 'get']);

  let appConfigService = new AppConfigService(spyHttpClient);
  appConfigService.appConfigSettings = {
    apiUrl: 'http://json-server-svc-dev:3000',
    pageSize: 20
  } as AppConfigSettings;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          defaultLanguage: 'en',
          loader: {
            provide: TranslateLoader,
            useFactory: (HttpLoaderFactory),
            deps: [HttpClient]
          }
        })
      ],
      declarations: [
        ScholarshipEditComponent,
        CheckboxComponent,
        DateSelectComponent,
        SelectValueComponent,
        TaskDashboardComponent,
        TextboxComponent
      ],
      providers: [
        { provide: AppConfigService, useValue: appConfigService },
        CurrencyPipe,
        DatePipe,
        { provide: FormBuilder, useValue: formBuilder },
        HttpClient,
        ScholarshipSupport,
        SponsorService,
        TaskDashboardComponent,
        TaskListComponent,
        TaskSupport,
        UuidIdService
      ]
    });

    datePipe = TestBed.inject(DatePipe);
    taskSupport = new TaskSupport(datePipe);
    scholarshipSupport = new ScholarshipSupport(datePipe, taskSupport);
    sponsorService = TestBed.inject(SponsorService);

    fixture = TestBed.createComponent(ScholarshipEditComponent);
    component = fixture.componentInstance;

    elements = new ScholarshipEditSpecPage(fixture);
  });

  it('should properly identify checkbox checked using dom-utils', () => {
    let sponsor = new SponsorRandomBuilder().build();

    let scholarship = new ScholarshipRandomBuilder().build({
      sponsorId: sponsor.id,
      tasks: []
    } as Scholarship);
    let expectedScholarshipView = scholarshipSupport.toScholarshipView(scholarship);

    component.scholarshipDetails = expectedScholarshipView;
    component.showScholarshipEditForm = true;
    component.showTaskDashboard = false;

    component.scholarshipDetails.submitted = true;
    fixture.detectChanges();
    expect(elements.submitted.input.checked).toBeTrue();
  });

  it('should properly identify checkbox unchecked using dom-utils', () => {
    let sponsor = new SponsorRandomBuilder().build();

    let scholarship = new ScholarshipRandomBuilder().build({
      sponsorId: sponsor.id,
      tasks: []
    } as Scholarship);
    let expectedScholarshipView = scholarshipSupport.toScholarshipView(scholarship);

    component.scholarshipDetails = expectedScholarshipView;
    component.showScholarshipEditForm = true;
    component.showTaskDashboard = false;

    component.scholarshipDetails.submitted = false;
    fixture.detectChanges();
    expect(elements.submitted.input.checked).toBeFalse();
  });

  it('should populate the form with component values', waitForAsync(() => {
    let sponsor = new SponsorRandomBuilder().build();
    spyOn(sponsorService, 'find').and.returnValue(of(sponsor));
    spyOn(sponsorService, 'getAllSorted').and.returnValue(of([sponsor]));

    let scholarship = new ScholarshipRandomBuilder().build({
      sponsorId: sponsor.id,
      tasks: []
    } as Scholarship);
    let expectedScholarshipView = scholarshipSupport.toScholarshipView(scholarship);

    component.scholarshipDetails = expectedScholarshipView;
    component.showScholarshipEditForm = true;
    component.showTaskDashboard = false;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(elements.scholarshipName.input.value).toBe(component.scholarshipDetails.scholarshipName);
      expect(elements.scholarshipCode.input.value).toBe(component.scholarshipDetails.code);
      expect(elements.targetAmount.input.value).toBe(component.scholarshipDetails.targetAmount?.toString());

      // TODO - check sponsorId
      // TODO - check webpage
      // TODO - check deadlineDate
      // TODO - check submitDate
      // TODO - check submitted
      expect(elements.submitted.input.checked).toBe(component.scholarshipDetails.submitted);

      expect(elements.minimumGpa.input.value).toBe(component.scholarshipDetails.minimumGpa);
      expect(elements.contactInfo.input.value).toBe(component.scholarshipDetails.contactInfo);
      expect(elements.contactPhone.input.value).toBe(component.scholarshipDetails.contactPhone);

      // TODO - check contactEmail
    })
  }));

});
