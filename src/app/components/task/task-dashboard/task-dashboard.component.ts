import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Task } from '../../../models/task';
import { TaskService } from '../../../services/task-service';
import { TaskChangeEvent } from '../task-change-event';

@Component({
  selector: 'task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  public gridData: Observable<Task[]>;
  public errorDetail: any;

  public selectedTask: Task;
  public showEditForm: boolean = false;

  constructor(private taskService: TaskService) {
  }

  public ngOnInit(): void {
    this.taskService.getAll()
      .subscribe((records: Task[]) => {
        this.gridData = of(records);
      },
      err => {
        console.error('Error ' + err);
        this.errorDetail = err;
      });
  }

  public onNewTask() {
    this.onSelectedTask(undefined);
  }

  public onSelectedTask(selectedTaskId: string) {
    if (selectedTaskId === undefined) {
      this.selectedTask = undefined;
      this.showEditForm = true;
    } else {
      this.taskService.find(selectedTaskId).subscribe(task => {
        this.selectedTask = task;
        this.showEditForm = true;
      });
    }
  }

  public onCloseEdit(event: TaskChangeEvent) {
    this.showEditForm = false;
    if (event !== undefined) {
      this.ngOnInit();
    }
  }
}
