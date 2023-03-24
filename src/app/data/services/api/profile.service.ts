import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private firebase: AngularFirestore
  ) { }

  // public fetchUserStats(uid: string): Observable<any> {
    // return this.firebase.collection("posts").snapshotChanges();
    // return this.firebase.collection("users").doc(uid).get();

  public fetchFollowingsStat(uid: string): Observable<any>  {
    return this.firebase.collection("followings").doc(uid).collection("user-followings").snapshotChanges();
  }

  public fetchFollowersStat(uid: string): Observable<any>  {
    return this.firebase.collection("followers").doc(uid).collection("user-followers").snapshotChanges();
  }

  public fetchPostsStat(uid: string): Observable<any>  {
    return this.firebase.collection("posts", ref => ref.where('ownerUid', '==', uid )).snapshotChanges();
  }

  /*
  func fetchUserStats(uid: String, completion: @escaping(UserStats) -> Void) {

        Constants.Collections.COLLECTION_FOLLOWERS.document(uid).collection("user-followers").getDocuments { (snapshot, _) in
            let followers = snapshot?.documents.count ?? 0
            
            Constants.Collections.COLLECTION_FOLLOWINGS.document(uid).collection("user-followings").getDocuments { (snapshot, _) in
                let followings = snapshot?.documents.count ?? 0
                
                Constants.Collections.COLLECTION_POSTS.whereField("ownerUid", isEqualTo: uid).getDocuments { (snapshot, _) in
                    let posts = snapshot?.documents.count ?? 0
                    completion(UserStats(followers: followers, following: followings, posts: posts))
                }
            }
        }
    }
  */
}
