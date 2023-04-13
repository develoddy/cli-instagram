import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from "@core/http/authentication.service";
import { ScriptsService } from "app/services/scripts/scripts.service";
import { User } from "@data/models/user";
import { UserService } from "@data/services/api/user.service";
import { FollowService } from "@data/services/api/follow.service";
import { Router } from "@angular/router";
import * as moment from "moment";
import * as $ from "jquery";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
    // ---------------------- [ PORPERTIES ] ------------------------------
    public cssUrl           : string = "";
    public users_followings : string[] = [];
    public users_followers  : User[] = [];
    public users: User[]    = [];

    // ---------------------- [ LIFECYCLE ] ------------------------------
    constructor(
        private followService   : FollowService         ,
        private usersService    : UserService           ,
        private authService     : AuthenticationService ,
        public scripts          : ScriptsService        ,
        public sanitizer        : DomSanitizer          ,
        private router          : Router
    ) {}

    ngOnInit() {
        this.fetchFollowings();
        this.fetchAllUsers();
    }

    // ---------------------- [ VIEWMODEL ] ------------------------------
    /**
     * @des Fetch all users.
     * Se agrega los usuarios al array de User
     * con la condicion que sean todos excepto el current user.
     * @parm
     * @return
     **/
    private fetchAllUsers() {
        this.usersService.fetchAllUsers().subscribe((res) => {
            res.forEach((element: any) => {
                if (
                    element.payload.doc.data().uid !=
                    this.authService.getIdentityUID()
                ) {
                    this.users.push({ ...element.payload.doc.data() });
                }
            });
        });
    }

    /**
     * @des Fetch followings.
     * @parm
     * @return
     **/
    private fetchFollowings() {
        let uid = this.authService.getIdentityUID();
        this.followService.fetchFollowings(uid).subscribe((res) => {
            res.forEach((element: any) => {
                this.users_followings.push(element.payload.doc.data().uid);
            });
        });
    }

    /**
     * @des Fetch followers.
     * @parm
     * @return
     **/
    private fetchFollowers() {
        let uid = this.authService.getIdentityUID();
        this.followService.fetchFollowers(uid).subscribe((res) => {
            res.forEach((element: any) => {
                this.users_followers.push({
                    // id: element.payload.doc.id,
                    ...element.payload.doc.data(),
                });
            });
        });
    }

    // ---------------------- [ HELPER ] ------------------------------
    //--
    //--
    //--

    // ---------------------- [ ACTIONS ] ------------------------------
    /**
     * @des Navegar e ir al perfil del usuario clickado.
     * @parm data
     * @return
     **/
    public gotoProfile(data: any) {
        this.router.navigate(["app/profile/", data.username]);
    }
}
