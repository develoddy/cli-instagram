import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.css']
})
export class BirthdayComponent {

  @Output() showCodePhoneEvent = new EventEmitter();

  @Output() backEvent = new EventEmitter();

  public continueViewCodePhone(day: any, month: any, year: any) {
    this.showCodePhoneEvent.emit(
      {
        "day": day,
        "month": month,
        "year": year
      }
    );
  }

  public sigIn() {}

  public back() {
    this.backEvent.emit("birthdayToAccount");
  }

}
