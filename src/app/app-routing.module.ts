import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScholarshipDashboardComponent } from './components/scholarship/scholarship-dashboard/scholarship-dashboard.component';
import { UserDashboardComponent } from 'src/shared/components/users/user-dashboard/user-dashboard.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ScholarshipEditComponent } from './components/scholarship/scholarship-edit/scholarship-edit.component';

const routes: Routes = [
  { path: 'scholarships', component: ScholarshipDashboardComponent },
  { path: 'scholarship/new', component: ScholarshipDashboardComponent },
  { path: 'scholarship/:id', component: ScholarshipEditComponent },
  { path: 'users', component: UserDashboardComponent },
  { path: '', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
