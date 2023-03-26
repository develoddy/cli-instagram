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

  // TODO: LIFECYCLE
  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {
<<<<<<< Updated upstream
    if ( this.authService.isLoggedIn ) {
      this.router.navigate([ 'app/feed' ])
=======
    //window.location.reload();
    /*if (this.authService.identity) {
      console.log('DEBUG: LoginComponent -> Hay data en identity');
      this.router.navigate(['app/feed']);
    } else {
      console.log('DEBUG: LoginComponent -> No hay data en identity');
    }*/
    if (!this.authService.identity) {
      //this.router.navigate(['app/feed']);
      console.log('DEBUG: LoginComponent -> Hay data en identity');
>>>>>>> Stashed changes
    }
    //return true;
  }

  ngOnInit() {}

  // TODO: HELPERS
}
