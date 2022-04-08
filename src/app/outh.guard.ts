import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from './register/register.service';
import { TokenStorageService } from './tokenStorage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OuthGuard implements CanActivate {
  succes = false;
  
  constructor(private tokenStorage: TokenStorageService, ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.tokenStorage.checkLogin(); 
    
  }

}
