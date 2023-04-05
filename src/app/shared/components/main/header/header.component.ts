import { Component, OnInit, DoCheck, Input  } from '@angular/core';
import { AuthenticationService } from '@core/http/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit/*, DoCheck*/  {

  // TODO: Properties
  @Input() currentUser: any;

  // TODO: Leficycle
  constructor( private auth: AuthenticationService ) {}

  ngOnInit() {
    //console.log("DEBUG: Header.component");
    //console.log(this.currentUser);
    
  }

  // TODO: Helper
  //ngDoCheck() {}

  logout() {
    this.auth.SignOut();
  }
}
