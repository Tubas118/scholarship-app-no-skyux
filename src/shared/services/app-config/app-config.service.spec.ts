import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {
  let spyHttpClient = jasmine.createSpyObj('HttpClient', ['post', 'put', 'get']);

  let appConfigService = new AppConfigService(spyHttpClient);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: spyHttpClient }
      ]
    })
  });

  it('should be created', () => {
    const service: AppConfigService = new AppConfigService(spyHttpClient);
    expect(service).toBeTruthy();
  });
});
