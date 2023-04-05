import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getDownloadURL } from 'firebase/storage';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {

  public success: boolean = false;
  public isLoading: boolean = false;
  sampleProfilePic = "../../../../../assets/images/profile-picture.png";
  selectedFile: ImageSnippet;
  private file: File;
  private path: string = "";
  @Output() continueToPhonenumberEvent = new EventEmitter();
  @Output() backTobirthdayEvent = new EventEmitter();

  constructor(private af: AngularFireStorage) {}

  ngOnInit() {}

  public proccessFile(photoURL:any) {
    //debugger;
    this.file = photoURL.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target?.result, this.file);
    });
    reader.readAsDataURL(this.file);
    this.uploadImage();

    /*this.isLoading = true;
    setTimeout( () => { 
      this.isLoading = false;
      this.success = !this.success;
    }, 2000 );*/
  }

  // UPLOAD PHOTO TO STORAGE FIREBASE.
  public uploadImage() {
     this.isLoading = true;
     this.path = "image"+Math.random()+this.file;
     this.af.upload("files-account-images/"+this.path, this.file)
     .then(
      response => {
        this.isLoading = false;
        this.success = !this.success;
      })
    .catch(
      error => {
        this.isLoading = false;
        this.success = !this.success;
        console.log(error)
    });
  }

  // GET IMAGE FROM STORAGE FIREBASE.
  public getImagePathStorage() {
    this.af.ref("files-account-images/"+this.path).getDownloadURL().subscribe(
      (response) => {
        this.continueToPhonenumberEvent.emit({path: response})
      }
    )
  }

  // GET IMAGES ALL FROM STORAGE FIREBASE.
  public getImageAllStorage() {
    this.af.ref("files-account-images").listAll().subscribe( 
      async (response) => {
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          console.log(url);
        }
      }
    )
  }

  // BUTTON CONTINUE.
  public continueToNumberPhone() {
    this.getImagePathStorage();
  }

  // BUTTON BACK TO BIRTDAY.
  public back() {
    this.backTobirthdayEvent.emit({"backTobirthdayEvent": "backTobirthdayEvent"});
  }

}
