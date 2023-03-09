import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit  {

  public cssUrl: string = "";

  constructor( public sanitizer: DomSanitizer ) {
  }

  ngOnInit() {
    // this.cssUrl = '/assets/css/responsive.css';
    // this.cssUrl = '/assets/css/vendors/themify.css';
    // this.cssUrl = '/assets/css/vendors/flag-icon.css';
  }

}
