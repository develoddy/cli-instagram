import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ScriptsService } from 'app/services/scripts/scripts.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public cssUrl: string = "";

  constructor( public _loadScripts: ScriptsService, public sanitizer: DomSanitizer  ) {
    this._loadScripts.loadFiles(["icons/feather-icon/feather.min"]);
    this._loadScripts.loadFiles(["icons/feather-icon/feather-icon"]);
    //this._loadScripts.loadFiles(["owlcarousel/owl-custom"]);
  }

  ngOnInit() {
    this.cssUrl = '/assets/css/responsive.css';
  }

}
