import { Injectable } from '@angular/core';
import { Scholarship, ScholarshipStatus, CURRENT_SCHOLARSHIP_SCHEMA, statusTypeMap } from '../models/scholarship';
import { BasicServiceImpl } from '../../shared/basic/basic-service-impl';
import { HttpClient } from '@angular/common/http';
import { UuidIdService } from '../../shared/services/uuid-id-service';
import { AppConfigService } from 'src/shared/services/app-config/app-config.service';
import { Observable } from 'rxjs';
import { ScholarshipView } from '../models/views/scholarship-view';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';
import { SponsorService } from './sponsor-service';
import { SelectedItem } from 'src/lib/selectbox/selectbox.component';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipService extends BasicServiceImpl<Scholarship, string> {
  private static filterList: string[] = undefined;
  private static scholarshipStatus: string[] = undefined;

  public static readonly NO_SPONSOR_ID = '00000000-0000-0000-0000-000000000000';
  public static readonly NO_SPONSOR: string = '<<No sponsor>>';

  constructor(protected http: HttpClient,
              protected configService: AppConfigService,
              protected idService: UuidIdService,
              protected sponsorService: SponsorService) {
    super(http, configService, 'scholarships', idService);
    this.getSponsorSelectList();
  }

  public get scholarshipStatusList(): string[] {
    return ScholarshipService.masterScholarshipStatusList();
  }

  public get scholarshipStatusFilterList(): string[] {
    return ScholarshipService.masterScholarshipStatusFilterList();
  }

  public getSponsorSelectList(): Observable<SelectedItem[]> {
    return this.sponsorService.getAllSorted().pipe(
      map(entries => {
        let selectItems: SelectedItem[] = [];
        selectItems.push({ display: ScholarshipService.NO_SPONSOR, id: ScholarshipService.NO_SPONSOR_ID } as SelectedItem);
        entries.forEach(entry => {
          console.log(`sponsorSelectList - check ${entry.sponsor}`);
          selectItems.push({ display: entry.sponsor, id: entry.id } as SelectedItem);
        });
        return selectItems;
      })
    );
  }

  public getAllViews(filter?: string): Observable<ScholarshipView[]> {
    return this.getAll(filter)
      .pipe(
        map(scholarships => {
          let scholarshipViews: ScholarshipView[] = [];
          scholarships.forEach(scholarship => {
            const scholarshipView: ScholarshipView = {
              ...scholarship,
              openTasks: this.openTasks(scholarship)
            };
            if (scholarshipView.tasks === undefined) {
              scholarshipView.tasks = [];
            }
            scholarshipViews.push(scholarshipView);
          });
          return scholarshipViews;
        })
      );
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

  protected openTasks(scholarship: Scholarship): Task[] {
    if (scholarship.tasks === undefined) {
      scholarship.tasks = [];
    }
    const answer: Task[] = scholarship.tasks
      .filter(task => !this.checkBoolean(task?.done) && !this.checkBoolean(task?.invalid));

    return answer;
  }

  protected checkBoolean(flag: boolean, defaultValue: boolean = false): boolean {
    return (flag !== undefined) ? flag : defaultValue;
  }}
