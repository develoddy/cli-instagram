import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from '@core/http/authentication.service';
import { User } from "@data/models/user";
import { UserService } from '@data/services/api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit  {

  // TODO: Properties

  // TODO: Lifecycle
  constructor( 
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
  }

  // TODO: Helpers

  
}
