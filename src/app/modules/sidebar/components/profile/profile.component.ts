import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from "@core/http/authentication.service";
import { ScriptsService } from "app/services/scripts/scripts.service";
import { Post } from "@data/models/post";
import { ReqResUser, User } from "@data/models/user";
import { UserService } from "@data/services/api/user.service";
import { PostService } from "@data/services/api/post.service";
import * as moment from "moment";
import * as $ from "jquery";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
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
    public posts: Post[] = [];
    public profiles: User[] = [];
    public followings: any[] = [];
    public data?: ReqResUser;

    // TODO: LIFECYCLE
    constructor(
        public _loadScripts: ScriptsService,
        public sanitizer: DomSanitizer,
        private _auth: AuthenticationService,
        private _userService: UserService,
        private _postService: PostService
    ) {
        this._loadScripts.loadFiles(["icons/feather-icon/feather.min"]);
        this._loadScripts.loadFiles(["icons/feather-icon/feather-icon"]);
        this._loadScripts.loadFiles(["jquery-3.5.1.min"]);
        this.identity = this._auth.getIdentity();
    }

    ngOnInit() {
        this.cssUrl = "/assets/css/responsive.css";
        console.log("DEBUG: Componente Feed cargado correctamente..");

        this.getPosts(0);
        this.getUsers(0);
    }

    // TODO: HELPERS

    /***
     * Get Publicationes
     * @Param page
     * @Param adding
     * @Return
     */

    private getPosts(page: number, adding = false) {
        this._postService.getPosts(page).subscribe((response) => {
            this.currentPage = response?.response.currentPage!;
            this.totalItems = response?.response.totalItems!;
            this.totalPages = response?.response.totalPages!;

            moment.locale("es");

            response?.response.posts.forEach((element) => {
                element.createdAt = moment(element.createdAt)
                    .startOf("hour")
                    .fromNow();
            });

            if (!adding) {
                this.posts = response?.response.posts!;
                if (this.posts.length == this.totalItems) {
                    this.noMore = true;
                }
            } else {
                var arrayA = this.posts;
                var arrayB = response?.response.posts;
                this.posts = arrayA.concat(arrayB!);
                if (this.posts.length == this.totalItems) {
                    this.noMore = true;
                }

                $("html, body").animate(
                    {
                        scrollTo: $("body").prop("scrollHeight"),
                    },
                    200
                );
            }
        });
    }

    // Ver más publicaciones.
    public noMore = false;
    viewMore(event: any) {
        if (this.posts.length == this.totalItems) {
            this.noMore = true; // true
        } else {
            this.page += 1;
        }
        this.getPosts(this.page, event); // true
    }

    // Get Users.
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
