import { of, throwError } from "rxjs";
import { catchError, map, take } from "rxjs/operators";
import { newScholarship, newSponsor, newTask } from '../../models/model-support/app-data-utils';
import { ScholarshipService } from "src/app/services/scholarship-service";
import { SponsorService } from "src/app/services/sponsor-service";
import { ScholarshipV2, SCHOLARSHIP_SCHEMA_V2 } from "../archived/scholarship/scholarship-v2";
import { ScholarshipV3, SCHOLARSHIP_SCHEMA_V3 } from "../archived/scholarship/scholarship-v3";
import { CURRENT_SCHOLARSHIP_SCHEMA, Scholarship } from "../scholarship";
import { Sponsor } from "../sponsor";
import { Task } from "../task";
import { TaskConstants } from "../task-constants";
import { SleepUtil } from "src/shared/utils/sleep-util";

export class MigrateUtil {
  constructor(private scholarshipService: ScholarshipService,
              private sponsorService: SponsorService) {
  }

  public migrate() {
    this.scholarshipService.getAllRaw()
      .pipe(take(1))
      .subscribe((scholarships: any[]) => {
        scholarships.forEach(scholarship => {
          if (scholarship.schemaVersion === SCHOLARSHIP_SCHEMA_V3) {
            SleepUtil.sleep(250);
            const scholarshipV3 = {
              ...scholarship
            } as ScholarshipV3;
            console.log(`${scholarshipV3.schemaVersion} => ${JSON.stringify(scholarshipV3)}`);
            this.migrateFromV3(scholarship);
          }
          else if (scholarship.schemaVersion === SCHOLARSHIP_SCHEMA_V2) {
            SleepUtil.sleep(250);
            const scholarshipV2 = {
              ...scholarship
            } as ScholarshipV2;
            console.log(`${scholarshipV2.schemaVersion} => ${JSON.stringify(scholarshipV2)}`);
            this.migrateFromV2(scholarshipV2);
          }
        })
      })
  }

  private migrateFromV2(scholarshipSource: ScholarshipV2) {
    let scholarship = newScholarship({
      ...scholarshipSource,
      schemaVersion: CURRENT_SCHOLARSHIP_SCHEMA
    } as Scholarship);

    let sponsor = newSponsor({
      sponsor: scholarshipSource.sponsor,
      contactInfo: scholarshipSource.sponsorContactInfo,
      contactPhone: scholarshipSource.sponsorContactInfo,
      contactEmail: scholarshipSource.contactEmail,
    } as Sponsor);

    console.log(`migrateFromV2`);
    console.log(`  Scholarship: ${JSON.stringify(scholarship)}`);
    console.log(`  Sponsor: ${JSON.stringify(sponsor)}`);

    SleepUtil.sleep(250);

    this.sponsorService.add(sponsor)
      .pipe(
        take(1),
        catchError(err => {
          console.log(`${err}`)
          return throwError(err);
        })
      )
      .subscribe(
        savedSponsor => {
          console.log(`Migrated sponsor from schema version ${scholarshipSource.schemaVersion}: ${savedSponsor.id} = ${savedSponsor.sponsor}`)
          SleepUtil.sleep(250);

          scholarship.sponsorId = savedSponsor.id;
          scholarship.sponsor = undefined;

          this.appendTaskIfMissing(scholarship.tasks, TaskConstants.ESSAY_SUBMITTED);
          this.appendTaskIfMissing(scholarship.tasks, TaskConstants.FINANCIALS_SUBMITTED);

          this.scholarshipService.update(scholarship)
            .pipe(take(1))
            .subscribe(savedScholarship => console.log(`Updated scholarship from schema version ${scholarshipSource.schemaVersion}: ${savedScholarship.id} = ${savedScholarship.scholarshipName}`))
        },
        err => console.error(err))
  }

  private migrateFromV3(scholarshipSource: ScholarshipV3) {
    let scholarship = newScholarship({
      ...scholarshipSource,
      schemaVersion: CURRENT_SCHOLARSHIP_SCHEMA
    } as Scholarship);

    let sponsor = newSponsor({
      sponsor: scholarshipSource.sponsor,
      contactInfo: scholarshipSource.sponsorContactInfo,
      contactPhone: scholarshipSource.sponsorContactInfo,
      contactEmail: scholarshipSource.contactEmail,
    } as Sponsor);

    console.log(`migrateFromV3`);
    console.log(`  Scholarship: ${JSON.stringify(scholarship)}`);
    console.log(`  Sponsor: ${JSON.stringify(sponsor)}`);

    SleepUtil.sleep(250);

    this.sponsorService.add(sponsor).pipe(
      take(1),
      map(savedSponsor => {
        console.log(`Migrated sponsor from schema version ${scholarshipSource.schemaVersion}: ${savedSponsor.id} = ${savedSponsor.sponsor}`)
        scholarship.sponsorId = savedSponsor.id;
        scholarship.sponsor = undefined;

        this.appendTaskIfMissing(scholarship.tasks, TaskConstants.ESSAY_SUBMITTED);
        this.appendTaskIfMissing(scholarship.tasks, TaskConstants.FINANCIALS_SUBMITTED);

        this.scholarshipService.update(scholarship).pipe(
          take(1),
          map(savedScholarship => console.log(`Updated scholarship from schema version ${scholarshipSource.schemaVersion}: ${savedScholarship.id} = ${savedScholarship.scholarshipName}`))
        );
      })
    )
  }

  private appendTaskIfMissing(tasks: Task[], checkTaskSummary: string) {
    let hasTaskSummary = false;
    if (tasks === undefined) {
      throwError(new Error('Tasks cannot be undefined'));
    }

    for (const task of tasks) {
      if (task.summary === checkTaskSummary) {
        hasTaskSummary = true;
        break;
      }
    }

    if (!hasTaskSummary) {
      tasks.push(newTask({
        summary: checkTaskSummary
      } as Task));
    }
  }
}
