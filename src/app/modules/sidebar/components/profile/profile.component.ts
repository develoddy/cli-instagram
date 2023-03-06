import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from "@core/http/authentication.service";
import { ScriptsService } from "app/services/scripts/scripts.service";
import { Post } from "@data/models/post";
//import { ReqResUser, User } from "@data/models/user";
import { UserService } from "@data/services/api/user.service";
import { PostService } from "@data/services/api/post.service";
import * as moment from "moment";
import * as $ from "jquery";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { User } from "@data/models/user";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
    // TODO: PROPERTIES
    public cssUrl: string = "";
    public identity = null;
    public posts: Post[] = [];
    public user: User;
    public currentUser: any;

    coche: {marca: string, modelo: string};

    // TODO: LIFECYCLE
    constructor(
        public _loadScripts: ScriptsService,
        public sanitizer: DomSanitizer,
        private authService: AuthenticationService,
        private userService: UserService,
        private _postService: PostService,
        private route: ActivatedRoute,
        private router: Router
    ) {

        this.loadCSS();

        var username = this.route.snapshot.paramMap.get("username"); //this.route.snapshot.params[0].username;
        console.log("DEBUG: Param Profile");
        console.log(username);
        
        this.fetchUser(username!);


        /*const params = this.router.getCurrentNavigation()?.extras.state;
        if ( params ) {
            this.currentUser = params;
            console.log("DEBUG: Params lleno..");
            console.log(this.currentUser );
            
        } else {
            console.log("DEBUG: Params vacio..");
            this.getCurrentUser();
        }*/
    }

    // TODO: HELPERS
    ngOnInit() {
        this.cssUrl = "/assets/css/responsive.css";
        this.fetchData()
    }

    public fetchUser( username: string ) {
        this.userService.fetchUserByUsername( username ).subscribe(( snapshot ) => {
            this.user = snapshot[0];
        });
    }
    

    public getCurrentUser() {
        this.authService.getCurrentUser().subscribe((snapshot) => {
            this.currentUser = snapshot.data();           
            console.log("DEBUG: getCurrentUser");
            console.log(this.currentUser);
        });
      }

    loadCSS() {
        this._loadScripts.loadFiles(["icons/feather-icon/feather.min"]);
        this._loadScripts.loadFiles(["icons/feather-icon/feather-icon"]);
        this._loadScripts.loadFiles(["jquery-3.5.1.min"]);   
    }

    /***
     * fetchData
     * @Param page
     * @Param adding
     * @Return
     */
    private fetchData() {
        this._postService.fetchPosts().subscribe(res => {
            this.posts = [];
            res.forEach( (element:any) => {
                this.posts.push({
                  id: element.payload.doc.id,
                  ...element.payload.doc.data()
                })
            });
        });
    }
}
