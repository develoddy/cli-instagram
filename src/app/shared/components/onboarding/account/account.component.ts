import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  @Output() sigInEvent = new EventEmitter();
  @Output() showBirthdayEvent = new EventEmitter();
  

  public sigIn() {
    this.sigInEvent.emit("sigIn");
  }

  public showBirthday(username: string, password: string) {
    this.showBirthdayEvent.emit({"username": username, "password": password});
  }

}
