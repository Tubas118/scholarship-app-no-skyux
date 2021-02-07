import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { CheckboxComponent } from 'src/lib/components/checkbox/checkbox.component';
import { TextAreaComponent } from 'src/lib/components/textarea/textarea.component';
import { TextboxComponent } from 'src/lib/components/textbox/textbox.component';
import { LibComponentsModule } from 'src/lib/components/lib-components-module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    //LibComponentsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    BrowserModule,
    CommonModule,
    //LibComponentsModule,
    TranslateModule
  ]
})
export class SharedComponentsModule { }
