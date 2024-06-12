import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";
import {  Injectable } from "@angular/core";

@Injectable()
export class LoginGuardian implements CanActivate{

    constructor(private loginService:LoginService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.loginService.estaLogeado()){
            return true;
        }else{
            this.router.navigateByUrl('/login');
            return false;            
        }
    }

}