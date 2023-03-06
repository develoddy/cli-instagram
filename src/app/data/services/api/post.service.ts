import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Post } from "@data/models/post";

// FIREBASE
import { AngularFirestore } from '@angular/fire/compat/firestore';


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
    private http: HttpClient,
    // FIREBASE
    private firebase: AngularFirestore
  ) { 
  }

  // TODO: Helpers

  fetchPosts(): Observable<any> {
    return this.firebase.collection("posts").snapshotChanges();
  }

  likePost(post: Post): Observable<any> {
    return this.firebase.collection('posts').doc(post.postId).collection('post-likes').get();
  }

}
