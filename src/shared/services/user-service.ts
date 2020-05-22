import { Injectable } from '@angular/core';
import { BasicServiceImpl } from '../basic/basic-service-impl';
import { HttpClient } from '@angular/common/http';
import { UuidIdService } from './uuid-id-service';
import { LoginDetails, USER_CURRENT_SCHEMA } from '../models/login-details';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BasicServiceImpl<LoginDetails, string> {
  constructor(protected http: HttpClient,
    protected configService: AppConfigService,
    protected idService: UuidIdService) {
      super(http, configService, 'users', idService);
  }

  public add(data: LoginDetails): Observable<LoginDetails> {
    console.log(`adding user ${data.name} ${data.email} (${data.id})`);
    if (data && data.id) {
      return this.addWithAssignedId(data);
    }
    return super.add(data);
  }

  protected dataPreProcessing(data: LoginDetails): void {
    if (data.schemaVersion === undefined || data.schemaVersion < USER_CURRENT_SCHEMA) {
      data.schemaVersion = USER_CURRENT_SCHEMA;
    }
  }
}
