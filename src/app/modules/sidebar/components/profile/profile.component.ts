import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from "@core/http/authentication.service";
import { ScriptsService } from "app/services/scripts/scripts.service";
import { Post } from "@data/models/post";
import { UserService } from "@data/services/api/user.service";
import { PostService } from "@data/services/api/post.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { User } from "@data/models/user";
import * as moment from "moment";
import * as $ from "jquery";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {

    // TODO: ===== Properties =====
    public cssUrl: string = "";
    public identity = null;
    public posts: Post[] = [];
    public user: User;
    public currentUser: any;

    // TODO: ===== Lifecycle =====
    constructor(
        public _loadScripts: ScriptsService,
        public sanitizer: DomSanitizer,
        private authService: AuthenticationService,
        private userService: UserService,
        private postService: PostService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.loadScripts();
        this.fetchUser(this.route.snapshot.paramMap.get("username")!);
        
        /*const params = this.router.getCurrentNavigation()?.extras.state;
        if ( params ) {}*/
    }

   
    ngOnInit() {
        this.loadCSS();
    }

    // TODO: ===== ViewModel =====
    private fetchPostsByUid( uid: string ) {
        this.postService.fetchPostsByUid(uid).subscribe((snapshot) => {
            this.posts = snapshot;
        });
    }

    /**
     * @description: Se recupera los datos del usuario por la propiedad username
     * @param username 
     */
    public fetchUser( username: string ) {
        this.userService.fetchUserByUsername( username ).subscribe(( snapshot ) => {
            this.user = snapshot[0];
            this.fetchPostsByUid(this.user.uid!);
        });
    }
    
     // TODO: ===== Helpers =====
    /**
     * @description Se carga los ficheros de estilos.
     */
    private loadCSS() {
        this.cssUrl = "/assets/css/responsive.css";
    }

    /**
     * @description Se carga los scripts.
     */
    private loadScripts() {
        this._loadScripts.loadFiles(["icons/feather-icon/feather.min"]);
        this._loadScripts.loadFiles(["icons/feather-icon/feather-icon"]);
        this._loadScripts.loadFiles(["jquery-3.5.1.min"]);   
    }

    /**
     * @description Se recupera todas las publicaciones 
     * para mostrarlos en el feed.
     */
    private fetchData() {
        this.postService.fetchPosts().subscribe(res => {
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
