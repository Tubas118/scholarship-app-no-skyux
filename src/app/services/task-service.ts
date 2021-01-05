import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BasicServiceImpl } from 'src/shared/basic/basic-service-impl';
import { HttpClient } from '@angular/common/http';
import { UuidIdService } from 'src/shared/services/uuid-id-service';
import { AppConfigService } from 'src/shared/services/app-config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BasicServiceImpl<Task, string> {
  constructor(protected http: HttpClient,
    protected configService: AppConfigService,
    protected idService: UuidIdService) {
      super(http, configService, 'tasks', idService);
  }

  protected dataPreProcessing(data: Task): void {
    // Leave method even if no pre-processing needed.
  }
}
