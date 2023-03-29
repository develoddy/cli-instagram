import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  public btnState = true;
  public cssUrl: string = '';

  @Output() sigInEvent = new EventEmitter();
  @Output() showBirthdayEvent = new EventEmitter();

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.cssUrl = 'assets/css/font-awesome.css';
  }

  public sigIn() {
    this.sigInEvent.emit('sigIn');
  }

  public showBirthday(username: string, password: string) {
    this.showBirthdayEvent.emit({ username: username, password: password });
  }

  public checkEmailOrPhone(event: any) {
    var data = event.target.value;

    var numeric = /^[0-9]+$/;
    var email =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (data.match(numeric)) {
      console.log('Es numérico');
    } else {
      // NO ES NUMÉRICO
      console.log('No es numérico');

      // SE COMPRUEBA SI ES UN EMAIL O NO
      if (data.match(email)) {
        console.log('La dirección de email ' + data + ' es correcta.');
      } else {
        console.log('La dirección de email es incorrecta.');
      }
    }
  }
}
