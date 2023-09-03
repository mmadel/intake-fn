import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/security/model/user';
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
  selectedUser: string | null = null;
  selectedEntity: string | null = null;;

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

  find() {
    if (this.isSearchCriteriaEmpty()) {
      this.errorMsg = 'Please select User Or Audit Entity ';
      this.searchInputNotValid = true;
    } else {
      this.searchInputNotValid = false;
      if (this.selectedUser !== null && this.selectedEntity === 'clinic') {
        this.auditService.getClinicAuditDataByUUID(this.selectedUser).subscribe(response => {
          console.log(response)
        }, (error) => {
          this.errorMsg = 'Server is down please contact the administrator';
          this.searchInputNotValid = true
        })
      }
      if (this.selectedUser !== null && this.selectedEntity === 'Insurance_company') {
        this.auditService.getInsuranceCompanyAuditDataByUUID(this.selectedUser).subscribe(response => {
          console.log(response)
        }, (error) => {
          this.errorMsg = 'Server is down please contact the administrator';
          this.searchInputNotValid = true
        })
      }
      if (this.selectedUser !== null && this.selectedEntity === null) {
        this.auditService.getAllAuditDataByUUID(this.selectedUser).subscribe(response => {
          console.log(response)
        }, (error) => {
          this.errorMsg = 'Server is down please contact the administrator';
          this.searchInputNotValid = true
        })
      }
      if (this.selectedUser === null && this.selectedEntity === 'clinic') {
        this.auditService.getClinicAuditData().subscribe(response => {
          console.log(response)
        }, (error) => {
          this.errorMsg = 'Server is down please contact the administrator';
          this.searchInputNotValid = true
        })
      }
      if (this.selectedUser === null && this.selectedEntity === 'Insurance_company') {
        this.auditService.getInsuranceCompanyAuditData().subscribe(response => {
          console.log(response)
        }, (error) => {
          this.errorMsg = 'Server is down please contact the administrator';
          this.searchInputNotValid = true
        })
      }
    }
  }

  exportResult() { }
  private isSearchCriteriaEmpty(): boolean {
    return (this.selectedUser === null && this.selectedEntity === null)
  }
}
