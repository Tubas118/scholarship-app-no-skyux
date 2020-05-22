import { Injectable } from '@angular/core';
import { Scholarship, ScholarshipStatus, CURRENT_SCHEMA_VERSION, statusTypeMap } from '../models/scholarship';
import { BasicServiceImpl } from '../../shared/basic/basic-service-impl';
import { HttpClient } from '@angular/common/http';
import { UuidIdService } from '../../shared/services/uuid-id-service';
import { AppConfigService } from 'src/shared/services/app-config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipService extends BasicServiceImpl<Scholarship, string> {
  private static filterList: string[] = undefined;
  private static scholarshipStatus: string[] = undefined;

  constructor(protected http: HttpClient,
    protected configService: AppConfigService,
    protected idService: UuidIdService) {
      super(http, configService, 'scholarships', idService);
  }

  public get scholarshipStatusList(): string[] {
    return ScholarshipService.masterScholarshipStatusList();
  }

  public get scholarshipStatusFilterList(): string[] {
    return ScholarshipService.masterScholarshipStatusFilterList();
  }

  public static masterScholarshipStatusList(): string[] {
    if (ScholarshipService.scholarshipStatus === undefined) {
      const enumValues = Object.keys(ScholarshipStatus);
      ScholarshipService.scholarshipStatus = Array.from(enumValues);
    }
    return ScholarshipService.scholarshipStatus;
  }

  public static masterScholarshipStatusFilterList(): string[] {
    if (ScholarshipService.filterList === undefined) {
      ScholarshipService.filterList = [
        ...['ALL'],
        ...ScholarshipService.masterScholarshipStatusList()
      ]
    }
    return ScholarshipService.filterList;
  }

  public migrateStatusToSchema2() {
    this.getAll().subscribe((records: Scholarship[]) => {
      records.forEach(record => {
        console.log(`  checking id: ${record.id}`);
        if (record.schemaVersion === undefined || record.schemaVersion < CURRENT_SCHEMA_VERSION || record.statusType === undefined) {
          record.schemaVersion = CURRENT_SCHEMA_VERSION;
          record.statusType = statusTypeMap[record.status];
          console.log(`  updating id: ${record.id}`);
          this.update(record).subscribe(result => {
            console.log(`  update done? ${result.id}, ${result.schemaVersion}`);
          });
          this.sleep(500);
        }
      });
    });
  }

  private sleep(timeMS: number) {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + timeMS);
    while ((new Date()) < endTime) { }
  }
}
