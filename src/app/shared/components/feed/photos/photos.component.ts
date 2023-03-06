import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/http/authentication.service';
import { UserService } from '@data/services/api/user.service';
import { Post } from "@data/models/post";


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit  {

  //@Input() posts: any;
  @Input() posts: Post[] = [];

  // TODO: Lifecycle
  constructor(
    private _userService: UserService,
    private _authService: AuthenticationService,
  ) {
    
  }

  ngOnInit() {
  }

}
