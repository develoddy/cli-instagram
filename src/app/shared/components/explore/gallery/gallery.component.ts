import { Component, Input, OnInit } from '@angular/core';
import { Post } from '@data/models/post';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  
  @Input() posts: Post[] = [];
  
  ngOnInit(){
    console.log("DEBUG: gallery.componente");
    console.log(this.posts);
  }

}
