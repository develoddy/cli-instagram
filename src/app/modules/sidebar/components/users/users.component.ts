import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from "@core/http/authentication.service";
import { ScriptsService } from "app/services/scripts/scripts.service";
import { User } from "@data/models/user";
//import { UserService } from "@data/services/api/user.service";
//import { PostService } from "@data/services/api/post.service";
import { FollowService } from '@data/services/api/follow.service';
import * as moment from "moment";
import * as $ from "jquery";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 
  public cssUrl           : string = "";
  public users_followings : User[] = [];

 
  constructor(
    private followService : FollowService,
    private authService   : AuthenticationService,
    public scripts    : ScriptsService,
    public sanitizer      : DomSanitizer,
  ) {
      // this._loadScripts.loadFiles(["icons/feather-icon/feather.min"]);
      // this._loadScripts.loadFiles(["icons/feather-icon/feather-icon"]);
      // this._loadScripts.loadFiles(["jquery-3.5.1.min"]);
      //this.scripts.loadFiles(["loader"]);
  }

  ngOnInit() {
    // this.cssUrl = "/assets/css/responsive.css";
    // this.cssUrl = "/assets/css/vendors/bootstrap.css";
    // <link rel="stylesheet" type="text/css" href="assets/css/vendors/bootstrap.css"/>

    this.fetchFollowings();
  }

  private fetchFollowings() {
    let uid = this.authService.getIdentityUID(); 
    this.followService.fetchFollowings( uid ).subscribe( res => {
      res.forEach( ( element:any ) => {
        this.users_followings.push({
          // id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });

      //console.log("DEBUG: UsersComponent load...");
      //console.log(this.users_followings);
    });
  }

}
