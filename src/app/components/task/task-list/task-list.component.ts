import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ScholarshipService } from 'src/app/services/scholarship-service';
import { Task } from '../../../models/task';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['../../../../assets/scss/grid.scss', './task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  @Input()
  public gridData: Observable<Task[]>;

  @Output()
  public selectedTask: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public templateTasksEvent: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public invalidateTasksEvent: EventEmitter<string> = new EventEmitter<string>();

  protected errorDetail: any;
  protected pageNum: number;

  constructor(protected scholarshipService: ScholarshipService) { }

  public ngOnInit() {
    this.pageNum = 0;
  }

  public editTask(recordId: string) {
    this.selectedTask.emit(recordId);
  }

  public getCheckedValue(flag: boolean) {
    return flag ? 'checked' : '';
  }

  public onAddTemplateTasks() {
    console.log(`TaskListComponent - onAddTemplateTasks`);
    this.templateTasksEvent.emit('add template tasks');
  }

  public onInvalidateTasks() {
    console.log(`TaskListComponent - onInvalidateTasks`);
    this.invalidateTasksEvent.emit('invalidate tasks');
  }
}
