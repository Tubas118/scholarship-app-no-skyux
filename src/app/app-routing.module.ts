import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from 'src/shared/components/users/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: 'users', component: UserDashboardComponent },
  { path: '', component: UserDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
