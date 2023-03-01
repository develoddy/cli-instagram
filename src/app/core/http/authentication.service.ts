import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { 
  delay, 
  map, 
  tap, 
  catchError 
} from "rxjs/operators";
import { 
  Observable, 
  of as observableOf, 
  BehaviorSubject, 
  of 
} from "rxjs";

import { User } from "@data/models/post";

export interface Identity {
  success: string,
  user: User
  /*code: string;
  created_at: string;
  email: string;
  id: number;
  is_active: boolean;
  is_admin: boolean;
  lastname: string;
  name: string;
  updated_at: string;
  username: string;*/
}

export interface TokenPayload {
  userId: number;
  cretedAt: string;
  expiredAt: string;
}

export interface TokenResponse {
  token: string;
  identity: Identity;
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  // TODO: Properties
  public url = environment.uri+'api/';
  public isProduction = environment.production;
  public token: string = "";
  private email: string = "";
  private username: string = "";
  public identity;
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
  public authTokenNew: string = "new_auth_token";
  public currentToken: string = "";

  // TODO: Lifecycle
  constructor( 
    private http: HttpClient, 
    private router: Router 
  ) {
    this.token = "";
    this.identity = {};
  }

  // TODO: Helpers

  private saveToken(token: string, email: string, identity: Identity): void {
    localStorage.setItem("usertoken", token);
    localStorage.setItem("email", email);
    localStorage.setItem("identity", JSON.stringify(identity));
    this.token = token;
  }

  public getToken(): string {
    //return !this.token ? localStorage.getItem("usertoken") : null;
    if ( !this.token ) {
      this.token = localStorage.getItem("usertoken")!;
    }
    return this.token;
  }

  public getEmail(): string {
    if (!this.email) {
        this.email = localStorage.getItem("email")!;
    }
    return this.email;
  }

  public getIdentity() {
    if (!this.identity) {
        this.identity = JSON.parse(localStorage.getItem("identity")!);
    }
    return this.identity;
  }

  get isLoggedInn(): boolean {
    let authToken = localStorage.getItem("usertoken");
    return authToken !== null ? true : false;
  }
  
  login( user: User ) {
    const response = { error: false, msg: "", data: null };
    return this.http.post(this.url + "users/login/", user).pipe(
        map( ( r ) => {
          console.log("DEBUG: Service login");
          console.log(r);
          response.data ? r : null;
          /*if ( response.data.success ) {
              var token = response.data.success;
              var email = response.data.user.email;
              var identity = response.data.user;

              this.saveToken(token, email, identity);
          }*/
          return ( response );
        }),
    );
  }

  public logout(): void {
    window.localStorage.clear();
    this.identity = {};
    this.router.navigate(["/"]);
  }

  error(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
    } else {
        errorMessage = `Error code: ${error.status} \n Message:_${error.message}`;
    }
    return of({ error: true, msg: errorMessage, data: null });
  }

}
