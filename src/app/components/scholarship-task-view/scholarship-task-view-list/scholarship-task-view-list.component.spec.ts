import { TestBed } from '@angular/core/testing';
import { ScholarshipTaskViewListComponent } from './scholarship-task-view-list.component';

describe('scholarship-task-view-list component', () => {

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
    const fixture = TestBed.createComponent(ScholarshipTaskViewListComponent);

    fixture.detectChanges();

    expect(true).toBe(false);
  });

});
