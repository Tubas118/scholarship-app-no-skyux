import { TestBed } from '@angular/core/testing';
import { TaskDashboardComponent } from './task-dashboard.component';

describe('task-dashboard component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: []
      /*
      TODO: what do you want?
      providers: [
        {
          provide: TaskService,
          useValue: jasmine.createSpyObj('TaskService', ['getAll'])
        }
      ]
      */
    });
  });

  it('should do something', () => {
    const fixture = TestBed.createComponent(TaskDashboardComponent);

    fixture.detectChanges();

    expect(true).toBe(false);
  });

});
