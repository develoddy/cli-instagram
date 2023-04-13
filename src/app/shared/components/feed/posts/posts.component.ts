
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { AuthenticationService } from "@core/http/authentication.service";
import { Post } from "@data/models/post";
import { UserService } from "@data/services/api/user.service";
import * as $ from "jquery";

@Component({
      selector: "app-posts",
      templateUrl: "./posts.component.html",
      styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
      @Input() posts: Post[] = [];
      @Input() noMore: boolean = false;
      @Input() identity: any;
      @Output() eventGotoProfile = new EventEmitter();
      //@Output() eventViewMore = new EventEmitter();
   
      // TODO: Lifecycle
      constructor(private _userService: UserService,private _authService: AuthenticationService,private renderer: Renderer2,private elementRef:ElementRef) {
            this.identity = this._authService.getIdentity();
      }

      ngOnInit() {
      }

      gotoProfile( username: string ) {
            this.eventGotoProfile.emit( username );
      }

      /*viewMore() {
            this.eventViewMore.emit(true);
      }*/
}

