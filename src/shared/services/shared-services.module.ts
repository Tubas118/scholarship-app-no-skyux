import { NgModule } from '@angular/core';
import { UserService } from './user-service';
import { UuidIdService } from './uuid-id-service';
import { AppConfigService } from './app-config/app-config.service';

@NgModule({
  providers: [
    AppConfigService,
    UserService,
    UuidIdService
  ]
})
export class SharedServicesModule {
}
