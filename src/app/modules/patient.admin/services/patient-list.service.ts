import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, Observable, retry, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  // headers: new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   Connection: 'keep-alive'
  // })
};

export interface IData {
  number_of_records: number;
  number_of_matching_records: number;
  records: IUsers[];
}

export interface IUsers {
  firstName: string;
  middleName: string;
  email: string;
  country: string;
  phoneType: string;
  phoneNumber: string;
  idType: string,
  patientId: string,
  tableId: number,
  patientSourceType: string,
  insuranceWorkerType: string,
  hasPhysicalTherapy: boolean
}

export interface IApiParams {
  offset?: number;
  limit?: number;
  columnFilter?: string;
  columnSorter?: string;
  sort?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientListService {
  private baseUrl = environment.baseURL + 'patient'
  constructor(private httpClient: HttpClient) { }

  getPatients(config$: BehaviorSubject<IApiParams>): Observable<any> {
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
      ? { params: httpParams, ...httpOptions }
      : { params: {}, ...httpOptions };

    return this.httpClient
      .get<IData>(this.baseUrl, options)
      .pipe(
        retry({ count: 1, delay: 1000, resetOnSuccess: true }),
        catchError(this.handleHttpError)
      );
  }
  private handleHttpError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

}
