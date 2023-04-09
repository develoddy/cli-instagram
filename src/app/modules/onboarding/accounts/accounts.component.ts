import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '@core/http/authentication.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  public showAccount        : boolean = false;
  public showBirthDay       : boolean = false;
  public showProfilePicture : boolean = false;
  public showPhoneNumber    : boolean = false;
  public showCodePhone      : boolean = false;
  public showPasswordReset  : boolean = false;
  
  public user               : any; // Get data view account 
  public birthDay           : any; // Get data view birthday 
  public codePone           : string; // Get data view codephone 
  public phone              : string; // Get data view phone 
  public profileImageURL    : string; // get data view profile image

  constructor(
    public authService  : AuthenticationService ,
    private router      : Router                ,
    private route       : ActivatedRoute        ,
  ) {
    const option = this.route.snapshot.paramMap.get("options")!; 
    //option == 'account' ? this.viewAccount() : this.viewPasswordReset();
    option == 'reset' ? this.viewPasswordReset(): this.viewAccount();
  }

  ngOnInit() {}

  private viewAccount() {
    this.showAccount = true;
    this.showBirthDay = false;
    this.showProfilePicture = false;
    this.showPhoneNumber = false;
    this.showCodePhone = false;
    this.showPasswordReset = false;
  }

  private viewPasswordReset() {
    this.showAccount = false;
    this.showBirthDay = false;
    this.showProfilePicture = false;
    this.showPhoneNumber = false;
    this.showCodePhone = false;
    this.showPasswordReset = true;
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

  public showViewPassordReset() {
    this.showAccount = false;
    this.showBirthDay = false;
    this.showProfilePicture = false;
    this.showPhoneNumber = false;
    this.showCodePhone = false;
    this.showPasswordReset = true;
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

  public account() {
    this.router.navigate(['account/emailsignup/']);
  }

  async onReset(data: any) {
    try {
      const email = data.reset;
      //console.log("DEDBUG: data.reset : " + data.reset);
      //console.log("DEBUG: onReset email  componente -> " + email);
      //console.log(data);
      await this.authService.resetPassword(email);
      // Indicar al usuario que se ha enviaddo correctamente el email para restableces el password.
      window.alert("Email setn check your inbox");
      this.router.navigate(['/login']);
      // Redirect to login
    } catch (error) {
      console.log("DEBUG: onReset componente");
      console.log(error); 
      
    }
  }
}
