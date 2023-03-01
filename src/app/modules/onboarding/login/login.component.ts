import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from '@core/http/authentication.service';
import { User } from "@data/models/post";
import { UserService } from '@data/services/api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit  {

  // TODO: Properties
  public textSuccess: boolean = true;
	public spinnerLogin: boolean = false;
	public title: string = "";
  public user: User = {
		id: 0,
		name: "",
		lastname: "",
		username: "",
		email: "",
		password: "",
		code: "",
		is_active: false,
		is_admin: false,
		created_at: "",
		updated_at: ""
	};
  public status: string = "";
	public identity;
	public token = "";
	public loginSubscription: any;
	private error;
	window: any;

  // TODO: Lifecycle
  constructor( 
    private _auth: AuthenticationService, 
    private _router: Router, 
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.identity = {}
    this.error = {}
    // Comprobar si el usuario actual tiene token
    if ( this._auth.getIdentity() ) {
			this._router.navigate(["/feed"]);
		}
  }

  ngOnInit() {
    this.title = "Identificate";
  }

  // TODO: Helpers

  onSubmit() {
    this.loginSubscription = this._auth.login( this.user ).subscribe( 
      response => {
        if ( response?.success ) {
          this.textSuccess = !this.textSuccess;
					this.spinnerLogin = !this.spinnerLogin;
          this.status = "success";
					this.getCounters();
        } else {
          this.textSuccess = !this.textSuccess;
          this.spinnerLogin = !this.spinnerLogin;
          setTimeout(() => {
						this.textSuccess = !this.textSuccess;
						this.spinnerLogin = !this.spinnerLogin;
						this.status = "error";
					}, 1000);
        }
      }
    )
  }

  getCounters() {
    this.loginSubscription = this._userService.getCounters().subscribe(
      response => {
        localStorage.setItem("stats", JSON.stringify(response));
        this.status = "success";
        setTimeout(() => {
          this._router.navigate(["/feed"]);
        }, 1000);
      }
    )
  }

  ngOnDestroy(): void {
		if ( this.loginSubscription ) {
			this.loginSubscription.unsubscribe();
		}
	}
}
