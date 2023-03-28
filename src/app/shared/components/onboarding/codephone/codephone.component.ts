import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-codephone',
  templateUrl: './codephone.component.html',
  styleUrls: ['./codephone.component.css'],
})
export class CodephoneComponent {
  @Output() loginEvent = new EventEmitter();

  public signIn() {}

  public login() {
    this.loginEvent.emit('loginEvent');
  }
}
