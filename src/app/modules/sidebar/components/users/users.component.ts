import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from "@core/http/authentication.service";
import { ScriptsService } from "app/services/scripts/scripts.service";
import { User } from "@data/models/user";
import { UserService } from "@data/services/api/user.service";
import { PostService } from "@data/services/api/post.service";
import * as moment from "moment";
import * as $ from "jquery";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // TODO: PROPERTIES
  public cssUrl: string = "";
  

  // TODO: LIFECYCLE
  constructor(
      public _loadScripts: ScriptsService,
      public sanitizer: DomSanitizer,
  ) {
      // this._loadScripts.loadFiles(["icons/feather-icon/feather.min"]);
      // this._loadScripts.loadFiles(["icons/feather-icon/feather-icon"]);
      // this._loadScripts.loadFiles(["jquery-3.5.1.min"]);
  }

  ngOnInit() {
      // this.cssUrl = "/assets/css/responsive.css";
      
  }

  // TODO: HELPERS

}
