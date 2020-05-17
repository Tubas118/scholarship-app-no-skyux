import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigSettings } from '../../basic/basic-service-impl';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigData } from '../../models/config-data';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: any;
  private appConfigSettings: AppConfigSettings;
  private initComplete = false;

  constructor(private http: HttpClient) { this.loadAppConfig(); }

  public loadAppConfig(): void {
    console.log('AppConfigService->loadAppConfig()');
    this.loadAppConfigObservable();
  }

  public getAppConfig(): Observable<AppConfigSettings> {
    return this.loadAppConfigObservable();
  }

  public secret(): string {
    if (this.config === undefined) {
      this.loadAppConfig();
    }
    return this.config.secrets.jwt;
  }

  private loadAppConfigObservable(): Observable<AppConfigSettings> {
    if (this.appConfigSettings === undefined) {
      return this.http
        .get('/assets/config.json')
        .pipe(
          map((data: ConfigData<AppConfigSettings>) => {
            this.config = data;
            this.appConfigSettings = data.appSettings;
            return this.appConfigSettings;
          }));
    } else {
      console.log(`loadAppConfigObservable (c): ${this.appConfigSettings}`);
      return of(this.appConfigSettings);
    }
  }
}
