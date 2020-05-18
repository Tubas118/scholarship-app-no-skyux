import { NgModule, APP_INITIALIZER } from '@angular/core';
import { UserService } from './user-service';
import { UuidIdService } from './uuid-id-service';
import { AppConfigService } from './app-config/app-config.service';

export function appInit(appConfigService: AppConfigService) {
  return () => appConfigService.loadAppConfig();
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppConfigService]
    },
    UserService,
    UuidIdService
  ]
})
export class SharedServicesModule {
}
