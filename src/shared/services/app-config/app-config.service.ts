import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConfigSettings } from '../../basic/basic-service-impl';
import {throwError } from 'rxjs';
import { ConfigData } from '../../models/config-data';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  public config: any;
  public appConfigSettings: AppConfigSettings;

  constructor(private http: HttpClient) { }

  public loadAppConfig(): Promise<any> {
    return this.http
      .get('/assets/config.json')
      .toPromise()
      .then((data: ConfigData<AppConfigSettings>) => {
        this.config = data;
        this.appConfigSettings = data.appSettings;
      });
  }

  public secret(): string {
    return this.config.secrets.jwt;
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
}
