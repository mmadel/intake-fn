import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, Observable, retry, switchMap, throwError } from 'rxjs';
import { IApiParams } from 'src/app/modules/common/interfaces/api.params';
import { IData } from 'src/app/modules/common/interfaces/idata';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private auditUrl = environment.baseURL + 'audit'
  private offsetURL: string
  constructor(private http: HttpClient) { }

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
  private fetchData(params: IApiParams): Observable<IData> {
    const apiParams = {
      ...params
    };
    const httpParams: HttpParams = new HttpParams({ fromObject: apiParams });
    const options = Object.keys(httpParams).length
      ? { params: httpParams }
      : { params: {} };
    return this.http
      .get<IData>(this.auditUrl + this.offsetURL, options)
      .pipe(
        retry({ count: 1, delay: 100000, resetOnSuccess: true }),
        catchError(this.handleHttpError)
      );
  }
  constructOffsetURL(selectedEntity: string) {
    if (selectedEntity === 'patient')
      this.offsetURL = '/patient/retrieve'
    if (selectedEntity === 'clinic')
      this.offsetURL = '/clinic/retrieve';
    if (selectedEntity === 'Insurance_company')
      this.offsetURL = '/insurance/company/retrieve'
  }
  constructOffsetUUIDURL(selectedEntity: string, uuid: string) {
    if (selectedEntity === 'patient')
      this.offsetURL = '/patient/retrieve/uuid/' + uuid
    if (selectedEntity === 'clinic')
      this.offsetURL = '/clinic/retrieve/uuid/' + uuid
    if (selectedEntity === 'Insurance_company')
      this.offsetURL = '/insurance/company/retrieve/uuid/' + uuid
    console.log(this.offsetURL)
  }
  private handleHttpError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

}
