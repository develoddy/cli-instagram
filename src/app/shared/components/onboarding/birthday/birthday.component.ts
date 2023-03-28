import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.css']
})
export class BirthdayComponent {

  @Output() showCodePhoneEvent = new EventEmitter();

  public continueViewCodePhone() {
    this.showCodePhoneEvent.emit("showCodePhoneEvent");
  }

  public sigIn() {
    
  }

}
