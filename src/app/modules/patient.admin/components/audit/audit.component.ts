import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/security/model/user';
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

  constructor(private userService: UserService) { }

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

  find() { }
  exportResult() { }
}
