import { Component, ElementRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable, interval, timer } from 'rxjs';


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-modaladdpost',
  templateUrl: './modaladdpost.component.html',
  styleUrls: ['./modaladdpost.component.css']
})
export class ModaladdpostComponent implements OnInit  {

  //private file        : File;
  file: any;
  selectedFile        : ImageSnippet;
  sampleProfilePic    = "../../../../../assets/images/profile-picture.png";
  urls                = new Array<string>();
  value               = 100;
  seconds: number     = 0;
  public spinner: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  ngOnInit() {

  }

  public proccessFile(photo:any) {
    console.log(this.urls);
    this.file = photo.files[0];
    const reader = new FileReader();

    this.startProgress();
    this.spinner.next(true);
    reader.addEventListener('load', (event: any) => {
      this.spinner.next(false);
      console.log("this.file" );
      console.log(this.file);
      this.selectedFile = new ImageSnippet(event.target?.result, this.file);
      this.urls.push(event.target.result);
    });
    reader.readAsDataURL(this.file);
  }

  public deleteImage(): void {
    if(this.urls.length == 1) {
      this.urls = [];
      console.log("this.file delete antes: " );
      console.log(this.file);
      this.file = null; //new File([], "", undefined);

      console.log("this.file delete despues: " );
      console.log(this.file);
      this.selectedFile = new ImageSnippet('',this.file);
    }
  }

  progress = new BehaviorSubject(0);
  startProgress() {
    this.spinner.next(true);
    const interval = setInterval(() => {
      this.spinner.next(false);
      this.progress.next(this.progress.value + 100);
      if (this.progress.value >= 100) {
        clearInterval(interval);
      }
    }, 5);
  }
}
