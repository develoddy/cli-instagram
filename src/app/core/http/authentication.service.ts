import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { delay, map, tap, catchError } from 'rxjs/operators';
import {
  Observable,
  of as observableOf,
  BehaviorSubject,
  of,
  Subscription,
} from 'rxjs';
import { User, UserStats } from '@data/models/user';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { UserService } from '@data/services/api/user.service';
import { ProfileService } from '@data/services/api/profile.service';

// FIREBASE

export interface Identity {
  success: string;
  user: User;
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
  providedIn: 'root',
})
export class AuthenticationService {
  // TODO: Properties
  userData: any; // Save logged in user data
  public isProduction = environment.production;
  public token: string = '';
  private email: string = '';
  private username: string = '';
  public identity: any;
  public localStorageStats: any;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  public authTokenNew: string = 'new_auth_token';
  public currentToken: string = '';
  clientesSubscription: Subscription;
  public followersTotal = 0;
  public followingsTotal = 0;
  public postsTotal = 0;
  public user: User;
  public stats: UserStats = { followers: 0, followings: 0, posts: 0 };
  public spinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public showTextLogin: boolean = false;

  // TODO: Lifecycle
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private profileService: ProfileService,
    // FIREBASE
    private firebase: AngularFirestore,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.token = '';
    /* Saving user data in localstorage when 
            logged in and setting up null when logged out */
    this.clientesSubscription = this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);

        this.fetchUserStats();
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // TODO: Helpers

  // Sign in with email/password
  signIn(email: string, password: string) {
    this.showTextLogin = !this.showTextLogin;
    this.spinner.next(true);
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.spinner.next(false);
        this.setUserData(result.user);
        this.clientesSubscription = this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['app/feed']);
          }
        });
      })
      .catch((error) => {
        console.log('DEBUG:' + error.message);
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
                  up and returns promise */
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then(
        (res: any) => {
            this.router.navigate(["app/feed"]);
        }
    );
  }

  // Get info user
  public getIdentity() {
    if (!this.identity) {
      this.identity = JSON.parse(localStorage.getItem('user')!);
    }
    return this.identity;
  }

  public getStats() {
    if (!this.localStorageStats) {
      this.localStorageStats = JSON.parse(localStorage.getItem('stats')!);
    }
    return this.localStorageStats;
  }

  public getCurrentUser(): Observable<any> {
    this.identity = this.getIdentity();
    var uid = this.identity.uid;
    return this.firebase.collection('users').doc(uid).snapshotChanges();
  }

  // Auth logic to run auth providers
  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['app/feed']);
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  public fetchUserStats() {
    var uid = this.getIdentity().uid;
    this.clientesSubscription = this.profileService
      .fetchFollowersStat(uid)
      .subscribe((snapshot) => {
        this.followersTotal = snapshot.length;

        this.clientesSubscription = this.profileService
          .fetchFollowingsStat(uid)
          .subscribe((snapshot) => {
            this.followingsTotal = snapshot.length;

            this.clientesSubscription = this.profileService
              .fetchPostsStat(uid)
              .subscribe((snapshot) => {
                this.postsTotal = snapshot.length;

                /**
                 * Se obtiene todos los stats
                 */
                this.stats.followers = this.followersTotal;
                this.stats.followings = this.followingsTotal;
                this.stats.posts = this.postsTotal;

                /**
                 * Se asigna los datos del stats a la propiedad stats del User.stats
                 */
                //this.user.stats = this.stats;

                localStorage.setItem('stats', JSON.stringify(this.stats));
              });
          });
      });
  }

  /* Setting up user data when sign in with username/password, 
      sign up with username/password and sign in with social auth  
      provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
      
    });
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status} \n Message:_${error.message}`;
    }
    return of({ error: true, msg: errorMessage, data: null });
  }

  ngOnDestroy() {
    // acciones de destrucción
    if (this.clientesSubscription) {
      this.clientesSubscription.unsubscribe();
      console.log('DEBUG: ngDestroy auth.component');
      console.log(this.clientesSubscription.unsubscribe);
    }
  }
}
