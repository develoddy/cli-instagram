import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ReqResPosts } from "@data/models/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // TODO: Properties
  public url = environment.uri;

  public isProduction = environment.production;

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$:Observable<boolean> = this.loadingSubject.asObservable();


  // TODO: Lifecycle
  constructor( 
    private http: HttpClient
  ) { }

  // TODO: Helpers
  
  /**
   * TODO: Get publications
   * @param: page
   * @return
   */
  public getPosts( page = 0 ) {
    const response = { error: false, message: "", data:null }
    return this.http.get<ReqResPosts>(this.url + "api/posts/" + page).pipe(
      map( ( r ) => {
        var data = response.data == null ? r : null;
        return data
      })
    );
  }
}
