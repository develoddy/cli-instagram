import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/http/authentication.service';
import { User } from "@data/models/post";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit  {

  // TODO: Properties
  public textLogIn: boolean = true;
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
	public loginSubscription;
	private error;
	window: any;

  // TODO: Lifecycle
  constructor( private auth: AuthenticationService ) {
    this.identity = {}
    this.loginSubscription = {}
    this.error = {}
  }

  ngOnInit() {
    this.title = "Identificate";
  }

  // TODO: Helpers

  onSubmit() {

    this.loginSubscription = this.auth.login( this.user ).subscribe(
      response => {
        if ( response.error ) {
          console.log("DEBUG: Login");
          console.log(response);
        }
      }
    )
  }
}
