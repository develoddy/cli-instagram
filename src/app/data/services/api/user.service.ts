
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, resolveForwardRef } from "@angular/core";
import { environment } from "environments/environment";
import { of, BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: "root",
})
export class UserService {


    public isProduction = environment.production;
    public spinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public stats: any;
    private filePath: any;
    private dowloadURL: Observable<string>;

 
    constructor(
        private _http: HttpClient, 
        private firebase: AngularFirestore
    ) {}

    
    public fetchAllUsers(): Observable<any> {
        return this.firebase.collection("users").snapshotChanges();
    }

     /** ---------------------------
      * @description: Se recupera de Firebase los datos del usuario
      * por la propiedas "uid".
      * @param uid 
      * @returns Observable<any> 
      --------------------------- */
    fetchUser( uid: string ): Observable<any> {
        return this.firebase.collection("users").doc(uid).get();
    }

    /** ---------------------------
     * @description: Se recupera de firebase los datos del usuario
     * por la propiedad "username".
     * @param username 
     * @returns Observable<any> 
    --------------------------- */
    fetchUserByUsername( username: string ): Observable<any>  {
        return this.firebase.collection("users", ref => ref.where('username', '==', username)).valueChanges();
    }

    /** ---------------------------
     * @description: Se recupera de firebase los datos del usuario
     * por la propiedad "username".
     * @param username 
     * @returns Observable<any> 
    --------------------------- */

    

    /*
    // Get users.
    public getUsers( page: number ) {
      this.spinner.next(true);
            const response = { error: false, msg: "", data: null };
            return this._http.get<ReqResUser>(this.url + "users/" + page).pipe(
                  tap(
                        (resp) => this.spinner.next(false),
                        (error: any) => this.spinner.next(false)
                  ),
                  map( ( r ) => {
                        var data = response.data == null ? r : null;
                        return data;
                  })
            );
    }

    // Get counters.
    public getCounters( userId = null ) {
        const response = { error: false, msg: "", data: null };
        if (userId != null) {
            return this._http
                .get(this.url + "users/counters/one/" + userId).pipe(
                    map((r) => {
                        var data = response.data == null ? r : null;
                        return data;
                    })
                );
        } else {
            return this._http.get(this.url + "users/counters/one/").pipe(
                map((r) => {
                    var data = response.data == null ? r : null;
                    return data;
                })
            );
        }
    }

    // Error api.
    error(error: HttpErrorResponse) {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error code: ${error.status}`;
        }
        return of({ error: true, msg: errorMessage, data: null });
    }*/
}