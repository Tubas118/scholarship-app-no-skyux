import { Injectable } from '@angular/core';
import { BasicServiceImpl, AppConfigSettings } from '../basic/basic-service-impl';
import { HttpClient } from '@angular/common/http';
import { UuidIdService } from './uuid-id-service';
import { LoginDetails } from '../models/login-details';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BasicServiceImpl<LoginDetails, string> {
  constructor(protected http: HttpClient,
    protected config: AppConfigService,
    protected idService: UuidIdService) {
      super(http, config, 'users', idService);
  }

  public add(data: LoginDetails): Observable<LoginDetails> {
    console.log(`adding user ${data.name} ${data.email} (${data.id})`);
    if (data && data.id) {
      return this.addWithAssignedId(data);
    }
    return super.add(data);
  }
}
