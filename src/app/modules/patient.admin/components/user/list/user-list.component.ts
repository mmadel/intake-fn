import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/security/model/user';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = new Array();
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.get().subscribe(response => {
      response.body?.forEach(element => {
        if (element.clinics?.length !== undefined && element.clinics?.length > 0) {
          if (element.userRole === 'ADMIN')
            element.userRole = "Administrator";
          if (element.userRole === 'USER')
            element.userRole = "Normal User";
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
    this.userService.delete(userId || '{}').subscribe(() => {
      location.reload();
    })
  }
}
