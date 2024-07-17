import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  private baseUrl = environment.baseURL + 'nppes'

  constructor(private httpClient: HttpClient) { }
  public findProviderByNPI(npi: number) {
    var url = this.baseUrl + '/find/provider/npi/' + npi;
    return this.httpClient.get(url);
  }

  public findProviderByName(name: string):Observable<any> {
    var url = this.baseUrl + '/find/provider/name/' + name;
    return this.httpClient.get(url);
  }
}
