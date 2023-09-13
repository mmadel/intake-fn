import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { map, Observable, retry, tap } from 'rxjs';
import { PaginationListTemplate } from 'src/app/modules/common/template/pagination.list.template';
import { Audit } from 'src/app/modules/patient.admin/models/audit.model';
import { UserAuditInsuranceCompanyService } from 'src/app/modules/patient.admin/services/audit/user.audit/user-audit-insurance-company.service';
import AuditColumns from '../../utils/audit.columns';
import { AuditModelMapper } from '../../utils/audit.mapper';

@Component({
  selector: 'app-user-insurance-company-audit',
  templateUrl: './user-insurance-company-audit.component.html',
  styleUrls: ['./user-insurance-company-audit.component.css']
})
export class UserInsuranceCompanyAuditComponent extends PaginationListTemplate implements OnInit {
  @Input() uuid: string
  constructor(private auditService: UserAuditInsuranceCompanyService, private sanitizer: DomSanitizer) { super(); }
  icauditData$!: Observable<Audit[]>;
  details_visible = Object.create({});
  iccolumns: (IColumn | string)[] = AuditColumns;
  offsetURL: string = '/insurance/company/retrieve/uuid/'
  ngOnInit(): void {
    this.initListComponent();
  }
  fetchData() {
    this.auditService.uuid = this.uuid;
    this.icauditData$ = this.auditService.get(this.apiParams$).pipe(
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
    let paragraph = `<strong>Insurance Company Values</strong> </br>`;
    for (const key in entity) {
      if (key === 'name')
        paragraph = paragraph + `${key}: ${entity[key]} </br>`;
    }
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }
}
