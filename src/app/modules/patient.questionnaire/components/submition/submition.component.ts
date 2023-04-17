import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/modules/common';

@Component({
  selector: 'app-submition',
  templateUrl: './submition.component.html',
  styleUrls: ['./submition.component.css']
})
export class SubmitionComponent implements OnInit {

  constructor(private router: Router, private localService: LocalService) { }

  ngOnInit(): void {
    if (this.localService.getData('patient') !== null) {
      this.router.navigate(['/questionnaire/add']);
    }
  }

}
