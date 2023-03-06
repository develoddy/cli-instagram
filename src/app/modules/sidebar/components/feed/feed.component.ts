import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '@core/http/authentication.service';
import { ScriptsService } from 'app/services/scripts/scripts.service';
import { Post } from "@data/models/post";
import { UserService } from '@data/services/api/user.service';
import { PostService } from '@data/services/api/post.service';
import { Router } from "@angular/router";
import * as moment from "moment";
import * as $ from "jquery";
import { Observable } from 'rxjs';
import { User } from '@data/models/user';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit  {
  // TODO: PROPERTIES
  public cssUrl: string = "";
  posts: Post[] = [];
  public user: any;

  // TODO: LIFECYCLE
  constructor( 
    public loadScripts: ScriptsService, 
    public sanitizer: DomSanitizer, 
    private authService: AuthenticationService, 
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {
    this.loadScripts.loadFiles(["icons/feather-icon/feather.min"]);
    this.loadScripts.loadFiles(["icons/feather-icon/feather-icon"]);
    this.loadScripts.loadFiles(["jquery-3.5.1.min"]);
  }

  ngOnInit() {
    this.cssUrl = '/assets/css/responsive.css';
    this.getPostsAll();
  }

  // TODO: HELPERS
  getPostsAll() {
      this.postService.fetchPosts().subscribe(res => {
          this.posts = [];
          res.forEach( ( element:any ) => {
              this.posts.push({
                id: element.payload.doc.id,
                ...element.payload.doc.data()
              })
          });
      });
  }

  /* Se navega al perfil del usuario enviadole por 
  parametros sus datos*/
  goToProfile( user: User ) {
    console.log("DEBUG: GotoProfile");
    console.log(event);
    
    
    this.router.navigate(['/', user.username ]);
      /*this.user = event;
      this.router.navigate(['/feed/profile'], {
          state: {
              key: 1,
              data: this.user
          }
      });*/
  }

  goPostToProfile( post: Post ) {
    //[routerLink]="['/', post.ownerUsername]"
    this.router.navigate(['/', post.ownerUsername]);

    /*this.userService.fetchUser(post.ownerUid).subscribe( snapshot => {
        this.user = snapshot.data();
        this.router.navigate(['/profile'], {
            state: {
                key: 1,
                data: this.user
            }
        });
    })*/
    
    
  }
}
