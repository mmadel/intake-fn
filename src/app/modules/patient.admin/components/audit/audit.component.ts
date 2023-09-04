import { Component, OnInit } from '@angular/core';
import { IColumn, IItem } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
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
  selectedUser: string =''
  selectedEntity: string ='';
  auditData: IItem[];
  columns: (IColumn | string)[] = [
    {
      label:'User ID',
      key: 'uuid',
      _style: { width: '20%' },
    },
    {
      label:'Action',
      key: 'revisionType',
      _style: { width: '20%' },
    },
    { label:'Action Date', key: 'revisionDate', _style: { width: '15%' } },
    { label:'Entity Name', key: 'entityName', _style: { width: '15%' } },
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
      case 'ADD':
        return 'primary'
      case 'MOD':
        return 'warning'
      case 'Deleted':
        return 'danger'
    }
  }
  details_visible = Object.create({});

  constructor(private userService: UserService, private auditService: AuditService) { }

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
        this.auditData.push(response[i])
      }
    }
  }
  find() {
    var isNotValid  = this.isSearchCriteriaEmpty();
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
    console.log(this.selectedUser + ' ' + this.selectedEntity)
    return (this.selectedUser === '' && this.selectedEntity === '')
  }
  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
}
