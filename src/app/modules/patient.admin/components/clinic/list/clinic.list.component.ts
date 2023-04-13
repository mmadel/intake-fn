import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinic.list',
  templateUrl: './clinic.list.component.html',
  styleUrls: ['./clinic.list.component.css']
})
export class ClinicListComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  create(){
    this.router.navigateByUrl('/admin/clinic/creation');
  }

}
