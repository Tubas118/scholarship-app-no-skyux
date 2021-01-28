// import { TestBed } from '@angular/core/testing';
// import { TaskService } from '../services/task-service';
// import { SharedServicesModule } from 'src/shared/services/shared-services.module';
// import { UuidIdService } from 'src/shared/services/uuid-id-service';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Task } from '../models/task';
// import { Observable, of } from 'rxjs';
// import { randomTestData } from 'src/shared/test-utils/random-test-data';
// import { ScholarshipService } from './scholarship-service';
// import { AppConfigService } from 'src/shared/services/app-config/app-config.service';
// import { TaskRandomBuilder } from '../models/task-random-builder';
// import { AppConfigSettings } from 'src/shared/basic/basic-service-impl';

// let unroll = require('unroll');
// unroll.use(it);

// describe('task-service', () => {
//   let spyHttpClient = jasmine.createSpyObj('HttpClient', ['post', 'put', 'get']);
//   let spyIdService = jasmine.createSpyObj('UuidIdService', ['newId']);
//   let taskService: TaskService;

//   let appConfigService = new AppConfigService(spyHttpClient);
//   appConfigService.appConfigSettings = {
//     apiUrl: 'http://json-server-svc-dev:3000',
//     pageSize: 20
//   } as AppConfigSettings;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         SharedServicesModule
//       ],
//       providers: [
//         { provide: UuidIdService, useValue: spyIdService },
//         { provide: HttpClient, useValue: spyHttpClient },
//         ScholarshipService
//       ]
//     });

//     taskService = new TaskService(spyHttpClient, appConfigService, spyIdService);
//   });

//   describe('add method', () => {
//     it('should add record', () => {
//       let expectedTask = new TaskRandomBuilder().build();
//       spyIdService.newId.and.returnValue(expectedTask.id);
//       let newTask = {
//         // username: expectedUser.username,
//         // firstname: expectedUser.firstname,
//         // lastname: expectedUser.lastname,
//         id: undefined
//       } as Task;

//       spyHttpClient.post.and.returnValue(of(expectedTask));

//       let response: Observable<Task> = taskService.add(newTask);
//       response.subscribe(responseTask => {
//         expect(responseTask).toBe(expectedTask);
//       });
//     });

//     it('should throw error when attempting to insert record that already has an id', () => {
//       let newTask = new TaskRandomBuilder().build();
//       spyHttpClient.post.and.returnValue(of(newTask));

//       expect(() => taskService.add(newTask)).toThrow();
//     });
//   });

//   describe('update method', () => {
//     it('should successfully update an existing record', () => {
//       let updatedTask: Task = new TaskRandomBuilder().build();
//       spyHttpClient.put.and.returnValue(of(updatedTask));

//       let response: Observable<Task> = taskService.update(updatedTask);
//       response.subscribe(responseTask => {
//         expect(responseTask).toBe(updatedTask);
//       });
//     });

//     unroll('should throw error for trying to update record #description', (done: any, testArgs: any) => {
//       let missingTask = new TaskRandomBuilder().build();
//       missingTask.id = testArgs['id'];

//       // TODO is this the correct way to mock a 404 from http client
//       let httpResponse = new HttpErrorResponse({ status: 404, statusText: 'Not found' });
//       spyHttpClient.put.and.returnValue(httpResponse);

//       expect(() => taskService.update(missingTask)).toThrow();
//       done();
//     }, [
//       [ 'id'                 , 'description' ],
//       [ randomTestData.uuid(), 'that doesn\'t exist' ],
//       [ undefined            , 'with undefined id' ]
//     ]);
//   });
// });
