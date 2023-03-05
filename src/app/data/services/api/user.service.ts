import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReqResUser } from "@data/models/user";
import { environment } from "environments/environment";
import { of, BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class UserService {
    // TODO: Properties
    public url = environment.uri + "api/";
    public isProduction = environment.production;
    public spinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public stats: any;

    // TODO: Lifecycle
    constructor(private _http: HttpClient) {}

    // TODO: Helpers

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
    }
}