import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@core/http/authentication.service';
import { User } from '@data/models/user';
import { UserService } from '@data/services/api/user.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // TODO: PROPERTIES
  public hide = true;
  public btnState = true;

  // TODO: LIFECYCLE
  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['app/feed']);
    }
  }

  ngOnInit() {}

  // TODO: HELPERS
  public account() {
    this.router.navigate(['account/emailsignup']);
  }

  public isValidPassword = false;
  public showErrorValidPassword = false;
  public checkPassword(event: any) {
    var text = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+$/;
    var data = event.target.value;

    if (data.match(text)) {
      // SE COMPRUEBA QUE ES TEXTO.
      this.isValidPassword = true;
      this.showErrorValidPassword = false;
    } else {
      if (data == '') {
        // SE COMPRUEBA QUE NO HAY DATO.
        this.isValidPassword = false;
        this.showErrorValidPassword = false;
        this.btnState = true;
      } else {
        // SE COMPRUEBA QUE NO ES TEXTO.
        this.isValidPassword = false;
        this.showErrorValidPassword = true;
      }
    }
  }
}
