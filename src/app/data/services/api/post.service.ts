import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Post } from "@data/models/post";
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  // TODO: ===== Properties =====
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$:Observable<boolean> = this.loadingSubject.asObservable();

  // TODO: ===== Lifecycle =====
  constructor( 
    private http: HttpClient,
    private firebase: AngularFirestore
  ) { }

  // TODO: ===== Helpers =====
  /**
   * @description Se recupera de Firebase todas las publicaciones.
   * @returns Observable<any>
   */
  public fetchPosts(): Observable<any> {
    return this.firebase.collection("posts").snapshotChanges();
  }

  public fetchPostsByUid(uid: string): Observable<any>  {
    return this.firebase.collection("posts", ref => ref.where('ownerUid', '==', uid )).valueChanges();
  }
}
