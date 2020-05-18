import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from 'src/shared/services/app-config/app-config.service';
import { AppConfigSettings } from 'src/shared/basic/basic-service-impl';
import { config } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Scholarships (no-skyux)';

  appConfigSettings: AppConfigSettings;

  constructor(public translate: TranslateService,
    configService: AppConfigService) {
      translate.setDefaultLang('en');
      translate.use('en');
      configService.getAppConfig().subscribe(config)
  }
}
