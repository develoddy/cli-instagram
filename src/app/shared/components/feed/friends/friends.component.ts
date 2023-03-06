import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/http/authentication.service';
import { UserService } from '@data/services/api/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  ngOnInit() {
  }
  /*public url: string;
  public friends = 2;
  public identity: any;
  @Input() data: any;
  public followings:number[] = [];
  public followUserOver: number = 0;

  constructor( 
    private userService: UserService,
    private _auth: AuthenticationService
  ) {
    this.url = this.userService.url;
    this.identity = _auth.getIdentity();
  }
  

  mouseEnter( userId: number ) {
    this.followUserOver = userId;
  }

  mouseleave(userId: number ) {
    this.followUserOver = 0;
  }*/
}
