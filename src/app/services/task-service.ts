// import { Injectable } from '@angular/core';
// import { Task } from '../models/task';
// import { BasicServiceImpl } from 'src/shared/basic/basic-service-impl';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { UuidIdService } from 'src/shared/services/uuid-id-service';
// import { AppConfigService } from 'src/shared/services/app-config/app-config.service';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService extends BasicServiceImpl<Task, string> {
//   constructor(protected http: HttpClient,
//     protected configService: AppConfigService,
//     protected idService: UuidIdService) {
//       super(http, configService, 'tasks', idService);
//   }

//   protected dataPreProcessing(data: Task): void {
//     // Leave method even if no pre-processing needed.
//   }

//   public findTasksByScholarshipId(scholarshipId: string): Observable<Task[]> {
//     console.log(`findTasksByScholarshipId; ${scholarshipId}`);
//     const filter = `?scholarshipId=${scholarshipId}`;
//     return this.getAll(filter);
//   }

//   // public findTasksByScholarshipId(scholarshipId: string): Observable<Task[]> {
//   //   if (scholarshipId !== undefined) {
//   //     return this.http
//   //       .get<Task[]>(`${this.apiUrl}?scholarshipsId=${scholarshipId}`)
//   //       .pipe(catchError(this.handleError));
//   //   }
//   //   throwError(new HttpErrorResponse({ status: HttpStatusCodes.C400_BAD_REQUEST}));
//   // }

//   // public findScholarshipTaskViewByTaskId(taskId: string): Observable<ScholarshipTaskView> {
//   //   return this.find(taskId).pipe(
//   //     mergeMap(task => {
//   //       return this.scholarshipService.find(task.scholarshipId).pipe(
//   //         map(scholarship => {
//   //           console.log(`findScholarshipTaskViewByTaskId: ${scholarship}`)
//   //           return {task: task, scholarship: scholarship}
//   //         })
//   //       )
//   //     }),
//   //     map(({task, scholarship}) => {
//   //       return this.joinTaskAndScholarship(task, scholarship);
//   //     })
//   //   )
//   // }

//   // public findScholarshipTaskViewByTask(task: Task): Observable<ScholarshipTaskView> {
//   //   console.log('findScholarshipTaskViewByTask - start - scholarshipId=' + task.scholarshipId);
//   //   return this.scholarshipService.find(task.scholarshipId).pipe(
//   //     take(1),
//   //     map(scholarship => {
//   //       console.log('findScholarshipTaskViewByTask - before');
//   //       return this.joinTaskAndScholarship(task, scholarship);
//   //     })
//   //   );
//   // }

//   // protected joinTaskAndScholarship(task: Task, scholarship: Scholarship): ScholarshipTaskView {
//   //   return {
//   //     ...task,
//   //     scholarshipName: scholarship.scholarshipName,
//   //     sponsor: scholarship.sponsor
//   //   } as ScholarshipTaskView;
//   // }
// }
