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

  ngOnInit() {}

  // TODO: Helper
  //ngDoCheck() {}

  logout() {
    this.auth.SignOut();
  }
}
