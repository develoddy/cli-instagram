import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public cssUrl: string = "";

  constructor( public sanitizer: DomSanitizer ) {

  }

  ngOnInit() {
    this.cssUrl = '/assets/css/responsive.css';
    this.cssUrl = '/assets/css/vendors/themify.css';
  }

}
