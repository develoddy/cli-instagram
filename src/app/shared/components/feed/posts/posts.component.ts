import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from "@angular/core";
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

      // Loader properties
      @ViewChild('ElementRefCard') ElementViewCard: ElementRef;
      @ViewChild('ElementRefCardBody') ElementViewCardBody: ElementRef;

      // TODO: Lifecycle
      constructor(private _userService: UserService, private _authService: AuthenticationService) {
            this.url = this._userService.url;
            this.identity = this._authService.getIdentity();
      }
      
      // TODO: Helpers
      ngAfterViewInit() {
            this.setPlaceholder();
      }

      public setPlaceholder() {
            console.log(this.ElementViewCardBody.nativeElement);
            if ( !this.ElementViewCard.nativeElement.classList.contains("card--skeleton") ) {
                  console.log("Entra en el if");
                  
                  this.ElementViewCard.nativeElement.classList.add("card--skeleton");
                  this.ElementViewCardBody.nativeElement.innerHTML = "";
            } else {
                  console.log("entra en el else");
                  
            }
      }
      ngOnInit() {}

      viewMore() {
            this.eventViewMore.emit(true);
      }

      gotoProfile( post: Post ) {
            this.eventGotoProfile.emit( post );
      }
}
