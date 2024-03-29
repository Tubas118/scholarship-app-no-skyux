import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScholarshipDashboardComponent } from './components/scholarship/scholarship-dashboard/scholarship-dashboard.component';
import { UserDashboardComponent } from 'src/shared/components/users/user-dashboard/user-dashboard.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ScholarshipEditComponent } from './components/scholarship/scholarship-edit/scholarship-edit.component';
import { SponsorDashboardComponent } from './components/sponsor/sponsor-dashboard/sponsor-dashboard.component';
import { SponsorEditComponent } from './components/sponsor/sponsor-edit/sponsor-edit.component';
import { ValidateDeactivationGuard } from './components/scholarship/validate-deactivation.guard';

export const routes: Routes = [
  { path: 'sponsors', component: SponsorDashboardComponent },
  { path: 'sponsors/new', component: SponsorDashboardComponent },
  { path: 'sponsors/:id', component: SponsorEditComponent },
  { path: 'scholarships', component: ScholarshipDashboardComponent, canDeactivate: [ValidateDeactivationGuard] },
  { path: 'scholarship/new', component: ScholarshipDashboardComponent, canDeactivate: [ValidateDeactivationGuard] },
  { path: 'scholarship/:id', component: ScholarshipEditComponent, canDeactivate: [ValidateDeactivationGuard] },
  { path: 'users', component: UserDashboardComponent },
  { path: '', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
