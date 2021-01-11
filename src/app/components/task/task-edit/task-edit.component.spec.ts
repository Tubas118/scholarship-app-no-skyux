import { TestBed } from '@angular/core/testing';
import { TaskEditComponent } from './task-edit.component';
import { TaskService } from '../../../services/task-service';

const unroll = require('unroll');
unroll.use(it);

describe('task-edit component', () => {

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
    const fixture = TestBed.createComponent(TaskEditComponent);

    fixture.detectChanges();

    expect(true).toBe(false);
  });

});
