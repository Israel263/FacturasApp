import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import  firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { CookieService } from "ngx-cookie-service";

@ Injectable()
export class LoginService{

    constructor(private router: Router, private cookies:CookieService){};

    token:string='';
    login(email:string, contraseña:string){
        firebase.auth().signInWithEmailAndPassword(email,contraseña).then(
            correcto=>{
                firebase.auth().currentUser?.getIdToken().then(
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
        firebase.auth().signOut().then(()=>{
            this.token='';
            this.cookies.set("token",this.token);
            this.router.navigate(['/']);
        })
    }
}