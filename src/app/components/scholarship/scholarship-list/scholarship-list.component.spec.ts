import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScholarshipListComponent } from './scholarship-list.component';
import { ScholarshipListSpecPage } from './fixtures/scholarship-list.spec-page';
import { CommonModule, DatePipe } from '@angular/common';
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

describe('scholarship-list component', () => {
  let fixture: ComponentFixture<ScholarshipListComponent>;
  let component: ScholarshipListComponent;
  let elements: ScholarshipListSpecPage;
  let translate: TranslateService;
  let scholarshipViews: ScholarshipView[];

  beforeEach(() => {
    const scholarships: Scholarship[] = randomData.itemList(10, () => new ScholarshipRandomBuilder().build());
    scholarshipViews = [];

    scholarships.forEach(scholarship => {
      appendScholarship(scholarship);
    });

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
        DatePipe,
        TranslateService
      ]
    });

    translate = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(ScholarshipListComponent);
    elements = new ScholarshipListSpecPage(fixture);
    component = fixture.componentInstance;
    component.translate = translate;
  });

  it('should populate the scholarship view', () => {
    // Given
    let elementDebugRows = elements.allScholarshipDebugRows;
    expect(elementDebugRows.length).toEqual(0);

    // When
    component.scholarshipGridData = of(scholarshipViews);
    fixture.detectChanges();

    // Then
    elementDebugRows = elements.allScholarshipDebugRows;
    expect(elementDebugRows.length).toBe(scholarshipViews.length);

    let rows = elements.allScholarshipRows;
    expect(rows.length).toBe(scholarshipViews.length);
    rows.forEach((row, idx) => {
      expectScholarshipMatch(row, scholarshipViews[idx]);
    });
  });

  it ('should properly display scholarships with no tasks', () => {
    // Given
    scholarshipViews = [];

    appendScholarship({
      ...(new ScholarshipRandomBuilder().build()),
      tasks: []
    });

    // When
    component.scholarshipGridData = of(scholarshipViews);
    fixture.detectChanges();

    // Then
    let rows = elements.allScholarshipRows;
    expect(rows.length).toBe(1);

    expectScholarshipMatch(rows[0], scholarshipViews[0]);
  });

  function appendScholarship(scholarship: Scholarship) {
    scholarshipViews.push({
      ...scholarship
    } as ScholarshipView);
  }

  function expectScholarshipMatch(elementRow: HTMLElement, expectedScholarship: ScholarshipView) {
    expect(elements.scholarshipName(elementRow).textContent).toBe(expectedScholarship.scholarshipName);

    const openTasks = elements.scholarshipOpenTasks(elementRow);
    const totalTasks = elements.scholarshipTotalTasks(elementRow);
    const expectedOpenTasks = (expectedScholarship.openTasks?.length.toString() || '0');
    const expectedTotalTasks = (expectedScholarship.tasks?.length.toString() || '0');

    expect(openTasks.textContent).toEqual(expectedOpenTasks);
    expect(totalTasks.textContent).toEqual(expectedTotalTasks);
  }
});
