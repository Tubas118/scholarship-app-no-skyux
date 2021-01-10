import { TestBed } from '@angular/core/testing';
import { ScholarshipTaskViewEditComponent } from './scholarship-task-view-edit.component';

describe('scholarship-task-view-edit component', () => {

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
    const fixture = TestBed.createComponent(ScholarshipTaskViewEditComponent);

    fixture.detectChanges();

    expect(true).toBe(false);
  });

});
