import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from "@core/http/authentication.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { User, UserStats } from "@data/models/user";
import { Post } from "@data/models/post";
import { UserService } from "@data/services/api/user.service";
import { PostService } from "@data/services/api/post.service";
import { ProfileService } from "@data/services/api/profile.service";
// import { ScriptsService } from 'app/services/scripts/scripts.service';
import * as moment from "moment";
import * as $ from "jquery";
import { ScriptsService } from "app/services/scripts/scripts.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {

    // ---------------------- [ PORPERTIES ] ------------------------------
    public spinner              : BehaviorSubject<boolean> = new BehaviorSubject(false);
    public cssUrl               : string = "";
    public currentUser          : any;
    public noDataPosts          : boolean = false;
    private clientesSubscription: Subscription;
    public posts                : Post[] = [];
    public user                 : User;
    public stats                : UserStats = { followers: 0, followings: 0, posts: 0 };
    public followButtonText     : string = "";
    public username             : string = "";
    public followersTotal       = 0;
    public followingsTotal      = 0;
    public postsTotal           = 0;
    public identity             = null;

    // ---------------------- [ LIFECYCLE ] ------------------------------
    constructor(
        public sanitizer        : DomSanitizer,
        private authService     : AuthenticationService,
        private userService     : UserService,
        private postService     : PostService,
        private route           : ActivatedRoute,
        private router          : Router,
        private profileService  : ProfileService,
        public scripts          : ScriptsService,
    ) {
        this.username = this.route.snapshot.paramMap.get("username")!; 
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {
        this.setupView()
    }

    // ---------------------- [ VIEWMODEL ] ------------------------------
    /**
     * @desc Get data user.
     * @param
     * @return promise
     **/
    public fetchUser() {
        this.spinner.next(true);
        this.clientesSubscription = this.userService.fetchUserByUsername(this.username).subscribe(( snapshot ) => {
            this.spinner.next(false);
            this.user = snapshot[0];
            this.fetchPostsByUid(this.user.uid!);
            this.fetchUserStats();
            this.checkIfUserIsFollowed();
        });
    }

    /**
     * @desc Get all the posts of the user profile we visited.
     * @param uid
     * @return
     **/
    private fetchPostsByUid( uid: string ) {
        this.spinner.next(true);
        this.clientesSubscription = this.postService.fetchPostsByUid(uid).subscribe((snapshot) => {
            this.spinner.next(false);
            this.posts = snapshot;
            console.log(this.posts);
            
            if ( this.posts.length == 0 ) {
                console.log("DEBUG: Profile.componente -> No hay posts" )
                this.noDataPosts = true;
            }
        });
    }

    /**
     * @desc Get the total stats of the connected user
     * @param uid
     * @return
     **/
    public fetchUserStats() {
        if ( this.user ) {
            var uid = this.user.uid!;
            this.clientesSubscription = this.profileService.fetchFollowersStat(uid).subscribe( ( snapshot ) => {
                this.followersTotal = snapshot.length;

                this.clientesSubscription = this.profileService.fetchFollowingsStat(uid).subscribe( ( snapshot ) => { 
                    this.followingsTotal = snapshot.length;
                    
                    this.clientesSubscription = this.profileService.fetchPostsStat(uid).subscribe( ( snapshot ) => { 
                        this.postsTotal = snapshot.length;

                        // SE RECUPERA TODOS LOS STATS.
                        this.stats.followers = this.followersTotal;
                        this.stats.followings = this.followingsTotal;
                        this.stats.posts = this.postsTotal;
                        this.user.stats = this.stats;
                    });
                });
            });
        }
    }


    // ---------------------- [ HELPERS ] ------------------------------
    /**
     * @desc
     * @param
     */
    private setupView() {
        this.fetchUser();
        //this.loadScripts();
        //this.loadCss();
        
    }

    /**
     * @desc
     * @param
     */
    private loadCss() {
        this.cssUrl = "/assets/css/vendors/photoswipe.css";
    }

    /**
     * @desc
     * @param
     */
    private loadScripts() {
        console.log("Load script....");
        this.scripts.loadFiles(["photoswipe/photoswipe.min"]);
        this.scripts.loadFiles(["photoswipe/photoswipe-ui-default.min"]);
        this.scripts.loadFiles(["photoswipe/photoswipe"]);
    }

    /**
     * @desc Verificar si el usuario actual se encuentra en su perfil 
     * o si ha entrado a otro perfil y comprobar si sigue a otro o lo 
     * están siguiendo.
     * @param uid
     * @return
     **/
    private checkIfUserIsFollowed() {
        if ( this.checkIfItsYourProfile() ) {
            this.followButtonText = "Edit Profile";
        } else  {
            let currentUserUID =  this.authService.getIdentity().uid;
            let userUID = this.user.uid!;
            this.profileService.checkIfUserIsFollowed( currentUserUID, userUID ).subscribe ( ( snapshot ) => {
                let user = new User();
                user.isFollwed = snapshot.payload.exists;
                this.user.isFollwed = user.isFollwed;
                this.followButtonText = user.isFollwed ? "Following" : "Follow";
            });
        }
    }

    /**
     * @desc Verificar si el usuario actual se encuentra en su perfil 
     * o si ha entrado a otro perfil y comprobar si sigue a otra persona o si lo 
     * están siguiendo al perfil actualemente conectado.
     * @param uid
     * @return
     **/
    public checkIfItsYourProfile(): boolean {
        return this.authService.getIdentity().uid == this.user.uid;
    }


    // ---------------------- [ ACTIONS ] ------------------------------
    /**
     * @desc Verificar si el usuario actual se encuentra en su perfil 
     * o si ha entrado a otro perfil y comprobar si sigue a otra persona o si lo 
     * están siguiendo al perfil actualemente conectado.
     * @param uid
     * @return
     **/
    public didTapActionbuttonfor(user: User) {
        if ( this.checkIfItsYourProfile() ) {
            console.log("DEBUG: Show edit profile here..");
            // NAVEGAR AL COMPONENTE EDITAR PERFIL..
        } else {
            if ( user.isFollwed ) {
                // FOLLOWING -> FOLLOW
                // SI EL PERFIL QUE SE VISITA, EL USUARIO ACTUAL LE SIGUE ENTONCES AL DAR CLICK EN EL BOTON "FOLLOWINGS" PASARÁ DE TRUE A FALSE Y SE DEJARÁ DE SEGUIR AL USUARIO.
                // SE LLAMARÁ AL SERVICIO DE DEJAR DE SEGUIR AL USUARIO.
            } else {
                // FOLLOW -> FOLLOWINGS
                // SI EL PERFIL QUE SE VISITA, EL USUARIO ACTUAL NO LE SIGUE ENTONCES AL DAR CLICK EN EL BOTON "FOLLOW" PASARÁ DE FALSE A TRUE Y SE DEJARÁ DE SEGUIR AL USUARIO.
                // SE LLAMARÁ AL SERVICIO DE SEGUIR AL USUARIO.
            }
        }
    }

    /**
     * @desc Action de destrucción.
     * @param uid
     * @return
     **/
    ngOnDestroy() {
        if (this.clientesSubscription) {
            this.clientesSubscription.unsubscribe();
            console.log(this.clientesSubscription.unsubscribe);
        }
    }
}
