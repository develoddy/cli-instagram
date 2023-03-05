import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { AuthenticationService } from '@core/http/authentication.service';
import { PostService } from '@data/services/api/post.service';
import { ScriptsService } from 'app/services/scripts/scripts.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit  {
  public cssUrl: string = "";
  public identity = null;

  constructor( 
    public _loadScripts: ScriptsService, 
    public sanitizer: DomSanitizer,
    private _auth: AuthenticationService,
    private _router: Router,
    private _postsService: PostService
  ) {
    this._loadScripts.loadFiles(["sidebar-menu"]);
    this._loadScripts.loadFiles(["icons/feather-icon/feather.min"]);
    this._loadScripts.loadFiles(["icons/feather-icon/feather-icon"]);
    this._loadScripts.loadFiles(["script"]);
    this.identity = this._auth.getIdentity();
  }

  ngOnInit() {
    this.cssUrl = '/assets/css/responsive.css';
    this.cssUrl = '/assets/css/vendors/themify.css';
    this.cssUrl = '/assets/css/vendors/flag-icon.css';
  }
}
