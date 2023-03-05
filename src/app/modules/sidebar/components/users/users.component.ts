import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from "@core/http/authentication.service";
import { ScriptsService } from "app/services/scripts/scripts.service";
import { ReqResUser, User } from "@data/models/user";
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
  public identity = null;
  public url = "";
  public page = 0;
  public limit = 0;
  public status = "";
  public userSubscription: any;
  public currentPage = 0;
  public totalItems = 0;
  public totalPages = 0;
  public profiles: User[] = [];
  public followings: any[] = [];
  public data?: ReqResUser;

  // TODO: LIFECYCLE
  constructor(
      public _loadScripts: ScriptsService,
      public sanitizer: DomSanitizer,
      private _auth: AuthenticationService,
      private _userService: UserService
  ) {
      this._loadScripts.loadFiles(["icons/feather-icon/feather.min"]);
      this._loadScripts.loadFiles(["icons/feather-icon/feather-icon"]);
      this._loadScripts.loadFiles(["jquery-3.5.1.min"]);
      this.identity = this._auth.getIdentity();
  }

  ngOnInit() {
      this.cssUrl = "/assets/css/responsive.css";
      this.getUsers(0);
  }

  // TODO: HELPERS

  /***
   * Get Publicationes
   * @Param page
   * @Param adding
   * @Return
   */
  getUsers( page: number ) {
      this._userService.getUsers(page).subscribe(
        ( response ) => {
            this.data = response!;
            this.totalItems = this.data?.users.totalItems!;
            this.profiles = this.data?.users.profiles!;
            this.totalPages = this.data?.users.totalPages!;
            this.followings = this.data?.followings!;
      });
  }
}
