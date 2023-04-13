
import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Post } from "@data/models/post";
import { UserService } from "@data/services/api/user.service";

@Component({
  selector: 'app-profileposts',
  templateUrl: './profileposts.component.html',
  styleUrls: ['./profileposts.component.css']
})
export class ProfilepostsComponent implements OnInit  {

  @Input() posts: Post[] = [];

  ngOnInit() {}

}
