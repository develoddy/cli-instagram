import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from "@core/http/authentication.service";
import { ScriptsService } from "app/services/scripts/scripts.service";
import { Post } from "@data/models/post";
import { UserService } from "@data/services/api/user.service";
import { PostService } from "@data/services/api/post.service";
import { Router } from "@angular/router";
import { User } from "@data/models/user";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import * as moment from "moment";
import * as $ from "jquery";

@Component({
    selector: "app-feed",
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.css"],
})
export class FeedComponent implements OnInit {
    public spinner        : BehaviorSubject<boolean> = new BehaviorSubject(false);
    public cssUrl         : string = "";
    public user           : any;
    clientesSubscription  : Subscription;
    posts: Post[]         = [];

    constructor(
        public scripts: ScriptsService,
        public sanitizer: DomSanitizer,
        private authService: AuthenticationService,
        private postService: PostService,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getCurrentUser();
        this.getPostsAll();
    }

    /* Se recuperar todas las publicaciones */
    public getPostsAll() {
      this.spinner.next(true);
      this.clientesSubscription = this.postService
          .fetchPosts()
          .subscribe((res) => {
              this.spinner.next(false);
              this.posts = [];
              res.forEach((element: any) => {
                  this.posts.push({
                      id: element.payload.doc.id,
                      ...element.payload.doc.data(),
                  });
              });
          });
  }
  
    private getCurrentUser() {
        this.spinner.next(true);
        this.clientesSubscription = this.authService
            .getCurrentUser()
            .subscribe((snapshot) => {
                this.spinner.next(false);
                this.user = snapshot.payload.data();
            });
    }

    /* Se navega al perfil del usuario enviadole por 
  parametros el username del usuario */
    public goToProfile(user: User) {
        this.router.navigate(["app/profile/", user.username]);
    }

    /* Se navega al el feed (publicaciones) enviadole por 
  parametro el username del usuario */
    public goPostToProfile(username: string) {
        this.router.navigate(["app/profile/", username]);
    }

    ngOnDestroy() {
        // acciones de destrucción
        if (this.clientesSubscription) {
            this.clientesSubscription.unsubscribe();
            console.log("DEBUG: ngDestroy feed.component");
            console.log(this.clientesSubscription.unsubscribe);
        }
    }
}
