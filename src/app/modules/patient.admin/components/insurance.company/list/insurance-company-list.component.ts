import { Component, OnInit } from '@angular/core';
import { InsuranceCompany } from '../../../models/insurance.company.model';
import { InsuranceCompanyService } from '../../../services/insurance.company/insurance-company.service';

@Component({
  selector: 'app-insurance-company-list',
  templateUrl: './insurance-company-list.component.html',
  styleUrls: ['./insurance-company-list.component.css']
})
export class InsuranceCompanyListComponent implements OnInit {

  InsuranceCompanies: InsuranceCompany[] = new Array();
  constructor(private insuranceCompanyService: InsuranceCompanyService) { }

  ngOnInit(): void {
    this.insuranceCompanyService.get().subscribe((response) => {
      console.log(JSON.stringify(response));
      response.body?.forEach(element => {
        this.InsuranceCompanies?.push(element);
      });
    })
  }
  create() {

  }

}
