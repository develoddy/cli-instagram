import { Component, OnInit, DoCheck, Input  } from '@angular/core';
import { AuthenticationService } from '@core/http/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit/*, DoCheck*/  {


  @Input() currentUser: any;
  public show: boolean = false;

  constructor( private auth: AuthenticationService ) {}

  ngOnInit() {}


  logout() {

    this.auth.SignOut();
  }
}
