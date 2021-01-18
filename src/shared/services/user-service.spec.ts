// import { TestBed } from '@angular/core/testing';
// import { UserService } from './user-service';
// import { SharedServicesModule } from './shared-services.module';
// import { Observable, of } from 'rxjs';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { UuidIdService } from './uuid-id-service';
// import { randomTestData } from '../test-utils/random-test-data';
// import { copyData } from '../shared-data-utils';
// import { LoginDetails } from '../models/login-details';
// import { AppConfigSettings } from '../basic/basic-service-impl';
// import { AppConfigService } from './app-config/app-config.service';

// const unroll = require('unroll');
// unroll.use(it);

// describe('User service', () => {
//   const spyHttpClient = jasmine.createSpyObj('HttpClient', ['post', 'put', 'get']);
//   const spyIdService = jasmine.createSpyObj('UuidIdService', ['newId']);
//   let userService: UserService;
//   const configSettings: AppConfigSettings = {
//     apiUrl: 'some-url',
//     pageSize: 20
//   } as AppConfigSettings;
//   const config: AppConfigService = {
//     appConfigSettings: configSettings
//   } as AppConfigService;

//   /**
//    * This configureTestingModule function imports SkyAppTestModule, which brings in all of
//    * the SKY UX modules and components in your application for testing convenience. If this has
//    * an adverse effect on your test performance, you can individually bring in each of your app
//    * components and the SKY UX modules that those components rely upon.
//    */
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         SharedServicesModule
//       ],
//       providers: [
//         { provide: UuidIdService, useValue: spyIdService },
//         { provide: HttpClient, useValue: spyHttpClient }
//       ]
//     });

//     userService = new UserService(spyHttpClient, config, spyIdService);
//   });

//   describe('add method', () => {
//     it('should add record', () => {
//       const expectedUser = randomTestData.user();
//       spyIdService.newId.and.returnValue(expectedUser.id);
//       const newUser = copyData(expectedUser, { id: undefined });
//       spyHttpClient.post.and.returnValue(of(expectedUser));

//       const response: Observable<LoginDetails> = userService.add(newUser);
//       response.subscribe(responseUser => {
//         expect(responseUser).toBe(expectedUser);
//       });
//     });

//     // TODO: why did I make it possible to add a user when an id was already assigned?
//     // it('should throw error when attempting to insert record that already has an id', () => {
//     //   const newUser = randomTestData.user();
//     //   spyHttpClient.post.and.returnValue(of(newUser));

//     //   expect(() => userService.add(newUser)).toThrow();
//     // });
//   });

//   describe('update method', () => {
//     it('should successfully update an existing record', () => {
//       const existingUser = randomTestData.user();
//       const updatedUser = randomTestData.user({ id: existingUser.id });
//       spyHttpClient.put.and.returnValue(of(updatedUser));

//       const response: Observable<LoginDetails> = userService.update(updatedUser);
//       response.subscribe(responseUser => {
//         expect(responseUser).toBe(updatedUser);
//       });
//     });

//     unroll('should throw error for trying to update record #description', (done: any, testArgs: any) => {
//       const missingUser = randomTestData.user();
//       missingUser.id = testArgs['id'];

//       // TODO is this the correct way to mock a 404 from http client
//       const httpResponse = new HttpErrorResponse({ status: 404, statusText: 'Not found' });
//       spyHttpClient.put.and.returnValue(httpResponse);

//       expect(() => userService.update(missingUser)).toThrow();
//       done();
//     }, [
//       [ 'id'                 , 'description' ],
//       [ randomTestData.uuid(), 'that doesn\'t exist' ],
//       [ undefined            , 'with undefined id' ]
//     ]);
//   });
// });
