import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { version } from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Scholarships (no-skyux)';

  appVersion: string = version;

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
