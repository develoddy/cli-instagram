import { Component, Output, Input, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: 'app-phonenumber',
  templateUrl: './phonenumber.component.html',
  styleUrls: ['./phonenumber.component.css']
})
export class PhonenumberComponent implements OnInit {

  @Output() phoneEvent = new EventEmitter();
  @Output() backEvent = new EventEmitter();
  @Input() user: any;
  
  @Input() spinner: any;
  @Input() showTextContinue: any;

  public checkNumberOrletter: boolean;
  public email: string = "";
  public phone: string = "";
  public btnState = true;

  ngOnInit() {
    let numPhone = (document.getElementById("phone") as HTMLInputElement).value;
    console.log("DEBUG; Phone -> " + numPhone.length);
    
    if( numPhone.length != 0 && numPhone.length == 9 ) {
        this.btnState = false;
    }
  }

  public isValidCodePhone: boolean = false;
  public checkCodePhone(event: any) {
    var numeric = /^[0-9]+$/;
    var data = event.target.value;

    //COMPROBAR NUMERO DE MOVIL PARA SPAIN.
    if (data.match(numeric) && data.length == 9) {
        // SE COMPRUEBA QUE SI ES NUMÉRICO
        this.btnState = false;
        this.isValidCodePhone = false;
    } else {
        if (data.match(numeric) && (data.length < 9 || data.length > 9)) {
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

public showViewCodePhone(phone: string) {
  this.phoneEvent.emit({phone : phone});
}

public showToFeed(codePhone: string) {
    //this.codePhoneEvent.emit(codePhone);
}

public back() {
    this.backEvent.emit("codePhoneToBirthday");
}

}
