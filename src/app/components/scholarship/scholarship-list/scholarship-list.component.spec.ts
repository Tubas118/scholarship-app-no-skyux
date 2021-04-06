import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ScholarshipListComponent } from './scholarship-list.component';
import { ScholarshipListSpecPage } from './fixtures/scholarship-list.spec-page';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Scholarship } from 'src/app/models/scholarship';
import { ScholarshipRandomBuilder } from 'src/app/models/model-support/scholarship-random-builder';
import { randomData } from 'src/shared/shared-data-utils';
import { ScholarshipView } from 'src/app/models/views/scholarship-view';
import { of } from 'rxjs';
import { HttpLoaderFactory } from 'src/shared/components/shared-components-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyValueComponent } from 'src/lib/components/key-value/key-value.component';
import { ScholarshipSupport } from 'src/app/models/model-support/scholarship-support';
import { TaskSupport } from 'src/app/models/model-support/task-support';

describe('scholarship-list component', () => {
  let fixture: ComponentFixture<ScholarshipListComponent>;
  let component: ScholarshipListComponent;
  let elements: ScholarshipListSpecPage;
  let currencyPipe: CurrencyPipe;
  let datePipe: DatePipe;
  let scholarshipSupport: ScholarshipSupport;
  let taskSupport: TaskSupport;
  let translate: TranslateService;
  let scholarshipViews: ScholarshipView[];
  let selectedScholarshipIdEmitted: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
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
        KeyValueComponent,
        ScholarshipListComponent
      ],
      providers: [
        CurrencyPipe,
        DatePipe,
        ScholarshipSupport,
        TaskSupport,
        TranslateService
      ]
    });

    datePipe = TestBed.inject(DatePipe);
    taskSupport = new TaskSupport(datePipe);
    scholarshipSupport = new ScholarshipSupport(datePipe, taskSupport);
    translate = TestBed.inject(TranslateService);

    const scholarships: Scholarship[] = randomData.itemList(10, () => new ScholarshipRandomBuilder().build());
    scholarshipViews = [];

    scholarships.forEach(scholarship => {
      appendScholarship(scholarship);
    });

    fixture = TestBed.createComponent(ScholarshipListComponent);
    elements = new ScholarshipListSpecPage(fixture);
    currencyPipe = TestBed.inject(CurrencyPipe);
    component = fixture.componentInstance;
    component.translate = translate;

    selectedScholarshipIdEmitted = undefined;
    component.selectedScholarship.subscribe(selectedScholarshipId => {
      selectedScholarshipIdEmitted = selectedScholarshipId;
    })
  });

  it('should populate the scholarship view', () => {
    // Given
    let elementDebugRows = elements.allScholarshipRows.debugElements;
    expect(elementDebugRows.length).toEqual(0);

    // When
    component.scholarshipGridData = of(scholarshipViews);
    fixture.detectChanges();

    // Then
    elementDebugRows = elements.allScholarshipRows.debugElements;
    expect(elementDebugRows.length).toBe(scholarshipViews.length);

    let rows = elements.allScholarshipRows.elements;
    expect(rows.length).toBe(scholarshipViews.length);
    rows.forEach((row, idx) => {
      expectScholarshipMatch(row, scholarshipViews[idx]);
    });
  });

  it ('should properly display scholarships with no tasks', () => {
    // Given
    scholarshipViews = [];

    const expectedScholarship = new ScholarshipRandomBuilder().build({
      tasks: []
    } as Scholarship);
    appendScholarship(expectedScholarship);

    // When
    component.scholarshipGridData = of(scholarshipViews);
    fixture.detectChanges();

    // Then
    let debugRows = elements.allScholarshipRows.debugElements;
    expect(debugRows.length).toBe(1);

    let rows = elements.allScholarshipRows.elements;
    expect(rows.length).toBe(1);

    expectScholarshipMatch(rows[0], scholarshipViews[0]);
  });

  it ('should properly display scholarships where optional values are undefined', () => {
    // Given
    scholarshipViews = [];

    const expectedScholarship = new ScholarshipRandomBuilder()
      .assignUndefinedToOptionalValues()
      .build();
    appendScholarship(expectedScholarship);

    // When
    component.scholarshipGridData = of(scholarshipViews);
    fixture.detectChanges();

    // Then
    let rows = elements.allScholarshipRows.elements;
    expect(rows.length).toBe(1);

    let row = rows[0];
    expect(elements.scholarshipCode.element(row)?.textContent).toBe('');
    // Submit date not on page
    expect(elements.scholarshipPriority.element(row)?.textContent).toBeFalsy();
    expect(elements.scholarshipDeadlineDate.element(row)?.textContent).toBeFalsy();
    expect(elements.scholarshipTargetAmount.element(row)?.textContent).toBeFalsy();
    // Awarded amount not on page
    // Submitted flag not on page
    // Membership required flag not on page
    // Qualified flag not on page
    // Previously applied flag not on page
    // Previously awarded flag not on page
  })

  it('should properly display scholarships where optional values are defined', () => {
    // Given
    scholarshipViews = [];

    const expectedScholarship = new ScholarshipRandomBuilder()
      .assignNoUndefinedOptionalValues()
      .build();

    appendScholarship(expectedScholarship);

    expect(expectedScholarship.code).toBeTruthy();
    expect(expectedScholarship.submitDate).toBeTruthy();
    expect(expectedScholarship.priority).toBeTruthy();
    expect(expectedScholarship.deadlineDate).toBeTruthy();
    expect(expectedScholarship.targetAmount).toBeTruthy();
    expect(expectedScholarship.awardedAmount).toBeTruthy();
    expect(expectedScholarship.submitted).toBeTruthy();
    expect(expectedScholarship.membershipRequired).toBeTruthy();
    expect(expectedScholarship.qualified).toBeTruthy();
    expect(expectedScholarship.previouslyApplied).toBeTruthy();
    expect(expectedScholarship.previouslyAwarded).toBeTruthy();

    // When
    component.scholarshipGridData = of(scholarshipViews);
    fixture.detectChanges();

    // Then
    let rows = elements.allScholarshipRows.elements;
    expect(rows.length).toBe(1);
    expectScholarshipMatch(rows[0], scholarshipViews[0]);
  })

  it ('should fire click event for web link', fakeAsync(() => {
    // Given
    // TODO - cranky in attempt to call sanitize - const safeUrlString = sanitizer.sanitize(SecurityContext.URL, '#fake-site');
    const expectedWebsite = new URL('#fake-site');
    scholarshipViews[0].webpage = expectedWebsite;

    component.scholarshipGridData = of(scholarshipViews);
    fixture.detectChanges();

    const firstRowElement = elements.allScholarshipRows.firstElement;
    const linkElement = elements.scholarshipWebsite.element(firstRowElement);

    // NOTE: if looking in browser console, it complains that it failed to launch.
    //  This is okay because we don't want new tab opening during test.
    linkElement.target = '';
    expect(linkElement.textContent).toBe(expectedWebsite.toString());

    const expectedOnUrlClickedCount = component.getOnUrlClickedCount() + 1;

    // When
    linkElement.click();
    tick();

    // Then
    expect(component.getOnUrlClickedCount()).toBe(expectedOnUrlClickedCount);
  }))

  it ('should emit scholarship id for editing when row clicked', waitForAsync(() => {
    // Given
    component.scholarshipGridData = of(scholarshipViews);
    fixture.detectChanges();

    const firstRowElement = elements.allScholarshipRows.firstElement;
    expect(selectedScholarshipIdEmitted).toBeUndefined();

    // When
    firstRowElement.click();
    fixture.detectChanges();

    // Then
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(selectedScholarshipIdEmitted).toBe(scholarshipViews[0].id);
    })
  }))

  function appendScholarship(scholarship: Scholarship) {
    scholarshipViews.push(scholarshipSupport.toScholarshipView(scholarship));
  }

  function expectScholarshipMatch(elementRow: HTMLElement, expectedScholarship: ScholarshipView) {
    expect(elements.scholarshipName.element(elementRow)?.textContent).toBe(expectedScholarship.scholarshipName);

    const expectedDeadlineDate = (expectedScholarship.tasks?.length === 0) ? undefined : expectedScholarship.deadlineDate;
    expect(elements.scholarshipDeadlineDate.element(elementRow)?.textContent).toEqual(expectedDeadlineDate?.toString());
    expect(elements.scholarshipCode.element(elementRow)?.textContent).toBe(expectedScholarship.code);
    expect(elements.scholarshipTargetAmount.element(elementRow)?.textContent).toBe(currencyPipe.transform(expectedScholarship.targetAmount?.toString()));

    const openTasks = elements.scholarshipOpenTasks.element(elementRow);
    const totalTasks = elements.scholarshipTotalTasks.element(elementRow);
    const expectedOpenTasks = (expectedScholarship.openTasks?.length.toString() || '0');
    const expectedTotalTasks = (expectedScholarship.tasks?.length.toString() || '0');

    expect(openTasks.textContent).toEqual(expectedOpenTasks);
    expect(totalTasks.textContent).toEqual(expectedTotalTasks);
  }
});
