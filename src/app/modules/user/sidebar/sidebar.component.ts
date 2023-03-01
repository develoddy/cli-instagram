import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ScriptsService } from 'app/services/scripts/scripts.service';
DomSanitizer
ScriptsService

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public title = {
    type: 'primary',
    text: 'Lista de usuario' 
  };

  public cssUrl: string = "";

  constructor(
    public sanitizer: DomSanitizer,
    public _script: ScriptsService
  ) {
    this._script.loadFiles(["sidebar-menu"]);
  }

  ngOnInit(){
    this.cssUrl = '/assets/css/style.css';
    this.cssUrl = '/assets/css/vendors/bootstrap.css';
  }

}
