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
    return this.firebase.collection("followings").doc(uid).collection("user-followings").snapshotChanges();
  }

  public fetchFollowers(uid:string): Observable<any> {
    return this.firebase.collection("followers").doc(uid).collection("user-followers").snapshotChanges();
  }
}
