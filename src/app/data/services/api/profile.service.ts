import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from '@core/http/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private firebase: AngularFirestore,
  ) { }
  
  public fetchFollowingsStat(uid: string): Observable<any>  {
    return this.firebase.collection("followings").doc(uid).collection("user-followings").snapshotChanges();
  }

  public fetchFollowersStat(uid: string): Observable<any>  {
    return this.firebase.collection("followers").doc(uid).collection("user-followers").snapshotChanges();
  }

  public fetchPostsStat(uid: string): Observable<any>  {
    return this.firebase.collection("posts", ref => ref.where('ownerUid', '==', uid )).snapshotChanges();
  }

  public checkIfUserIsFollowed(currentId: string, uid: string): Observable<any> {
    return this.firebase.collection("followings").doc(currentId).collection("user-followings").doc(uid).snapshotChanges();
  }
}
