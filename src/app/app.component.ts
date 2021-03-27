import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { version } from '../../package.json';
import { ScholarshipSupport } from './models/model-support/scholarship-support';
import { SponsorSupport } from './models/model-support/sponsor-support';
import { TaskSupport } from './models/model-support/task-support';
import { ScholarshipService } from './services/scholarship-service';
import { SponsorService } from './services/sponsor-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Scholarships';

  appVersion: string = version;

  constructor(public translate: TranslateService,
              private scholarshipService: ScholarshipService,
              private scholarshipSupport: ScholarshipSupport,
              private sponsorService: SponsorService,
              private sponsorSupport: SponsorSupport,
              private taskSupport: TaskSupport) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
