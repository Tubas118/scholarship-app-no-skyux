import { TestBed } from '@angular/core/testing';
import { ScholarshipTaskViewDashboardComponent } from './scholarship-task-view-dashboard.component';

describe('scholarship-task-view-dashboard component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: []
      /*
      TODO: what do you want?
      providers: [
        {
          provide: ScholarshipTaskViewService,
          useValue: jasmine.createSpyObj('ScholarshipTaskViewService', ['getAll'])
        }
      ]
      */
    });
  });

  it('should do something', () => {
    const fixture = TestBed.createComponent(ScholarshipTaskViewDashboardComponent);

    fixture.detectChanges();

    expect(true).toBe(false);
  });

});
