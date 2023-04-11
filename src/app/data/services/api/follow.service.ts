import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private firebase: AngularFirestore) { }

  /** ---------------------------
      * @description: Get all followings
      * @param uid 
      * @returns Observable<any> 
      --------------------------- */

  public fetchFollowings(uid:string): Observable<any> {

    //return this.firebase.collection("followings").snapshotChanges();
    return this.firebase.collection("followings").doc(uid).collection("user-followings").snapshotChanges();
  }

  /*
  func fetchFollowings(uid: String, completion: @escaping([User]) -> Void) {
        Constants.Collections.COLLECTION_FOLLOWINGS.document(uid).collection("user-followings")
            .getDocuments { snapshot, _ in
                guard let documents = snapshot?.documents else { return }
                let posts = documents.compactMap({ User(dictionary: $0.data() ) })
                completion(posts)
        }
    }
  */
}
