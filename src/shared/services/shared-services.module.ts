import { NgModule } from '@angular/core';
import { UserService } from './user-service';
import { UuidIdService } from './uuid-id-service';

@NgModule({
  providers: [
    UserService,
    UuidIdService
  ]
})
export class SharedServicesModule {
}
