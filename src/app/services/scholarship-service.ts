import { Injectable } from '@angular/core';
import { Scholarship, ScholarshipStatus } from '../models/scholarship';
import { BasicServiceImpl } from '../../shared/basic/basic-service-impl';
import { HttpClient } from '@angular/common/http';
import { UuidIdService } from '../../shared/services/uuid-id-service';
import { AppConfigService } from 'src/shared/services/app-config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipService extends BasicServiceImpl<Scholarship, string> {
  private static _scholarshipStatus: string[] = undefined;

  constructor(protected http: HttpClient,
    protected configService: AppConfigService,
    protected idService: UuidIdService) {
      super(http, configService, 'scholarships', idService);
  }

  public get scholarshipStatusList(): string[] {
    return ScholarshipService.masterScholarshipStatusList();
  }

  public static masterScholarshipStatusList(): string[] {
    console.log('masterScholarshipStatusList (start)');
    if (ScholarshipService._scholarshipStatus === undefined) {
      const enumValues = Object.keys(ScholarshipStatus);
      ScholarshipService._scholarshipStatus = Array.from(enumValues);
    }
    console.log(`masterScholarshipStatusList; ${JSON.stringify(ScholarshipService._scholarshipStatus)}`);
    return ScholarshipService._scholarshipStatus;
  }
}
