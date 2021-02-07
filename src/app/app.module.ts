import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedServicesModule } from 'src/shared/services/shared-services.module';
import { SharedComponentsModule } from 'src/shared/components/shared-components-module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ScholarshipListComponent } from './components/scholarship/scholarship-list/scholarship-list.component';
import { ScholarshipDashboardComponent } from './components/scholarship/scholarship-dashboard/scholarship-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ScholarshipEditComponent } from './components/scholarship/scholarship-edit/scholarship-edit.component';
import { ScholarshipFilterComponent } from './components/scholarship/scholarship-filter/scholarship-filter.component';
import { TaskDashboardComponent } from './components/task/task-dashboard/task-dashboard.component';
import { TaskEditComponent } from './components/task/task-edit/task-edit.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { SelectScholarshipComponent } from './components/scholarship/select-scholarship/select-scholarship.component';
import { CheckboxComponent } from 'src/lib/components/checkbox/checkbox.component';
import { SelectValueComponent } from 'src/lib/components/selectbox/selectbox.component';
import { TextAreaComponent } from 'src/lib/components/textarea/textarea.component';
import { TextboxComponent } from 'src/lib/components/textbox/textbox.component';
import { SponsorDashboardComponent } from './components/sponsor/sponsor-dashboard/sponsor-dashboard.component';
import { SponsorEditComponent } from './components/sponsor/sponsor-edit/sponsor-edit.component';
import { SponsorListComponent } from './components/sponsor/sponsor-list/sponsor-list.component';
import { ValidateDeactivationGuard } from './components/scholarship/validate-deactivation.guard';
import { LibComponentsModule } from 'src/lib/components/lib-components-module';
import { DateSelectComponent } from 'src/lib/components/date-select/date-select.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ScholarshipDashboardComponent,
    ScholarshipEditComponent,
    ScholarshipListComponent,
    TaskDashboardComponent,
    TaskEditComponent,
    TaskListComponent,
    WelcomeComponent,
    CheckboxComponent,
    DateSelectComponent,
    TextAreaComponent,
    TextboxComponent,
    ScholarshipFilterComponent,
    SelectScholarshipComponent,
    SelectValueComponent,
    SponsorDashboardComponent,
    SponsorEditComponent,
    SponsorListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // LibComponentsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    SharedServicesModule
  ],
  providers: [
    DatePipe,
    ValidateDeactivationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
