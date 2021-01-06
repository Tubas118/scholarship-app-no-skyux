import { TestBed } from '@angular/core/testing';
import { ScholarshipService } from '../services/scholarship-service';
import { SharedServicesModule } from '../../shared/services/shared-services.module';
import { UuidIdService } from '../../shared/services/uuid-id-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Scholarship } from '../models/scholarship';
import { Observable, of } from 'rxjs';
import { randomTestData } from '../../shared/test-utils/random-test-data';
import { ScholarshipRandomBuilder } from '../models/scholarship-random-builder';
import { AppConfigService } from 'src/shared/services/app-config/app-config.service';

let unroll = require('unroll');
unroll.use(it);

describe('scholarship-service', () => {
  let spyHttpClient = jasmine.createSpyObj('HttpClient', ['post', 'put', 'get']);
  let spyIdService = jasmine.createSpyObj('UuidIdService', ['newId']);
  let scholarshipService: ScholarshipService;
  const config: AppConfigService = TestBed.get(AppConfigService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedServicesModule
      ],
      providers: [
        AppConfigService,
        { provide: UuidIdService, useValue: spyIdService },
        { provide: HttpClient, useValue: spyHttpClient }
      ]
    });

    scholarshipService = new ScholarshipService(spyHttpClient, config, spyIdService);
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
      let existingScholarship = new ScholarshipRandomBuilder().build();
      let updatedScholarship = new ScholarshipRandomBuilder().build();
      updatedScholarship.id = existingScholarship.id;

      spyHttpClient.put.and.returnValue(of(updatedScholarship));

      let response: Observable<Scholarship> = scholarshipService.update(updatedScholarship);
      response.subscribe(responseScholarship => {
        expect(responseScholarship).toBe(updatedScholarship);
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
      [ 'id'                 , 'description' ],
      [ randomTestData.uuid(), 'that doesn\'t exist' ],
      [ undefined            , 'with undefined id' ]
    ]);
  });
});
