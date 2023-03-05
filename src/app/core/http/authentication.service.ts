import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { delay, map, tap, catchError } from "rxjs/operators";
import { Observable, of as observableOf, BehaviorSubject, of } from "rxjs";

//import { User } from "@data/models/post";
import { User } from '@data/models/user';

export interface Identity {
  success: string,
  user: User
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
  public identity = null;
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
  }

  // TODO: Helpers
  private saveToken(token: string, email: string, identity: User): void {
    localStorage.setItem("usertoken", token);
    localStorage.setItem("email", email);
    localStorage.setItem("identity", JSON.stringify(identity));
    this.token = token;
  }

  public getToken(): string {
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
    const response = { error: false, msg: "", data: {} };
    return this.http.post <Identity>(this.url + "users/login/", user).pipe(
        map( ( r ) => {
          var data = response.data ? r  : null;
          //response.data = data!;
          if ( data?.success ) {
            var token = data.success;
            var email = data.user.email!;
            var identity = data.user;
            this.saveToken(token, email, identity);
          }
          return ( data );
        }),
    );
  }

  public logout(): void {
    window.localStorage.clear();
    //this.identity = null;
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