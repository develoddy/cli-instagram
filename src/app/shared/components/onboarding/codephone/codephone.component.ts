import { Component, Output, Input, EventEmitter, OnInit } from "@angular/core";

@Component({
    selector: "app-codephone",
    templateUrl: "./codephone.component.html",
    styleUrls: ["./codephone.component.css"],
})
export class CodephoneComponent implements OnInit {
    @Output() codePhoneEvent = new EventEmitter();
    @Output() backEvent = new EventEmitter();
    @Input() user: any;
    @Input() phone: string;
    @Input() spinner: any;
    @Input() showTextContinue: any;

    public checkNumberOrletter: boolean;
    public email: string = "";
    //public phone: string = "";
    public btnState = true;

    ngOnInit() {
        this.checkNumberOrletter = isNaN(this.user.emailOrPhone);
    }

    public isValidCodePhone: boolean = false;
    public checkCodePhone(event: any) {
        var numeric = /^[0-9]+$/;
        var data = event.target.value;

        //COMPROBAR NUMERO DE MOVIL PARA SPAIN.
        if (data.match(numeric) && data.length == 6) {
            // SE COMPRUEBA QUE SI ES NUMÉRICO
            this.btnState = false;
            this.isValidCodePhone = false;
        } else {
            if (data.match(numeric) && (data.length < 6 || data.length > 6)) {
                this.btnState = true;
                this.isValidCodePhone = true;
            } else {
                // ES COMPRUEBA QUE NO ES NUMÉRICO Y ESTÁ VACIO EL CAMPO.
                if (data == "") {
                    this.btnState = true;
                }
            }
        }
    }

    public showToFeed(codePhone: string) {
        
        this.codePhoneEvent.emit(codePhone);
    }

    public back() {
        this.backEvent.emit("codePhoneToBirthday");
    }

}
