import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from "@core/http/authentication.service";
import { ScriptsService } from "app/services/scripts/scripts.service";
import { Post } from "@data/models/post";
import { UserService } from "@data/services/api/user.service";
import { PostService } from "@data/services/api/post.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { User, UserStats } from "@data/models/user";
import * as moment from "moment";
import * as $ from "jquery";
import { ProfileService } from "@data/services/api/profile.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {

    // TODO: _______________________________________________________________________
    // TODO: - Properties
    public spinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public cssUrl: string = "";
    public identity = null;
    public currentUser: any;
    public noDataPosts: boolean = false;
    public followersTotal = 0;
    public followingsTotal = 0;
    public postsTotal = 0;
    clientesSubscription: Subscription;
    public posts: Post[] = [];
    public user: User;
    public stats: UserStats = { followers: 0, followings: 0, posts: 0 };
    public followButtonText: string = "";

    // TODO: _______________________________________________________________________
    // TODO: - Lifecycle
    constructor(
        public _loadScripts: ScriptsService,
        public sanitizer: DomSanitizer,
        private authService: AuthenticationService,
        private userService: UserService,
        private postService: PostService,
        private route: ActivatedRoute,
        private router: Router,
        private profileService: ProfileService
    ) {
        this.fetchUser(this.route.snapshot.paramMap.get("username")!);

        
    }

   
    ngOnInit() {
    }

    // TODO: _______________________________________________________________________
    // TODO: - ViewModel 
    private fetchPostsByUid( uid: string ) {
        this.spinner.next(true);
        this.clientesSubscription = this.postService.fetchPostsByUid(uid).subscribe((snapshot) => {
            this.spinner.next(false);
            this.posts = snapshot;
            if ( this.posts.length == 0 ) {
                this.noDataPosts = true;
            }
        });
    }

    /**
     * @description: Se recupera los datos del usuario por la propiedad username
     * @param username 
     */
    public fetchUser( username: string ) {
        this.spinner.next(true);
        this.clientesSubscription = this.userService.fetchUserByUsername( username ).subscribe(( snapshot ) => {
            this.spinner.next(false);
            this.user = snapshot[0];
            this.fetchPostsByUid(this.user.uid!);
            this.fetchUserStats();

            if ( this.checkIfItsYourProfile() ) {
                this.followButtonText = "Edit Profile";
            } else  {
                let currentUserUID =  this.authService.getIdentity().uid;
                let userUID = this.user.uid!;
                this.profileService.checkIfUserIsFollowed(currentUserUID, userUID ).subscribe ( (snapshot) => {
                    let user = new User();
                    user.isFollwed = snapshot.payload.exists;
                    this.followButtonText = user.isFollwed ? "Following" : "Follow";
                });
            }
        });
    }

    /**
     * @description: Se recupera el total stats.
     */
    public fetchUserStats() {
        if ( this.user ) {
            var uid = this.user.uid!;
            this.clientesSubscription = this.profileService.fetchFollowersStat(uid).subscribe( ( snapshot) => {
                this.followersTotal = snapshot.length;

                this.clientesSubscription = this.profileService.fetchFollowingsStat(uid).subscribe( ( snapshot) => { 
                    this.followingsTotal = snapshot.length;
                    
                    this.clientesSubscription = this.profileService.fetchPostsStat(uid).subscribe( ( snapshot) => { 
                        this.postsTotal = snapshot.length;
                        // e obtiene todos los stats
                        this.stats.followers = this.followersTotal;
                        this.stats.followings = this.followingsTotal;
                        this.stats.posts = this.postsTotal;
                        //Se asigna los datos del stats a la propiedad stats del User.stats
                        this.user.stats = this.stats;
                    });
                });
            });
        }
    }

    /**
     * @description Se verifica si el usuario actual ha entrado en su perfil o 
     *  ha entrado a otro perfil
     * @returns True or False
     */
    public checkIfItsYourProfile(): boolean {
        return this.authService.getIdentity().uid == this.user.uid;
    }

    // TODO: _______________________________________________________________________
    // TODO: - Helpers

    /**
     * @description Se recupera todas las publicaciones 
     * para mostrarlos en el feed.
     */
    private fetchData() {
        this.clientesSubscription = this.postService.fetchPosts().subscribe(res => {
            this.posts = [];
            res.forEach( (element:any) => {
                this.posts.push({
                  id: element.payload.doc.id,
                  ...element.payload.doc.data()
                })
            });
        });
    }

    ngOnDestroy() {
        // acciones de destrucción
        if (this.clientesSubscription) {
            this.clientesSubscription.unsubscribe();
            console.log("DEBUG: ngDestroy profile.component");
            console.log(this.clientesSubscription.unsubscribe);
        }
    }
}
