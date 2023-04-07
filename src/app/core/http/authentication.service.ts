import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import {Observable,of as observableOf,BehaviorSubject,of,Subscription,} from "rxjs";
import { User, UserStats } from "@data/models/user";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import * as auth from "firebase/auth";
import { ProfileService } from "@data/services/api/profile.service";
import {AngularFirestore,AngularFirestoreDocument,} from "@angular/fire/compat/firestore";


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
    providedIn: "root",
})


export class AuthenticationService {

    public isProduction     = environment.production;
    public errorResponse    : any;
    public errorLogin       : boolean = false;
    public token            : string    = "";
    public identity         : any;
    public localStorageStats: any;
    public authTokenNew     : string = "new_auth_token";
    public currentToken     : string = "";
    public followersTotal   : number = 0;
    public followingsTotal  : number = 0;
    public postsTotal       : number = 0;
    public user             : User;
    public stats            : UserStats = { followers: 0, followings: 0, posts: 0 };
    public spinner          : BehaviorSubject<boolean> = new BehaviorSubject(false);
    public showTextLogin    : boolean = false;
    userData                : any; 
    clientesSubscription    : Subscription;

    constructor(
        private profileService  : ProfileService    ,
        private firebase        : AngularFirestore  ,
        private router          : Router            ,
        public afs              : AngularFirestore  ,  // Inject Firestore service
        public afAuth           : AngularFireAuth   ,  // Inject Firebase auth service
        public ngZone           : NgZone            // NgZone service to remove outside scope warning
    ) {
        this.token = "";
        /**
         * Save data from usuer on storage local when you 
         * loggin and set to when you logout.
         **/
        this.clientesSubscription = this.afAuth.authState.subscribe(
            ( user ) => {
                if ( user ) {
                const userData: User = {
                    fullname: "",
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    profileImageURL: user.providerData[0]!.photoURL,
                    username: "",
                    emailVerified: user.emailVerified,
                    uid: user.uid,
                };

                localStorage.setItem(
                    "user", 
                    JSON.stringify( userData )
                );

                JSON.parse(
                    localStorage.getItem("user")!
                );
                
                this.fetchUserStats();
            } else {
                localStorage.setItem("user", "null");
                JSON.parse(
                    localStorage.getItem("user")!
                );
            }
        });
    }
  
    /**
     * @desc Login via email or password
     * @param email password
     * @return
     **/
    signIn(email: string, password: string) {
        /**
         * Se activa el texto de 'entrar' login.
         * Se activa el spinner
         */
        this.showTextLogin = true;
        this.spinner.next(true);

        /**
         * Retorna una promesa si el usuario fue logueado correctamnente o 
         * comprobar si las credenciales son correctas o no.
         */
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then( ( result )  => {
                this.spinner.next(false);
                this.setUserData(result.user, "", "", "", "");
                this.clientesSubscription = this.afAuth.authState.subscribe(
                    ( user ) => {
                        if ( user ) {
                            this.router.navigate(["app/feed"]);
                        }
                    },
                );
            })
            .catch( ( error ) => {
                this.errorResponse = error.message;
                this.errorLogin = true;
                this.showTextLogin = false;
                this.spinner.next(false);
            });
    }

    /**
     * @desc Register with email and password
     * @param email, password, photoURL
     * @return
     * */
    SignUp(email: string, password: string, fullname: string, phoneNumber: string, profileImageURL: string, username: string) {
        this.showTextLogin = !this.showTextLogin;
        this.spinner.next(true);
        return this.afAuth
            .createUserWithEmailAndPassword(email, password)
            .then( ( result ) => {
                this.spinner.next(false);

                /**
                 * Call function SenderVerificationMail() when a new
                 * user register and returns the promise.
                 */
                this.sendVerificationMail();
                
                /**
                 * Call fuction setUserData for add 
                 * data from user 
                 */
                this.setUserData(
                    result.user, 
                    fullname, 
                    phoneNumber, 
                    profileImageURL, 
                    username
                );
            })
            .catch( ( error ) => {
                this.errorLogin = true;
                console.log("DEBUG: Method SignUp error....: " + error);
                window.alert(error.message);
            });
    }

    /**
     * @desc Reset password
     * @param email
     * @return Promise
     */

    resetPassword(email: string) {
        try {
            this.afAuth.sendPasswordResetEmail(email);
        } catch ( error ) {
            console.log(error);
            
        }
    }

    /**
     * @desc Send verification email when a new user signs up.
     * @param 
     * @return
     * */
    sendVerificationMail() {
        return this.afAuth.currentUser
            .then((u: any) => u.sendEmailVerification())
            .then(() => {
                console.log("DEBUG: sendVerificationMail() + El user se registro correctamente" );
                //this.router.navigate(["verify-email-address"]);
                this.router.navigate(["app/feed"]);
            });
    }


     /**
     * @desc Reset i forgot my password.
     * @param passwordResetEmail
     * @return
     * */
    forgotPassword(passwordResetEmail: string) {
        return this.afAuth
            .sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert("Password reset email sent, check your inbox.");
            })
            .catch((error) => {
                window.alert(error);
            });
    }

     /**
     * @desc Return true when user login session and email verified.
     * @param 
     * @return true or false
     * */
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem("user")!);
        return user !== null ? true : false; //return (user !== null || user.emailVerified !== false) ? true : false;
    }

    /**
     * @desc Login with google.
     * @param 
     * @return promise
     * */
    googleAuth() {
        return this.authLogin(new auth.GoogleAuthProvider()).then(
            (res: any) => {
                this.router.navigate(["app/feed"]);
            }
        );
    }

    /**
     * @desc Get user information.
     * @param 
     * @return promise
     **/
    public getIdentity() {
        if (!this.identity) {
            this.identity = JSON.parse(localStorage.getItem("user")!);
        }
        return this.identity;
    }

    public getStats() {
        if (!this.localStorageStats) {
            this.localStorageStats = JSON.parse(localStorage.getItem("stats")!);
        }
        return this.localStorageStats;
    }

    public getCurrentUser(): Observable<any> {
        this.identity = this.getIdentity();
        console.log("DEBUG: Service identity");
        console.log(this.identity);
        
        
        var uid = this.identity.uid;
        return this.firebase.collection("users").doc(uid).snapshotChanges();
    }


    /**
     * @desc Auth logic to run auth providers.
     * @param provider
     * @return promise
     **/
    authLogin(provider: any) {
        return this.afAuth.signInWithPopup(provider)
        .then((result) => {
            this.router.navigate(["app/feed"]);
            this.setUserData(result.user, "", "", "", "");
        })
        .catch((error) => {
            window.alert(error);
        });
    }

    /**
     * @desc obtain the statistics of the current user connected to the system.
     * @param 
     * @return
     **/
    public fetchUserStats() {
        var uid = this.getIdentity().uid;
        this.clientesSubscription = this.profileService.fetchFollowersStat(uid)
            .subscribe((snapshot) => {
                this.followersTotal = snapshot.length;
                this.clientesSubscription = this.profileService.fetchFollowingsStat(uid)
                    .subscribe((snapshot) => {
                        this.followingsTotal = snapshot.length;
                        this.clientesSubscription = this.profileService
                            .fetchPostsStat(uid).subscribe((snapshot) => {
                                this.postsTotal = snapshot.length;
                                // SE RECUPERA TODO LOS STATS DEL USUARIO ACTUAL.
                                this.stats.followers = this.followersTotal;
                                this.stats.followings = this.followingsTotal;
                                this.stats.posts = this.postsTotal;
                                localStorage.setItem("stats", JSON.stringify(this.stats));
                            });
                    });
            });
    }

    /**
     * @desc Configuration of user data when loggin in with username and password.
     * Sign up with username and password and login with social authentication.
     * Provider in firestore database using angularfirestore + angularfirestoredocumentservice.
     * @param user, photoURL
     * @return promise
     **/
    setUserData(user: any,  fullname: string, phoneNumber: string, profileImageURL: string, username: string ) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc( `users/${user.uid}` );

        const userData: User = {
            fullname: fullname,
            email: user.email,
            phoneNumber: phoneNumber,
            profileImageURL: profileImageURL,
            username: username,
            emailVerified: user.emailVerified,
            uid: user.uid,
        };

        /*const userData: User = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
        };*/
        console.log("DEBUG: Authentication.services setUserData");
        console.log(userData);
        return userRef.set(userData, {
            merge: true,
        });
    }

    /**
     * @desc Disconnect from the social network.
     * @param 
     * @return
     **/
    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem("user");
            this.identity = null;
            this.router.navigate(["login"]);
        });
    }

    /**
     * @desc Error in services.
     * @param 
     * @return
     **/
    error(error: HttpErrorResponse) {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error code: ${error.status} \n Message:_${error.message}`;
        }
        return of({ error: true, msg: errorMessage, data: null });
    }

    /**
     * @desc Services calls are destroyed.
     * @param 
     * @return
     **/
    ngOnDestroy() {
        if (this.clientesSubscription) {
            this.clientesSubscription.unsubscribe();
            console.log("DEBUG: ngDestroy auth.component");
            console.log(this.clientesSubscription.unsubscribe);
        }
    }
}
