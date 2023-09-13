import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import * as moment from 'moment';
import { map, Observable, retry, tap } from 'rxjs';
import { PaginationListTemplate } from 'src/app/modules/common/template/pagination.list.template';
import { Audit } from 'src/app/modules/patient.admin/models/audit.model';
import { AuditService } from 'src/app/modules/patient.admin/services/audit/audit.service';
import { UserAuditClinicService } from 'src/app/modules/patient.admin/services/audit/user.audit/user-audit-clinic.service';
import AuditColumns from '../../utils/audit.columns';
import { AuditModelMapper } from '../../utils/audit.mapper';

@Component({
  selector: 'app-user-clinic-audit',
  templateUrl: './user-clinic-audit.component.html',
  styleUrls: ['./user-clinic-audit.component.css']
})
export class UserClinicAuditComponent extends PaginationListTemplate implements OnInit {
  @Input() uuid: string
  clinicauditData$!: Observable<Audit[]>;
  details_visible = Object.create({});
  cliniccolumns: (IColumn | string)[] = AuditColumns;
  
  constructor(private auditService: UserAuditClinicService, private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
    this.initListComponent();
  }

  fetchData() {
    this.auditService.uuid = this.uuid;
    this.clinicauditData$ = this.auditService.get(this.apiParams$).pipe(
      retry({
        delay: (error) => {
          console.warn('Retry: ', error);
          this.errorMessage$.next(error.message ?? `Error: ${JSON.stringify(error)}`);
          this.loadingData$.next(false);
          return this.retry$;
        }
      }),
      tap((response: any) => {
        this.totalItems$.next(response.count);
        if (response.count) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        return AuditModelMapper.map(response.auditModels);
      })
    );
  }
  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
  getBadge(status: string) {
    switch (status) {
      case 'created':
        return 'primary'
      case 'modified':
        return 'warning'
      case 'deleted':
        return 'danger'
    }
  }
  showClinicValues(entity: any) {
    let paragraph = `<strong>Clinic Values</strong> </br>`;
    for (const key in entity) {
      if(key ==='name')
      paragraph = paragraph + `${key}: ${entity[key]} </br>`;
      if(key ==='address')
      paragraph = paragraph + `${key}: ${entity[key]} </br>`;
    }
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }
}
