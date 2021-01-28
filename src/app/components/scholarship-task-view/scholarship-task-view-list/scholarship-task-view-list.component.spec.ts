// import { HttpClient } from '@angular/common/http';
// import { TestBed } from '@angular/core/testing';
// import { ScholarshipService } from 'src/app/services/scholarship-service';
// import { AppConfigSettings } from 'src/shared/basic/basic-service-impl';
// import { AppConfigService } from 'src/shared/services/app-config/app-config.service';
// import { SharedServicesModule } from 'src/shared/services/shared-services.module';
// import { UuidIdService } from 'src/shared/services/uuid-id-service';
// import { ScholarshipTaskViewListComponent } from './scholarship-task-view-list.component';

// describe('scholarship-task-view-list component', () => {
//   let spyHttpClient = jasmine.createSpyObj('HttpClient', ['post', 'put', 'get']);
//   let spyIdService = jasmine.createSpyObj('UuidIdService', ['newId']);
//   let spyScholarshipService = jasmine.createSpyObj('ScholarshipService', []);

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
//         { provide: ScholarshipService, useValue: spyScholarshipService }
//       ]
//     });

//     //taskService = new ScholarshipTaskViewEditComponent(spyHttpClient, appConfigService, spyIdService);
//   });

//   it('should do something', () => {
//     const fixture = TestBed.createComponent(ScholarshipTaskViewListComponent);

//     fixture.detectChanges();

//     expect(true).toBe(false);
//   });

// });
