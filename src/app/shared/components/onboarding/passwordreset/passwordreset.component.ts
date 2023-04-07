import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})

export class PasswordresetComponent {

  @Output() gotoPassAccountEvent = new EventEmitter();
  @Output() backRsetPasswordEvent = new EventEmitter();

  public gotoViewAccount() {
    this.gotoPassAccountEvent.emit({passwordReset: "passwordReset"})
  }

  public onReset(data: any) {
    this.backRsetPasswordEvent.emit({
      reset: data
    })
  }
}