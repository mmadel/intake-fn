import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clinic } from '../../../models/clinic.model';
import { ClinicService } from '../../../services/clinic/clinic.service';
interface RenderedClinic {
  id: number | null,
  name: string | null,
  address: string | null,
  country: string | null,
  ps: string | null,
  zipcode: string | null
}
@Component({
  selector: 'app-clinic.list',
  templateUrl: './clinic.list.component.html',
  styleUrls: ['./clinic.list.component.css']
})

export class ClinicListComponent implements OnInit {
  clinics: RenderedClinic[] | null = new Array();
  constructor(private router: Router, private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.clinicService.get().subscribe(response => {
      response.body?.forEach(element => {
        this.clinics?.push(this.constructClinic(element))
      });
    },
      error => {
        console.log(error)
      },
    )

  }
  create() {
    this.router.navigateByUrl('/admin/clinic/creation');
  }
  private constructClinic(element: Clinic) {
    var splitted = element.address.split(",");
    var renderedClinic: RenderedClinic = {
      id: element.id,
      name: element.name,
      address: splitted[0],
      country: splitted[1],
      ps: splitted[2],
      zipcode: splitted[3]
    }
    return renderedClinic;
  }

}
