import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedServicesModule } from 'src/shared/services/shared-services.module';
import { SharedComponentsModule } from 'src/shared/components/shared-components-module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ScholarshipListComponent } from './components/scholarship/scholarship-list/scholarship-list.component';
import { ScholarshipDashboardComponent } from './components/scholarship/scholarship-dashboard/scholarship-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ScholarshipDashboardComponent,
    ScholarshipListComponent,
    WelcomeComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    SharedComponentsModule,
    SharedServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
