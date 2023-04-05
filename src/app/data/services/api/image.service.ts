import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from "@angular/common/http";
import { Storage, ref } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class ImageService {


  constructor( private firebase: AngularFirestore, private storage: Storage ) { }
}
