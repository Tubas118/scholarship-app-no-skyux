import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScholarshipDashboardComponent } from './components/scholarship/scholarship-dashboard/scholarship-dashboard.component';
import { UserDashboardComponent } from 'src/shared/components/users/user-dashboard/user-dashboard.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ScholarshipEditComponent } from './components/scholarship/scholarship-edit/scholarship-edit.component';
import { TaskEditComponent } from './components/task/task-edit/task-edit.component';
import { TaskDashboardComponent } from './components/task/task-dashboard/task-dashboard.component';

const routes: Routes = [
  { path: 'scholarships', component: ScholarshipDashboardComponent },
  { path: 'scholarship/new', component: ScholarshipDashboardComponent },
  { path: 'scholarship/:id', component: ScholarshipEditComponent },
  { path: 'tasks', component: TaskDashboardComponent },
  { path: 'task/new', component: TaskDashboardComponent },
  { path: 'task/:id', component: TaskEditComponent },
  { path: 'users', component: UserDashboardComponent },
  { path: '', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
