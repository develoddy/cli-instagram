import { Component , OnInit } from '@angular/core';
import { ScriptsService } from 'app/services/scripts/scripts.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  public cssUrl: string = "";

  constructor(
    private _loadScripts: ScriptsService,
    public sanitizer: DomSanitizer, 
  ) {
    this._loadScripts.loadFiles(["animation/aos/aos-init"]);
    this._loadScripts.loadFiles(["animation/aos/aos"]);
    this._loadScripts.loadFiles(["isotope.pkgd"]);
    this._loadScripts.loadFiles(["script"]);
    this._loadScripts.loadFiles(["photoswipe/photoswipe"]);
  }

  ngOnInit() {
    this.cssUrl = '/assets/css/vendors/aos.css';
    this.cssUrl = '/assets/css/vendors/photoswipe.css';

  }

  ngDoCheck() {
    // this.cssUrl = '/assets/css/vendors/aos.css';
    // this._loadScripts.loadFiles(["animation/aos/aos-init"]);
    // this._loadScripts.loadFiles(["animation/aos/aos"]);
    // this._loadScripts.loadFiles(["isotope.pkgd"]);
  }

}
