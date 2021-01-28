import { TestBed } from '@angular/core/testing';
import { SharedServicesModule } from 'src/shared/services/shared-services.module';
import { UuidIdService } from 'src/shared/services/uuid-id-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { randomTestData } from 'src/shared/test-utils/random-test-data';
import { AppConfigService } from 'src/shared/services/app-config/app-config.service';
import { AppConfigSettings } from 'src/shared/basic/basic-service-impl';
import { ScholarshipService } from './scholarship-service';
import { ScholarshipRandomBuilder } from '../models/scholarship-random-builder';
import { Scholarship } from '../models/scholarship';

let unroll = require('unroll');
unroll.use(it);

describe('scholarship-service', () => {
  let spyHttpClient = jasmine.createSpyObj('HttpClient', ['post', 'put', 'get']);
  let spyIdService = jasmine.createSpyObj('UuidIdService', ['newId']);
  let scholarshipService: ScholarshipService;

  let mockedScholarships: Scholarship[] = [
    new ScholarshipRandomBuilder().build(),
    new ScholarshipRandomBuilder().build(),
    new ScholarshipRandomBuilder().build()
  ];
  spyHttpClient.get.and.returnValue(of(mockedScholarships));

  let appConfigService = new AppConfigService(spyHttpClient);
  appConfigService.appConfigSettings = {
    apiUrl: 'http://json-server-svc-dev:3000',
    pageSize: 20
  } as AppConfigSettings;

  beforeEach(() => {
    console.log(`beforeEach started`);
    TestBed.configureTestingModule({
      imports: [
        SharedServicesModule
      ],
      providers: [
        { provide: UuidIdService, useValue: spyIdService },
        { provide: HttpClient, useValue: spyHttpClient }
      ]
    });

    scholarshipService = new ScholarshipService(spyHttpClient, appConfigService, spyIdService);
    console.log(`ScholarshipService exists? ${scholarshipService !== undefined}`);
  });

  describe('add method', () => {
    it('should add record', () => {
      let expectedScholarship = new ScholarshipRandomBuilder().build();
      spyIdService.newId.and.returnValue(expectedScholarship.id);
      let newScholarship = {
        // username: expectedUser.username,
        // firstname: expectedUser.firstname,
        // lastname: expectedUser.lastname,
        id: undefined
      } as Scholarship;

      spyHttpClient.post.and.returnValue(of(expectedScholarship));

      console.log(`ScholarshipService exists? ${scholarshipService !== undefined}`);
      let response: Observable<Scholarship> = scholarshipService.add(newScholarship);
      response.subscribe(responseScholarship => {
        expect(responseScholarship).toBe(expectedScholarship);
      });
    });

    it('should throw error when attempting to insert record that already has an id', () => {
      let newScholarship = new ScholarshipRandomBuilder().build();
      spyHttpClient.post.and.returnValue(of(newScholarship));

      expect(() => scholarshipService.add(newScholarship)).toThrow();
    });
  });

  describe('update method', () => {
    it('should successfully update an existing record', () => {
      let updatedScholarship = new ScholarshipRandomBuilder().build();
      spyHttpClient.put.and.returnValue(of(updatedScholarship));

      let response: Observable<Scholarship> = scholarshipService.update(updatedScholarship);
      response.subscribe(responseTask => {
        expect(responseTask).toBe(updatedScholarship);
      });
    });

    unroll('should throw error for trying to update record #description', (done: any, testArgs: any) => {
      let missingScholarship = new ScholarshipRandomBuilder().build();
      missingScholarship.id = testArgs['id'];

      // TODO is this the correct way to mock a 404 from http client
      let httpResponse = new HttpErrorResponse({ status: 404, statusText: 'Not found' });
      spyHttpClient.put.and.returnValue(httpResponse);

      expect(() => scholarshipService.update(missingScholarship)).toThrow();
      done();
    }, [
      ['id', 'description'],
      [randomTestData.uuid(), 'that doesn\'t exist'],
      [undefined, 'with undefined id']
    ]);
  });
});
