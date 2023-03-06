import { Component, Input, Output } from '@angular/core';
import { AuthenticationService } from '@core/http/authentication.service';
import { UserService } from '@data/services/api/user.service';
import { User } from "@data/models/user";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent {

  // TODO: PROPERTIES
  @Input() identity:any;
  private uid: string = "";
  public profileImageURL: string;
  public username: string;
  //public user: Observable<User>;

  // TODO: LIFECYCLE
  constructor( private userService: UserService, private authService: AuthenticationService ) {
    /*this.identity = this.authService.getIdentity();
    this.uid = this.identity.uid;
    
    userService.fetchUser(this.uid).subscribe(snapshot => {
      var data = snapshot.data();
      this.profileImageURL = data.profileImageURL;
      this.username = data.username;
    });*/
  }

  // TODO: HELPERS
}
