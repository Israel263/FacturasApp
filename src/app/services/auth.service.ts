import { Injectable } from '@angular/core';
import {Auth, signInWithEmailAndPassword, getIdToken, signOut, createUserWithEmailAndPassword} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private cookies:CookieService, private auth:Auth){};

  register (email:string, password:string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  token:string='';
    login(email:string, contraseña:string){
        signInWithEmailAndPassword(this.auth, email,contraseña).then(
            correcto=>{                
                getIdToken(correcto.user).then(
                    token=>{
                        this.token=token;
                        this.cookies.set("token",this.token);
                        this.router.navigate(['/home']);
                    }
                );
            }
        )
    }
    getIdToken(){
        //return this.token;
        return this.cookies.get("token");
    }
    estaLogeado(){
        //return this.token;
        return this.cookies.get("token");
    }

    cerrarSesion(){
        signOut(this.auth).then(()=>{
            this.token='';
            this.cookies.set("token",this.token);
            this.router.navigate(['/']);
        })
    }
}
