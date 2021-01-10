import { Injectable } from '@angular/core';
import { observable, of, pipe } from 'rxjs';
import { Scholarship, ScholarshipStatus, CURRENT_SCHOLARSHIP_SCHEMA, statusTypeMap } from '../models/scholarship';
import { BasicServiceImpl } from '../../shared/basic/basic-service-impl';
import { HttpClient } from '@angular/common/http';
import { UuidIdService } from '../../shared/services/uuid-id-service';
import { AppConfigService } from 'src/shared/services/app-config/app-config.service';
import { Observable } from 'rxjs';
import { ScholarshipTrimmedView } from '../views/scholarship-trimmed-view';
import { TaskService } from './task-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipService extends BasicServiceImpl<Scholarship, string> {
  private static filterList: string[] = undefined;
  private static scholarshipStatus: string[] = undefined;

  public trimmedScholarshipList: Observable<ScholarshipTrimmedView[]>;

  constructor(protected http: HttpClient,
              protected configService: AppConfigService,
              protected taskService: TaskService,
              protected idService: UuidIdService) {
      super(http, configService, 'scholarships', idService);
      this.refreshValidScholarshipNames();
  }

  public get scholarshipStatusList(): string[] {
    return ScholarshipService.masterScholarshipStatusList();
  }

  public get scholarshipStatusFilterList(): string[] {
    return ScholarshipService.masterScholarshipStatusFilterList();
  }

  public getAllScholarshipTaskViewsById(scholarshipId: string) {
    return this.find(scholarshipId).pipe(
      map(scholarship => {
        if (scholarship !== undefined) {

        }
      })
    )
  }

  public refreshValidScholarshipNames(): void {
    this.getAll().subscribe((records: Scholarship[]) => {
      let trimmedValues: ScholarshipTrimmedView[] = [];
      records.forEach(record => {
        if (this.isValidScholarship(record)) {
          let newRecord = {
            id: record.id,
            scholarshipName: record.scholarshipName,
            sponsor: record.sponsor
          } as ScholarshipTrimmedView;
          trimmedValues.push(newRecord);
        }
      });
      this.trimmedScholarshipList = of(trimmedValues);
    });
  }

  public isValidScholarship(scholarship: Scholarship): boolean {
    return scholarship.status != 'INVALID' && scholarship.status != 'PASS'
      && scholarship.status != 'BROKEN' && scholarship.status != 'PASSED_DEADLINE';
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
      ];
    }
    return ScholarshipService.filterList;
  }

  protected dataPreProcessing(data: Scholarship): void {
    if (data.schemaVersion === undefined || data.schemaVersion < CURRENT_SCHOLARSHIP_SCHEMA || data.statusType === undefined) {
      data.schemaVersion = CURRENT_SCHOLARSHIP_SCHEMA;
    }
    data.statusType = statusTypeMap[data.status];
  }
}
