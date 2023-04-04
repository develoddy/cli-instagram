import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

  public proccessFile(photoURL:any) {
    //debugger;
    const file = File = photoURL.files[0];
    console.log("DEBUG: ProccessFile");
    console.log(file);
    
    
  }

  public back() {
    
  }

}
