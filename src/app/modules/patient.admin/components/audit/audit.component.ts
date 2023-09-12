import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IColumn, IItem } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import * as moment from 'moment';
import { User } from 'src/app/modules/security/model/user';
import { Audit } from '../../models/audit.model';
import { AuditService } from '../../services/audit/audit.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  searchInputNotValid: boolean = false;
  errorMsg: string;
  users: User[] = new Array();
  selectedUser: string = ''
  selectedEntity: string = '';
  auditData: IItem[];
  columns: (IColumn | string)[] = [
    {
      label: 'User ID',
      key: 'uuid',
      _style: { width: '20%' },
    },
    {
      label: 'Action',
      key: 'actionType',
      _style: { width: '20%' },
    },
    { label: 'Action Date', key: 'actionDate', _style: { width: '15%' } },
    { label: 'Entity Value', key: 'entityValueName', _style: { width: '15%' } },
    { label: 'Entity Type', key: 'entityName', _style: { width: '15%' } },
    {
      key: 'show',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false,
    },
  ]
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
  details_visible = Object.create({});

  constructor(private userService: UserService, private auditService: AuditService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userService.get().subscribe(response => {

      response.body?.forEach(element => {
        if (element.clinics?.length !== undefined && element.clinics?.length > 0) {
          this.users?.push(element)
        }
      });
    },
      error => {
        console.log(error)
      },
    )
  }

  fillAuditDatatList(response: Audit[] | null) {
    this.auditData = new Array();
    if (response !== null) {
      for (let i = 0; i < response.length; i++) {
        if (response[i].hasOwnProperty('revisionDate')) {
          response[i].actionDate = moment(response[i].revisionDate).format("MM/DD/YYYY hh:mm A")
        }
        response[i].entityValueName = this.prepareEntityValue(response[i])

        switch (response[i].revisionType) {
          case 'ADD':
            response[i].actionType = 'created'
            break;
          case 'MOD':
            response[i].actionType = 'modified'
            break;
          case 'Deleted':
            response[i].actionType ='deleted'
            break;
        }
        this.auditData.push(response[i])
      }
    }
  }
  find() {
    var isNotValid = this.isSearchCriteriaEmpty();
    if (isNotValid) {
      this.errorMsg = 'Please select User Or Audit Entity ';
      this.searchInputNotValid = true;
      this.auditData = new Array();
    } else {
      this.searchInputNotValid = false;
      if (this.selectedUser !== '' && this.selectedEntity === 'clinic') {
        this.auditService.getClinicAuditDataByUUID(this.selectedUser).subscribe(response => {
          this.fillAuditDatatList(response.body);
        }, (error) => {
          this.errorMsg = 'Server is down please contact the administrator';
          this.searchInputNotValid = true
        })
      }
      if (this.selectedUser !== '' && this.selectedEntity === 'Insurance_company') {
        this.auditService.getInsuranceCompanyAuditDataByUUID(this.selectedUser).subscribe(response => {
          this.fillAuditDatatList(response.body);
        }, (error) => {
          this.errorMsg = 'Server is down please contact the administrator';
          this.searchInputNotValid = true
        })
      }
      if (this.selectedUser !== '' && this.selectedEntity === '') {
        this.auditService.getAllAuditDataByUUID(this.selectedUser).subscribe(response => {
          this.fillAuditDatatList(response.body);
        }, (error) => {
          this.errorMsg = 'Server is down please contact the administrator';
          this.searchInputNotValid = true
        })
      }
      if (this.selectedUser === '' && this.selectedEntity === 'clinic') {
        this.auditService.getClinicAuditData().subscribe(response => {
          this.fillAuditDatatList(response.body);
        }, (error) => {
          this.errorMsg = 'Server is down please contact the administrator';
          this.searchInputNotValid = true
        })
      }
      if (this.selectedUser === '' && this.selectedEntity === 'Insurance_company') {
        this.auditService.getInsuranceCompanyAuditData().subscribe(response => {
          this.fillAuditDatatList(response.body);
        }, (error) => {
          this.errorMsg = 'Server is down please contact the administrator';
          this.searchInputNotValid = true
        })
      }
    }
  }

  exportResult() { }
  private isSearchCriteriaEmpty(): boolean {
    return (this.selectedUser === '' && this.selectedEntity === '')
  }
  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }

  showEntityData(entity: any) {
    let paragraph = `<strong>Entity Values</strong> </br>`;
    for (const key in entity) {
      paragraph = paragraph + `${key}: ${entity[key]} </br>`;
    }
    return this.sanitizer.bypassSecurityTrustHtml(paragraph);
  }
  private prepareEntityValue(audit: any): string {
    var entityvalue = audit.entityName.replace("Entity", "");
    for (const key in audit.entity) {
      if (key === 'name') {
        entityvalue = entityvalue + ' ' + audit.entity[key];
      }
    }
    return entityvalue
  }
}
