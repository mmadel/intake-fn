import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from 'src/app/modules/common/services/local.service';

@Injectable({
  providedIn: 'root'
})
export class CacheClinicService {

  constructor(private localService: LocalService
    , private route: ActivatedRoute
    , private router: Router) { }
  private cahce() {
    var clinicId:number|null = this.pickURLClinic();
    if(clinicId !==null){
      var cahcedClinicId = localStorage.getItem('clinicId');
      // No Cache
      if (cahcedClinicId === null) {
        this.setClinicId(clinicId);
      }
      //Cached
      if (cahcedClinicId !== null) {
        var decryptedClinicId: number = Number(this.localService.decrypt(localStorage.getItem('clinicId') || '{}'));
        //diff clinic between cached and URL
        if (clinicId !== decryptedClinicId) {
          localStorage.removeItem('clinicId')
          this.setClinicId(clinicId);
        }
      }
    }else{
      console.error('no clinic url')
    }
  }
  private setClinicId(clinicId: number) {
    var encryptClinicId = this.localService.encrypt(clinicId.toString())
    localStorage.setItem('clinicId', encryptClinicId);
  }

  public getClinic(): number {
    this.cahce();
    return Number(this.localService.decrypt(localStorage.getItem('clinicId') || '{}'));
  }
  private pickURLClinic(): number | null {
    var clinicId: number = Number(this.route.snapshot.queryParamMap.get('clinicId'));
    if (clinicId === 0 || clinicId === undefined || clinicId === null) {
      return null;
    } else {
      this.router.navigate([], {
        queryParams: {
          'clinicId': null,
        },
        queryParamsHandling: 'merge'
      })
      return clinicId;
    }
  }
}
