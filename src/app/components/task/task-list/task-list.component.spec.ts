import { TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../../services/task-service';

describe('task-list component', () => {

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
    const fixture = TestBed.createComponent(TaskListComponent);

    fixture.detectChanges();

    expect(true).toBe(false);
  });

});
