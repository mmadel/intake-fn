import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrustDevice } from '../../../models/trust.device/trust.device';
import { TrustDeviceService } from '../../../services/trust.device/trust-device.service';

@Component({
  selector: 'app-list-trust-devices',
  templateUrl: './list-trust-devices.component.html',
  styleUrls: ['./list-trust-devices.component.css']
})
export class ListTrustDevicesComponent implements OnInit {
  isError:boolean = false;
  errorMessage:string;
  trustDevices!: Observable<TrustDevice[]>;
  constructor(private trustDeviceService:TrustDeviceService) { }

  ngOnInit(): void {
    this.trustDevices! = this.trustDeviceService.list();
    this.trustDevices!.subscribe(result=>{
    },error=>{
      this.isError = true;
      this.errorMessage = error.error.message;
    })
  }
}
