import { Component, OnDestroy, OnInit } from '@angular/core';
import { IColumn, IColumnFilterValue, ISorterValue } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import * as moment from 'moment';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, retry, Subject, takeUntil, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PateintDocumentsService } from '../../services/documents/pateint-documents.service';
import { IApiParams, IUsers, PatientListService } from '../../services/patient-list.service';
import { PatientReportingService } from '../../services/patient.reporting.service';
export interface IParams {
  activePage?: number;
  columnFilterValue?: IColumnFilterValue;
  itemsPerPage?: number;
  sorterValue: ISorterValue;
  totalPages?: number;
}
@Component({
  selector: 'app-patient.list',
  templateUrl: './patient.list.component.html',
  styleUrls: ['./patient.list.component.css']
})
export class PatientListComponent implements OnInit, OnDestroy {

  constructor(private patientListService: PatientListService
    , private reportingService: PatientReportingService
    , private pateintDocumentsService: PateintDocumentsService) {
  }

  title = 'CoreUI Angular Smart Table Example';
  readonly columns: (string | IColumn)[] = [
    {
      key: 'firstName',
      label: 'First Name'
    },
    {
      key: 'middleName',
      label: 'Middle Name'
    },
    {
      key: 'lastName',
      label: 'Last Name'
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'country',
      label: 'Country'
    },
    {
      key: 'phoneType',
      label: 'Phone Type'
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number'
    },
    {
      key: 'idType',
      label: 'Id Type'
    },
    {
      key: 'patientId',
      label: 'Id'
    },
    {
      key: 'actions',
      label: 'Actions',
      filter: false,
      sorter: false
    }
  ];
  readonly activePage$ = new BehaviorSubject(0);
  readonly columnFilterValue$ = new BehaviorSubject({});
  readonly itemsPerPage$ = new BehaviorSubject(5);
  readonly loadingData$ = new BehaviorSubject<boolean>(true);
  readonly totalPages$ = new BehaviorSubject<number>(1);
  readonly sorterValue$ = new BehaviorSubject({});
  readonly totalItems$ = new BehaviorSubject(0);

  readonly apiParams$ = new BehaviorSubject<IApiParams>({ pageSize: this.itemsPerPage$.value, currentPage: 0 });
  readonly errorMessage$ = new Subject<string>();
  readonly retry$ = new Subject<boolean>();

  readonly props$: Observable<IParams> = combineLatest([
    this.activePage$,
    this.columnFilterValue$,
    this.itemsPerPage$,
    this.sorterValue$,
    this.totalPages$
  ]).pipe(
    debounceTime(100),
    map(([activePage, columnFilterValue, itemsPerPage, sorterValue, totalPages]) => ({
      activePage,
      columnFilterValue,
      itemsPerPage,
      sorterValue,
      totalPages
    }))
  );
  usersData$!: Observable<IUsers[]>;
  readonly #destroy$ = new Subject<boolean>();

  private _apiParams: IApiParams = {};

  set apiParams(value: any) {
    const params = {
      ...this._apiParams,
      ...value
    };

    const entries = new Map(Object.entries(params));
    entries.forEach((value, key, map) => {
      if (value === '' || value === undefined || value === null) {
        map.delete(key);
      }
    });

    const apiParams = Object.fromEntries(entries);
    this.loadingData$.next(true);
    this._apiParams = { ...apiParams };
    this.retry$.next(true);
    this.apiParams$.next({ ...apiParams });
  }

  ngOnDestroy(): void {
    this.#destroy$.next(true);
  }
  exportPDF(data: IUsers) {
    this.reportingService.exportPDF(data.tableId).subscribe(
      (response: any) => {
        this.constructExportedFile(response,'patient-','pdf')
      });
  }
  exportPatientIDDocument(data: IUsers) {
    this.pateintDocumentsService.exportPateintIdDocuments(data.tableId).subscribe(
      (response: any) => {
        this.constructExportedFile(response , 'patient-ID-Documents','zip')
      }
    )

  }
  exportPatientInsuranceDocument(data: IUsers) {
    console.log('patient-Id : ' + data.tableId);
    this.pateintDocumentsService.exportPateintInsuranceDocuments(data.tableId).subscribe(
      (response: any) => {
        this.constructExportedFile(response, 'patient-Insurance-Documents','zip')
      },
      (error) => {

      }
    )
  }

  constructExportedFile(response: any, fileName: string, extention:string) {
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(response)
    a.href = objectUrl
    var nameDatePart = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    a.download = fileName + nameDatePart + '.' +extention;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }
  ngOnInit(): void {

    this.activePage$.pipe(
      takeUntil(this.#destroy$)
    ).subscribe((page) => {
      const limit = this.itemsPerPage$.value;
      const offset = page - 1;
      this.apiParams = { offset, limit };
    });

    this.itemsPerPage$.pipe(
      distinctUntilChanged(),
      takeUntil(this.#destroy$)
    ).subscribe((limit) => {
      const totalPages = Math.ceil(this.totalItems$.value / limit) ?? 1;
      this.totalPages$.next(totalPages);
    });

    this.totalItems$.pipe(
      distinctUntilChanged(),
      takeUntil(this.#destroy$)
    ).subscribe((totalItems) => {
      const totalPages = Math.ceil(totalItems / this.itemsPerPage$.value) ?? 1;
      this.totalPages$.next(totalPages);
    });

    this.totalPages$.pipe(
      takeUntil(this.#destroy$)
    ).subscribe((totalPages) => {
      const activePage = this.activePage$.value > totalPages ? totalPages : this.activePage$.value;
      this.setActivePage(activePage);
    });

    this.usersData$ = this.patientListService.getPatients(this.apiParams$).pipe(
      retry({
        delay: (error) => {
          console.warn('Retry: ', error);
          this.errorMessage$.next(error.message ?? `Error: ${JSON.stringify(error)}`);
          this.loadingData$.next(false);
          return this.retry$;
        }
      }),
      tap((response) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response) => {
        return response.records;
      })
    );
  }

  handleColumnFilterValueChange(columnFilterValue: IColumnFilterValue) {
    this.setActivePage(1);
    this.apiParams = { ...columnFilterValue };
    this.columnFilterValue$.next(columnFilterValue);
  }

  handleSorterValueChange(sorterValue: ISorterValue) {
    this.sorterValue$.next(!!sorterValue.state ? sorterValue : {});
    const sort = !!sorterValue.state ? `${sorterValue.column}%${sorterValue.state}` : '';
    this.apiParams = { sort };
  }

  handleFilteredItemsChange(filteredItems: IUsers[]) {
    // console.table(filteredItems);
  }

  handleActivePageChange(page: number) {
    this.setActivePage(page);
  }

  handleItemsPerPageChange(limit: number) {
    this.itemsPerPage$.next(limit);
  }

  setActivePage(page: number) {
    page = page > 0 && this.totalPages$.value + 1 > page ? page : 1;
    this.activePage$.next(page);
  }
}

