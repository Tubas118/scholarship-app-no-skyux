import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedServicesModule } from 'src/shared/services/shared-services.module';
import { SharedComponentsModule } from 'src/shared/components/shared-components-module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ScholarshipListComponent } from './components/scholarship/scholarship-list/scholarship-list.component';
import { ScholarshipDashboardComponent } from './components/scholarship/scholarship-dashboard/scholarship-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ScholarshipEditComponent } from './components/scholarship/scholarship-edit/scholarship-edit.component';
import { ScholarshipFilterComponent } from './components/scholarship/scholarship-filter/scholarship-filter.component';
import { TextboxComponent } from '../lib/textbox/textbox.component';
import { CheckboxComponent } from 'src/lib/checkbox/checkbox.component';
import { TaskDashboardComponent } from './components/task/task-dashboard/task-dashboard.component';
import { TaskEditComponent } from './components/task/task-edit/task-edit.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { TextAreaComponent } from 'src/lib/textarea/textarea.component';

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
    ScholarshipFilterComponent,
    TextAreaComponent,
    TextboxComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    SharedServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
