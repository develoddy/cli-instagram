import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'app/services/scripts/scripts.service';

@Component({
  selector: 'app-posts-loaders',
  templateUrl: './posts-loaders.component.html',
  styleUrls: ['./posts-loaders.component.css']
})
export class PostsLoadersComponent implements OnInit {

  constructor( public scripts: ScriptsService  ) {
    // this.scripts.loadFiles(["loader"]);
  }

  ngOnInit(){}

}
