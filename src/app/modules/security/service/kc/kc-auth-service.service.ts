import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';

@Injectable()
export class KcAuthServiceService {

  constructor(private keycloakService: KeycloakService) {
    if (localStorage.getItem('access-token') === null)
      this.keycloakService.getToken().then((token) => {
        localStorage.setItem('access-token', token)
      })
  }
  public getLoggedUser(): KeycloakTokenParsed | undefined {
    try {
      const userDetails: KeycloakTokenParsed | undefined = this.keycloakService.getKeycloakInstance()
        .idTokenParsed;
      return userDetails;
    } catch (e) {
      console.error("Exception", e);
      return undefined;
    }
  }
  public isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  public loadUserProfile(): Promise<KeycloakProfile> {
    return this.keycloakService.loadUserProfile();
  }

  public login(): void {
    
    this.keycloakService.login();
  }

  public logout(): void {
    localStorage.removeItem('access-token')
    this.keycloakService.logout(window.location.origin);
  }

  public redirectToProfile(): void {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  public getRoles(): string[] {
    return this.keycloakService.getUserRoles(false);
  }

  public isUserInRole(role: string): boolean {
    return this.keycloakService.isUserInRole(role);
  }
  public getToken(): string {
    if (this.keycloakService.isTokenExpired()){
      console.log('###################### expired')
      this.logout()
    }
      
    return localStorage.getItem('access-token') || '{}';
  }
}
