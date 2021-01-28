import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  protected errorDetail: any;
  protected pageNum: number;

  constructor(protected scholarshipService: ScholarshipService) { }

  public ngOnInit() {
    this.pageNum = 0;
  }

  public editRecord(recordId: string) {
    // console.log(recordId);
    // this.taskService.find(recordId).pipe(
    //   map(scholarshipTaskView => {
    //     console.log('taskId: ' + recordId + ' => ' + JSON.stringify(scholarshipTaskView));
    //   })
    // );
    // //.unsubscribe();

    // this.selectedTask.emit(recordId);
  }
}
