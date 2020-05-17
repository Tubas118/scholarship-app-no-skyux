import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: `

  // `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scholarship-app-no-skyux';

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
