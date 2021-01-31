import { Injectable } from '@angular/core';
import { BasicServiceImpl } from '../../shared/basic/basic-service-impl';
import { HttpClient } from '@angular/common/http';
import { UuidIdService } from '../../shared/services/uuid-id-service';
import { AppConfigService } from 'src/shared/services/app-config/app-config.service';
import { CURRENT_SPONSOR_SCHEMA, Sponsor } from '../models/sponsor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SponsorService extends BasicServiceImpl<Sponsor, string> {
  constructor(protected http: HttpClient,
              protected configService: AppConfigService,
              protected idService: UuidIdService) {
    super(http, configService, 'sponsors', idService);
  }

  public add(data: Sponsor): Observable<Sponsor> {
    console.log(`Sponsor add: ${JSON.stringify(data)}`);
    return super.add(data);
  }

  public getAllSorted(): Observable<Sponsor[]> {
    return super.getAll('?_sort=sponsor&_order=asc');
  }

  protected dataPreProcessing(data: Sponsor): void {
    if (data.schemaVersion === undefined || data.schemaVersion < CURRENT_SPONSOR_SCHEMA) {
      data.schemaVersion = CURRENT_SPONSOR_SCHEMA;
    }
  }
}
