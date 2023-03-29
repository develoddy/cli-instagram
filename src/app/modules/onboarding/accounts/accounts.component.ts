import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/http/authentication.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {

  public showBirthDay = false;
  public showAccount = true;
  public showCodePhone = false;
  public user: any; // OBTENER LOS DATOS DEL VIEW ACCOUNT
  public birthDay: any; // OBTENER LOS DATOS DEL CUMPLEAÑOS DEL USUARIO
  public codePone: string;

  constructor(public authService: AuthenticationService, private router: Router) {}

  ngOnInit() {}

  public sigIn(data: any) {
    this.router.navigate(['login']);
  }

  public showBirthday(data: any) {
    
    this.showBirthDay = !this.showBirthDay;
    this.showAccount = !this.showAccount;
    this.user = data; // Objc
  }

  public showViewCodePhone(data: any) {
    this.showCodePhone = !this.showCodePhone;
    this.showBirthDay = !this.showBirthDay;  
    this.birthDay = data; // Objc - 20 ene 2023
  }

  public showToFeed( data: string ) {
    this.codePone = data; // String
  }

  public backAccount(data:any) {
    this.showAccount = true;
    this.showBirthDay = false; 
  }

  public backBirthday(data: any) {
    this.showBirthDay = false;
      this.showAccount = true;
      this.showCodePhone = !this.showCodePhone;
  }
}
