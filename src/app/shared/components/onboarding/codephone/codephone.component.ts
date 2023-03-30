import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-codephone',
  templateUrl: './codephone.component.html',
  styleUrls: ['./codephone.component.css'],
})
export class CodephoneComponent implements OnInit {

  @Output() codePhoneEvent = new EventEmitter();
  @Output() backEvent = new EventEmitter();
  @Input() user: any;
  @Input() birthDay: any;
  public checkNumberOrletter: boolean;

  public email: string = "";
  public phone: string = "";

  ngOnInit() {
    console.log("DEBUG: component.codePhone : ");
    console.log(this.user);
    console.log(this.birthDay);

    this.checkNumberOrletter = isNaN(this.user.emailOrPhone);
  }

  public showToFeed(codePhone: string) {
    this.codePhoneEvent.emit(codePhone)
  }

  public back() {
    this.backEvent.emit("codePhoneToBirthday");
  }
}
