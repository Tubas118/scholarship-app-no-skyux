import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigSettings } from 'src/shared/basic/basic-service-impl';
import { AppConfigService } from 'src/shared/services/app-config/app-config.service';
import { AppComponent } from './app.component';
import { ScholarshipService } from './services/scholarship-service';
import { AppSpecPage } from './zapp-fixtures/app.spec-page';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let elements: AppSpecPage;
  let spyHttpClient = jasmine.createSpyObj('HttpClient', ['post', 'put', 'get']);
  let spyScholarshipService = jasmine.createSpyObj('ScholarshipService', ['getAll']);
  let spyTranslateService = jasmine.createSpyObj('TranslateService', ['get', 'setDefaultLang', 'use']);

  let appConfigService = new AppConfigService(spyHttpClient);
  appConfigService.appConfigSettings = {
    apiUrl: 'http://json-server-svc-dev:3000',
    pageSize: 20
  } as AppConfigSettings;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        DatePipe,
        { provide: AppConfigService, useValue: appConfigService },
        { provide: HttpClient, useValue: spyHttpClient },
        { provide: ScholarshipService, useValue: spyScholarshipService },
        { provide: TranslateService, useValue: spyTranslateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    elements = new AppSpecPage(fixture);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'scholarship-app-no-skyux'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Scholarships');

    fixture.detectChanges();
    expect(elements.titleElement.textContent).toContain('Scholarships');

    app.title = 'Tony\'s app';
    fixture.detectChanges();
    expect(elements.titleElement.textContent).toContain('Tony\'s app');
  });
});
