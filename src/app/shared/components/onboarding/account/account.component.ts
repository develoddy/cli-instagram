import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "app-account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.css"],
})
export class AccountComponent implements OnInit {
    public btnState = true;
    public cssUrl: string = "";
    public hide = true;
    public emailValid = "";
    public phoneValid = "";
    @Output() sigInEvent = new EventEmitter();
    @Output() showBirthdayEvent = new EventEmitter();

    constructor(public sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.cssUrl = "assets/css/font-awesome.css";
    }

    public sigIn() {
        this.sigInEvent.emit("sigIn");
    }

    public showBirthday(emailOrPhone: string, fullname: string, username: string, password: string) {
        this.showBirthdayEvent.emit({ 
          emailOrPhone: emailOrPhone,
          fullname: fullname,
          username: username, 
          password: password 
        });
    }

    public isValidEmaiOrPhone = false;
    public isEmail = false;
    public showError = false;
    public checkEmailOrPhone(event: any) {
        var numeric = /^[0-9]+$/;
        var email =
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        var data = event.target.value;

        // COMPROBAR NUMERO DE MOVIL PARA SPAIN.
        if (data.match(numeric) && data.charAt(0) == 6) {
            // SE COMPRUEBA QUE SI ES NUMÉRICO Y SI EL PRIMER
            // DIGITO EMPEZA POR EL NUMERO 6.
            this.isValidEmaiOrPhone = true;
            this.showError = false;
            //this.phoneValid = data;
        } else {
            // ES COMPRUEBA QUE NO ES NUMÉRICO Y ESTÁ VACIO EL CAMPO.
            if (data == "") {
                this.isValidEmaiOrPhone = false;
                this.showError = false;
                this.btnState = true;
            } else {
                // SE COMPRUEBA QUE SEA UNA DIRECCIÓN DE E-MAIL VALIDA.
                if (data.match(email)) {
                    this.isValidEmaiOrPhone = true;
                    this.showError = false;
                } else {
                    // SE COMPRUEBA QUE NO ES UNA DIRECCIÓN DE E-MAIL VALIDA.
                    this.isValidEmaiOrPhone = false;
                    this.showError = true;
                }
            }
        }

        //console.log("DEBUG: Phone -- " + this.phoneValid)
        this.verifyValuesInputs();
    }

    public isValidFullname = false;
    public showErrorValidFullname = false;
    public checkFullname(event: any) {
        var text = /^[a-zA-Z0-9-]+$/;  ///^[a-z]+$/;
        var data = event.target.value;

        if (data.match(text)) {
            // SE COMPRUEBA QUE ES TEXTO.
            this.isValidFullname = true;
            this.showErrorValidFullname = false;
        } else {
            if (data == "") {
                // SE COMPRUEBA QUE NO HAY DATO.
                this.isValidFullname = false;
                this.showErrorValidFullname = false;
                this.btnState = true;
            } else {
                // SE COMPRUEBA QUE NO ES TEXTO.
                this.isValidFullname = false;
                this.showErrorValidFullname = true;
            }
        }
        this.verifyValuesInputs();
    }

    public isValidUsername = false;
    public showErrorValidUsername = false;
    public checkUsername(event: any) {
        var text = /^[a-zA-Z0-9-]+$/;
        var data = event.target.value;

        if (data.match(text)) {
            // SE COMPRUEBA QUE ES TEXTO.
            this.isValidUsername = true;
            this.showErrorValidUsername = false;
        } else {
            if (data == "") {
                // SE COMPRUEBA QUE NO HAY DATO.
                this.isValidUsername = false;
                this.showErrorValidUsername = false;
                this.btnState = true;
            } else {
                // SE COMPRUEBA QUE NO ES TEXTO.
                this.isValidUsername = false;
                this.showErrorValidUsername = true;
            }
        }
        this.verifyValuesInputs();
    }

    public isValidPassword = false;
    public showErrorValidPassword = false;
    public checkPassword(event: any) {
        var text = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+$/;
        var data = event.target.value;

        if (data.match(text)) {
            // SE COMPRUEBA QUE ES TEXTO.
            this.isValidPassword = true;
            this.showErrorValidPassword = false;
        } else {
            if (data == "") {
                // SE COMPRUEBA QUE NO HAY DATO.
                this.isValidPassword = false;
                this.showErrorValidPassword = false;
                this.btnState = true;
            } else {
                 // SE COMPRUEBA QUE NO ES TEXTO.
                this.isValidPassword = false;
                this.showErrorValidPassword = true;
            }
        }
        this.verifyValuesInputs();
    }

    public verifyValuesInputs() {
        if (
            this.isValidEmaiOrPhone &&
            this.isValidFullname &&
            this.isValidUsername &&
            this.isValidPassword
        ) {
            this.btnState = false;
        }
    }
}
