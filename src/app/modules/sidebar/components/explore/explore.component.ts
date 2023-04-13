import { Component , OnInit } from '@angular/core';
import { ScriptsService } from 'app/services/scripts/scripts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PostService } from '@data/services/api/post.service';
import { BehaviorSubject, Subscription } from "rxjs";
import { Post } from '@data/models/post';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  // ---------------------- [ PORPERTIES ] ------------------------------
  public spinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public cssUrl: string = "";
  public posts: Post[] = [];
  clientesSubscription: Subscription;

  // ---------------------- [ LIFECYCLE ] ------------------------------
  constructor(
    private _loadScripts: ScriptsService,
    public sanitizer: DomSanitizer, 
    public postService: PostService
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  // ---------------------- [ VIEWMODEL ] ------------------------------
  /**
   * @desc Recuperar todas las publicaciones.
   * @parm
   * @return
   **/
  private fetchPosts() {
    this.spinner.next(true);
    this.clientesSubscription = this.postService.fetchPosts().subscribe(res => {
      this.spinner.next(false);
        this.posts = [];
        res.forEach( (element:any) => {
            this.posts.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            })
        });
    });
  }

  // ---------------------- [ HELPERS ] ------------------------------
  // --
  // --
  // --

  // ---------------------- [ ACTIONS ] ------------------------------
  /**
   * @desc Accción de destrucción
   * @parm
   * @return
   **/
  ngOnDestroy() {
    if (this.clientesSubscription) {
        this.clientesSubscription.unsubscribe();
    }
  }

}
