import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent {


  public cssUrl: string = "";

  constructor( public sanitizer: DomSanitizer ) {

  }

  ngOnInit() {
  }
}
