import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-codephone',
  templateUrl: './codephone.component.html',
  styleUrls: ['./codephone.component.css'],
})
export class CodephoneComponent {

  @Output() codePhoneEvent = new EventEmitter();
  @Output() backEvent = new EventEmitter();

  public showToFeed(codePhone: string) {
    this.codePhoneEvent.emit(codePhone)
  }

  public back() {
    this.backEvent.emit("codePhoneToBirthday");
  }
}
