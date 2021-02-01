import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BasicData } from './basic-data';
import { BasicService } from './basic-service';
import { IdService } from './basic-id-service';
import { AppConfigService } from '../services/app-config/app-config.service';

export abstract class BasicServiceImpl<T extends BasicData<ID>, ID> implements BasicService<T, ID> {
  protected debugId: string;

  constructor(protected http: HttpClient,
              protected config: AppConfigService,
              protected urlSuffix: string,
              protected idService: IdService<ID>) {
    this.debugId = undefined;
  }

  public get apiUrl(): string {
    return this.config.appConfigSettings.apiUrl + '/' + this.urlSuffix;
  }

  public newId(): ID {
    return this.idService.newId();
  }

  public getDebugId(): string {
    return this.debugId
  }

  public add(data: T): Observable<T> {
    this.dataPreProcessing(data);
    if (data.id !== undefined) {
      throw new Error('Cannot add record that already has an id. Use \'update\'.');
    }
    data.id = this.newId();
    return this.addWithAssignedId(data);
  }

  public update(data: T): Observable<T> {
    this.dataPreProcessing(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .put<T>(`${this.apiUrl}/${data.id}`, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public find(id: ID): Observable<T> {
    console.log(`find - url=${this.apiUrl}, id=${id}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .get<T>(`${this.apiUrl}/${id}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getPage(page: number): Observable<T[]> {
    // throw new Error('Method not implemented.');
    return of(undefined);
  }

  public getAll(filter?: string): Observable<T[]> {
    const useUrl = (filter === undefined) ? this.apiUrl : this.apiUrl + filter;
    console.log(`getAll() => ${useUrl}${(this.debugId !== undefined) ? ' - ' + this.debugId : ''}`);
    return this.http
      .get<T[]>(useUrl)
      .pipe(catchError(this.handleError));
  }

  public getAllRaw(filter? : string): Observable<any[]> {
    const useUrl = (filter === undefined) ? this.apiUrl : this.apiUrl + filter;
    console.log(`getAllRaw() => ${useUrl}`);
    return this.http
      .get<any[]>(useUrl)
      .pipe(catchError(this.handleError));
  }

  protected abstract dataPreProcessing(data: T): void;

  protected addWithAssignedId(data: T): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post<T>(this.apiUrl, data, httpOptions)
      .pipe(catchError(this.handleError));
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

export class AppConfigSettings {
  public apiUrl: string;
  public pageSize: number;
}
