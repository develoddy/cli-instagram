import { Component , OnInit } from '@angular/core';
import { ScriptsService } from 'app/services/scripts/scripts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PostService } from '@data/services/api/post.service';
import { BehaviorSubject } from "rxjs";
import { Post } from '@data/models/post';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  public spinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public cssUrl: string = "";
  public posts: Post[] = [];

  constructor(
    private _loadScripts: ScriptsService,
    public sanitizer: DomSanitizer, 
    public postService: PostService
  ) {
    // this._loadScripts.loadFiles(["animation/aos/aos-init"]);
    // this._loadScripts.loadFiles(["animation/aos/aos"]);
    // this._loadScripts.loadFiles(["isotope.pkgd"]);
    // this._loadScripts.loadFiles(["script"]);
    // this._loadScripts.loadFiles(["photoswipe/photoswipe"]);
  }

  ngOnInit() {
    // this.cssUrl = '/assets/css/vendors/aos.css';
    // this.cssUrl = '/assets/css/vendors/photoswipe.css';
    this.fetchPosts();

  }
  private fetchPosts() {
    this.spinner.next(true);
    this.postService.fetchPosts().subscribe(res => {
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

}
