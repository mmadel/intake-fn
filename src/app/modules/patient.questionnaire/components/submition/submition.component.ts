import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submition',
  templateUrl: './submition.component.html',
  styleUrls: ['./submition.component.css']
})
export class SubmitionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('patient') !== undefined){
      this.router.navigate(['/questionnaire/add']);
    }
  }

}
