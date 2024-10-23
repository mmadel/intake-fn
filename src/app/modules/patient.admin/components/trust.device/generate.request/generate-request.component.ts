import { Component, OnInit } from '@angular/core';
import { TrustDeviceToken } from '../../../models/trust.device/trust.device.token';
import { TrustDeviceService } from '../../../services/trust.device/trust-device.service';

@Component({
  selector: 'generate-request',
  templateUrl: './generate-request.component.html',
  styleUrls: ['./generate-request.component.css']
})
export class GenerateRequestComponent implements OnInit {
  trustDeviceToken: TrustDeviceToken
  constructor(private trustDeviceService: TrustDeviceService) { }

  ngOnInit(): void {
    this.trustDeviceService.generateDeviceRequest().subscribe((token: any) => {
      console.log(token)
      this.trustDeviceToken = token;
    })
  }

}
