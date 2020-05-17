import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedServicesModule } from 'src/shared/services/shared-services.module';
import { SharedComponentsModule } from 'src/shared/components/shared-components-module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedComponentsModule,
    SharedServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
