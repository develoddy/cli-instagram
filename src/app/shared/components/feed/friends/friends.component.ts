import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthenticationService } from "@core/http/authentication.service";
import { User } from "@data/models/user";

@Component({
    selector: "app-friends",
    templateUrl: "./friends.component.html",
    styleUrls: ["./friends.component.css"],
})
export class FriendsComponent implements OnInit {
    @Input() users_followings: string[] = [];
    @Input() users: User[] = [];
    @Output() followedEvent = new EventEmitter();
    @Output() unfollowedEvent = new EventEmitter();
    @Output() linkEvent = new EventEmitter();
    public followUserOver: any;

    constructor(public authService: AuthenticationService) {}

    ngOnInit() {
        console.log("DEBUG: FriendsComponent load..");
    }

    /**
     * @desc
     * @param followedId
     */
    public followUser(followedId: number) {
        this.followedEvent.emit(followedId);
    }

    /**
     * @desc
     * @param followedId
     */
    public unfollowUser(followedId: number) {
        this.unfollowedEvent.emit(followedId);
    }

    /**
     * AL PASAR EL RATON SOBRE EL BOTON FOLLOWING SE DETECTA EL USER DEL ID
     * @param user_id
     */
    mouseEnter(user_id: string) {
        this.followUserOver = user_id;
    }

    /**
     * AL PASAR EL RATON SOBRE EL BOTON FOLLOWING SE DETECTA EL USER DEL ID
     * @param user_id
     */
    mouseleave(user_id: string) {
        this.followUserOver = 0;
    }

    public navigate(username: string) {
        this.linkEvent.emit({ username: username });
    }
}
