import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { ScholarshipView } from 'src/app/models/views/scholarship-view';
import { Task } from '../../../models/task';
import { TaskChangeEvent } from '../task-edit/task-edit.component';

@Component({
  selector: 'task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  @Input()
  public parentForm: FormGroup;

  @Input()
  public gridData: Task[];
  public errorDetail: any;

  public selectedTask: Task;
  public showEditForm: boolean = false;

  constructor() {
  }

  public ngOnInit(): void {
    console.log(`TaskDashboardComponent => gridData: ${this.gridData?.length || -1}`);
  }

  public onNewTask() {
    this.onSelectedTask(undefined);
  }

  public onSelectedTask(selectedTaskId: string) {
    console.log(`onSelectedTask: ${selectedTaskId}`);
    if (selectedTaskId === undefined || this.showEditForm === undefined) {
      this.selectedTask = undefined;
      this.showEditForm = true;
    }
    else {
      console.log(`onSelectedTask: ${selectedTaskId}`);
      this.selectedTask = this.gridData[selectedTaskId];
      this.showEditForm = true;
    }
  }

  public onCloseEdit(event: TaskChangeEvent) {
    this.showEditForm = false;
    if (event?.newEntry && event?.taskChanges !== undefined) {
        this.gridData.push(event.taskChanges);
    }
    this.ngOnInit();
  }
}
