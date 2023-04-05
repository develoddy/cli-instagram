import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "@core/http/authentication.service";
import { User } from "@data/models/user";
import { UserService } from "@data/services/api/user.service";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  
    public hide = true;
    public btnState = true;
    public isValidPassword = false;
    public showErrorValidPassword = false;

 
    constructor(
        public authService: AuthenticationService,
        private router: Router
    ) {
        if (this.authService.isLoggedIn) {
            this.router.navigate(["app/feed"]);
        }
    }

    ngOnInit() {}

    /**
     * 
     * @desc Esta funcion se encarga de validad los caracteres que 
     * escribe en el campo inpput para email y password.
     * @param event
     * @return
     * 
     */
    public checkPassword(event: any) {
        /**
         * Variable de verificación para saber el usuario
         * escribe letras o números.
         */
        var text = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+$/;
        var data = event.target.value;

        /**
         * 
         * Se comprueba que el usuario escriba texto.
         * Si es es texto, esntonces activamos el check de buena.
         * 
         */
        if (data.match(text)) {
            this.isValidPassword = true;
            this.showErrorValidPassword = false;
        } else {
            /**
             * 
             * Se verifica si hay datos en el campo del imput.
             * Si no hay datos entonces se advierte mediante un error de 
             * que hay que ingresar datos.
             * 
             */
            if (data == "") {
                this.isValidPassword = false;
                this.showErrorValidPassword = false;
                this.btnState = true;
            
              /**
              * Se verifica el campo input que el 
              * dato no es texto
              */
            } else {
                this.isValidPassword = false;
                this.showErrorValidPassword = true;
            }
        }
    }

    /**
     * 
     * @desc Esta funcion se encarga de navegar a otra url.
     * En este caso se ira a la zona de registrar un usuario.
     * @param event
     * @return
     * 
     */
    public account() {
        //this.router.navigate(["account/emailsignup"]);
        this.router.navigate([
            'account/emailsignup/', "account"
        ]);
    }

    /**
     * 
     * @desc Esta función se encargará de navegar a otra url.
     * En este caso se ira a la zona de recuperar la contraseña
     * del usuario que intenta loguearse.
     */
    public passwordreset() {
        //this.router.navigate(["account/passwordreset"]);
        this.router.navigate([
            'account/emailsignup/', "passwordreset"
        ]);
    }
}
