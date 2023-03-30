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

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  // ESTA FUNCION TE REGRESARÁ A LA VISTA DE LOGUIN.
  public sigIn(data: any) {
    this.router.navigate(['login']);
  }

  // ESTA FUNCION TE MOSTRARÁ LAS VISTA DE BIRTHDAY.
  public showBirthday(data: any) {
    // HAY QUE VALIDAR QUE LOS CAMPOS CONTIENEN DATOS
    this.showBirthDay = !this.showBirthDay;
    this.showAccount = !this.showAccount;
    this.user = data; // Objc
  }

  // ESTA FUNCION TE MOSTRARÁ LA VISTA DE CODEPHONE.
  public showViewCodePhone(data: any) {
    this.showCodePhone = !this.showCodePhone;
    this.showBirthDay = !this.showBirthDay;
    this.birthDay = data; // Objc - 20 ene 2023
  }

  // ESTA FUNCIÓM TE REGRESARÁ A LA VISTA DE ACCOUNT.
  public backAccount(data: any) {
    this.showAccount = true;
    this.showBirthDay = false;
  }

  // ESTA FUNCIÓN TE REGRESARÁ A LA VISTA BIRTHDAY.
  public backBirthday(data: any) {
    this.showBirthDay = false;
    this.showAccount = true;
    this.showCodePhone = !this.showCodePhone;
  }

  // ESTA FUNCION TE REDIRGE A LA VISTA DEL FEED.
  public showToFeed(data: string) {
    this.codePone = data; // String
  }
}
