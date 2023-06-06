import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance-company-create',
  templateUrl: './insurance-company-create.component.html',
  styleUrls: ['./insurance-company-create.component.css']
})
export class InsuranceCompanyCreateComponent implements OnInit {
  errorMessage: string | null;
  constructor() { }

  ngOnInit(): void {
  }
  create(){

  }
  resetError(){
    
  }
}
