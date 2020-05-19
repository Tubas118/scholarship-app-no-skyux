// import { Scholarship } from './scholarship';
// import { randomTestData } from '../shared/test-utils/random-test-data';
// import { BasicDataBuilder } from '../shared/interfaces/basic-data-builder';

// export class ScholarshipRandomBuilder implements BasicDataBuilder<string, Scholarship> {
//   public scholarshipName: string;
//   public sponsor: string;
//   public sponsorContactInfo: string;
//   public contactEmail: string;
//   public status: string;

//   constructor() {
//     this.scholarshipName = randomTestData.text();
//     this.sponsor = randomTestData.text();
//     this.sponsorContactInfo = randomTestData.text();
//     this.contactEmail = randomTestData.text();
//     this.status = randomTestData.text();
//   }

//   public build(): Scholarship {
//     return JSON.parse(JSON.stringify(this)) as Scholarship;
//   }

//   public blankScholarship {
//     return {
