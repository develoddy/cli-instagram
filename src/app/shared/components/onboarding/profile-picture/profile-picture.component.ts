import { Component, OnInit } from '@angular/core';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {

  selectedFile: ImageSnippet;

  constructor() {}

  ngOnInit() {}

  public proccessFile(photoURL:any) {
    debugger;
    const file = File = photoURL.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      debugger;
      this.selectedFile = new ImageSnippet(event.target?.result, file)
    });

    reader.readAsDataURL(file);
  }

  public back() {
    
  }

}
