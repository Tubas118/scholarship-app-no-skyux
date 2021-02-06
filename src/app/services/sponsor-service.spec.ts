// import { TestBed } from '@angular/core/testing';
// import { SponsorService } from '../services/sponsor-service';
// import { SharedServicesModule } from 'src/shared/services/shared-services.module';
// import { UuidIdService } from 'src/shared/services/uuid-id-service';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Sponsor } from '../models/sponsor';
// import { of } from 'core-js/fn/array';
// import { Observable } from 'rxjs';
// import { randomTestData } from 'src/shared/test-utils/random-test-data';

// let unroll = require('unroll');
// unroll.use(it);

// describe('sponsor-service', () => {
//   let spyHttpClient = jasmine.createSpyObj('HttpClient', ['post', 'put', 'get']);
//   let spyIdService = jasmine.createSpyObj('UuidIdService', ['newId']);
//   let sponsorService: SponsorService;
//   let config: SkyAppConfig = {
//     skyux: {
//       appSettings: {
//       }
//     }
//   } as SkyAppConfig;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         SkyAppTestModule,
//         SharedServicesModule
//       ],
//       providers: [
//         SkyAppConfig,
//         { provide: UuidIdService, useValue: spyIdService },
//         { provide: HttpClient, useValue: spyHttpClient }
//       ]
//     });

//     sponsorService = new SponsorService(spyHttpClient, config, spyIdService);
//   });

//   describe('add method', () => {
//     it('should add record', () => {
//       let expectedSponsor = new SponsorRandomBuilder().build();
//       spyIdService.newId.and.returnValue(expectedSponsor.id);
//       let newSponsor = {
//         // username: expectedUser.username,
//         // firstname: expectedUser.firstname,
//         // lastname: expectedUser.lastname,
//         id: undefined
//       } as Sponsor;

//       spyHttpClient.post.and.returnValue(of(expectedSponsor));

//       let response: Observable<Sponsor> = sponsorService.add(newSponsor);
//       response.subscribe(responseSponsor => {
//         expect(responseSponsor).toBe(expectedSponsor);
//       });
//     });

//     it('should throw error when attempting to insert record that already has an id', () => {
//       let newSponsor = new SponsorRandomBuilder().build();
//       spyHttpClient.post.and.returnValue(of(newSponsor));

//       expect(() => sponsorService.add(newSponsor)).toThrow();
//     });
//   });

//   describe('update method', () => {
//     it('should successfully update an existing record', () => {
//       let existingSponsor = new SponsorRandomBuilder().build();
//       let updatedSponsor = {
//         // username: randomTestData.text(),
//         // firstname: randomTestData.text(),
//         // lastname: randomTestData.text(),
//         id: existingSponsor.id
//       };
//       spyHttpClient.put.and.returnValue(of(updatedSponsor));

//       let response: Observable<Sponsor> = sponsorService.update(updatedSponsor);
//       response.subscribe(responseSponsor => {
//         expect(responseSponsor).toBe(updatedSponsor);
//       });
//     });

//     unroll('should throw error for trying to update record #description', (done: any, testArgs: any) => {
//       let missingSponsor = new SponsorRandomBuilder().build();
//       missingSponsor.id = testArgs['id'];

//       // TODO is this the correct way to mock a 404 from http client
//       let httpResponse = new HttpErrorResponse({ status: 404, statusText: 'Not found' });
//       spyHttpClient.put.and.returnValue(httpResponse);

//       expect(() => sponsorService.update(missingSponsor)).toThrow();
//       done();
//     }, [
//       [ 'id'                 , 'description' ],
//       [ randomTestData.uuid(), 'that doesn\'t exist' ],
//       [ undefined            , 'with undefined id' ]
//     ]);
//   });
