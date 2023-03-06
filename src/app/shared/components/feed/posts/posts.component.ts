import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { AuthenticationService } from "@core/http/authentication.service";
import { Post } from "@data/models/post";
import { UserService } from "@data/services/api/user.service";

@Component({
      selector: "app-posts",
      templateUrl: "./posts.component.html",
      styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
      // TODO: Properties
      public url: string;
      @Input() posts: any;
      @Input() noMore: boolean = false;

      @Input() identity: any;
      @Output() eventViewMore = new EventEmitter();
      @Output() eventGotoProfile = new EventEmitter();

      // TODO: Lifecycle
      constructor(
            private _userService: UserService,
            private _authService: AuthenticationService
      ) {
            this.url = this._userService.url;
            this.identity = this._authService.getIdentity();
      }

      // TODO: Helpers
      ngOnInit() {}

      viewMore() {
            this.eventViewMore.emit(true);
      }

      gotoProfile( post: Post ) {
            this.eventGotoProfile.emit( post );
      }
}
