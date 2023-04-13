import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = {
    userName: null,
    password: null
  };
  errorMessage: string | null;
  @ViewChild('loginForm') loginForm: NgForm;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.form).subscribe(() => {
        this.authService.getCurrentUser().subscribe(user => {
          if (user?.userRole === 'ADMIN')
            this.router.navigateByUrl('/admin');
          if (user?.userRole === 'USER')
            this.router.navigateByUrl('/admin/patient/list');
        });

      }, err => {
        this.errorMessage = err && err.error;
      });
    } else {
      this.errorMessage = 'Please enter valid data';
    }
  }
  resetError(): void {
    this.errorMessage = null;
  }
}
