import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, Observable, retry, switchMap, throwError } from 'rxjs';
import { IApiParams } from 'src/app/modules/common/interfaces/api.params';
import { IData } from 'src/app/modules/common/interfaces/idata';
import { environment } from 'src/environments/environment';
import { AbstractUserAudit } from './abstract.user.audit';

@Injectable({
  providedIn: 'root'
})
export class UserAuditPatientService extends AbstractUserAudit {
  private auditUrl = environment.baseURL + 'audit'
  private offsetURL:string = '/patient/retrieve/uuid/'
  constructor(private http: HttpClient) { 
    super();
  }
  get(config$: BehaviorSubject<IApiParams>): Observable<any> {
    return config$.pipe(
      debounceTime(100),
      distinctUntilChanged(
        (previous, current) => {
          return JSON.stringify(previous) === JSON.stringify(current);
        }
      ),
      switchMap((config) => this.fetchData(config))
    );
  }
  fetchData(params: IApiParams): Observable<IData> {
    const apiParams = {
      ...params
    };
    const httpParams: HttpParams = new HttpParams({ fromObject: apiParams });
    const options = Object.keys(httpParams).length
      ? { params: httpParams }
      : { params: {} };
    return this.http
      .get<IData>(this.auditUrl + this.offsetURL+this.uuid, options)
      .pipe(
        retry({ count: 1, delay: 100000, resetOnSuccess: true }),
        catchError(this.handleHttpError)
      );
  }
}
