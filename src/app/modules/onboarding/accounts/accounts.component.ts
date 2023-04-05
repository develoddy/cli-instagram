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
  public showAccount: boolean = true;
  public showBirthDay: boolean = false;
  public showProfilePicture: boolean = false;
  public showPhoneNumber: boolean = false;
  public showCodePhone: boolean = false;
  
  
  public user: any; // OBTENER LOS DATOS DEL VIEW ACCOUNT
  public birthDay: any; // OBTENER LOS DATOS DEL CUMPLEAÑOS DEL USUARIO
  public codePone: string; // GET DATA CODEPHONE
  public phone: string; // GET DATA NUMBERPHONE
  public profileImageURL: string;

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  // ESTA FUNCION TE REGRESARÁ A LA VISTA DE LOGUIN.
  public sigIn(data: any) {
    this.router.navigate(['login']);
  }

  /* ---- Button continue ---- */

  // ESTA FUNCION TE MOSTRARÁ LA VISTA DE BIRTHDAY.
  public showBirthday(data: any) {
    this.user = data;
    this.showAccount = false;
    this.showBirthDay = true;
    this.showPhoneNumber = false;
    this.showCodePhone = false;
    this.showProfilePicture = false;
  }

  public showViewProfilePicture(data: any) {
    this.birthDay = data; 
    this.showAccount = false;
    this.showBirthDay = false;
    this.showProfilePicture = true;
    this.showPhoneNumber = false;
    this.showCodePhone = false;
  }

  public showViewNumberPhone(data: any) {
    this.profileImageURL = data.path;
    this.showAccount = false;
    this.showBirthDay = false;
    this.showProfilePicture = false;
    this.showPhoneNumber = true;
    this.showCodePhone = false;
  }

  // ESTA FUNCION TE MOSTRARÁ LA VISTA DE CODEPHONE.
  public showViewCodePhone(data: any) {
    this.phone = data.phone;
    this.showAccount = false;
    this.showBirthDay = false;
    this.showProfilePicture = false;
    this.showPhoneNumber = false;
    this.showCodePhone = true;
  }

  /* ---- Button continue end ---- */

  /* ---- Button back ---- */

  // ESTA FUNCIÓM TE REGRESARÁ A LA VISTA DE ACCOUNT.
  public backAccount(data: any) {
    this.showAccount = true;
    this.showBirthDay = false;
    this.showProfilePicture = false;
    this.showPhoneNumber = false;
    this.showCodePhone = false;
  }

  // ESTA FUNCIÓN TE REGRESARÁ A LA VISTA BIRTHDAY.
  // ProfilePicture -> Birhtday
  public backBirthday(data: any) {
    this.showAccount = false;
    this.showBirthDay = true;
    this.showProfilePicture = false;
    this.showPhoneNumber = false;
    this.showCodePhone = false;
  }

  public backProfilePicture(data: any) {
    this.showAccount = false;
    this.showBirthDay = false;
    this.showProfilePicture = true;
    this.showPhoneNumber = false;
    this.showCodePhone = false;
  }


  // ESTA FUNCIÓN TE REGRESARÁ A LA VISTA DE NUMBER PHONE.
  public backNumberPhone(data: any) {
    this.showAccount = false;
    this.showBirthDay = false;
    this.showProfilePicture = false;
    this.showPhoneNumber = true;
    this.showCodePhone = false;
  }
  
  // ESTA FUNCION TE REDIRGE A LA VISTA DEL FEED.
  public showToFeed(data: string) {
    this.codePone = data; 
    console.log(this.user);
    console.log(this.birthDay);
    console.log(this.codePone);
    console.log(this.phone);
    console.log(this.profileImageURL);

    // REGISTER USER
    this.authService.SignUp(
      this.user.emailOrPhone, 
      this.user.password, 
      this.user.fullname, 
      this.phone, 
      this.profileImageURL, 
      this.user.username
    )
  }

  /* ---- Button back end ---- */
}
