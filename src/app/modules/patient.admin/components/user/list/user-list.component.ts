import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/modules/common';
import { User } from 'src/app/modules/security/model/user';
import { KcAuthServiceService } from 'src/app/modules/security/service/kc/kc-auth-service.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  isLoggedIn: boolean;
  users: User[] = new Array();
  constructor(private router: Router, private userService: UserService , private kcAuthServiceService :KcAuthServiceService) { }

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

  create() {
    this.router.navigateByUrl('/admin/user/creation');
  }
  update(userId:string | undefined | null){
    this.router.navigate(['/admin/user/update', userId])
  }
  delete(userId:string | undefined | null){
    console.log(userId);
    this.userService.delete(userId || '{}').subscribe(() => {
      location.reload();
    })
  }
  isLoggedInUser(id: string | null | undefined) {
    var userId: string | undefined = this.kcAuthServiceService.getLoggedUser()?.sub;
    this.isLoggedIn= userId == id ? true : false;
    return this.isLoggedIn;
  }
}
