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

  value = 100;
  seconds: number = 0;

  private file: File;
  //file:any;
  selectedFile: ImageSnippet;
  sampleProfilePic = "../../../../../assets/images/profile-picture.png";

  urls = new Array<string>();

  constructor() {}

  ngOnInit(){
    /*const time = 60;
    const timer$ = interval(1000);

    const sub = timer$.subscribe(sec => {
      this.value = 100 - (sec * 100) / 60;
      this.seconds = sec;

      if (this.seconds === 60) {
        sub.unsubscribe();
      }
    });*/
    this.startProgress();
  }
  

  isOpen: boolean = false;

  toggleExpansion() {
    this.isOpen = !this.isOpen;
  }

  startTimer(seconds: number) {}

  progress = new BehaviorSubject(0);
  startProgress() {
    const interval = setInterval(() => {
      this.progress.next(this.progress.value + 5);
      if (this.progress.value >= 100) {
        clearInterval(interval);
      }
    }, 500);
  }

  
  
  public proccessFile(photo:any) {
    console.log(this.urls);
    
    this.file = photo.files[0];

    console.log(this.file);
    
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target?.result, this.file);
      this.urls.push(event.target.result);
    });
    reader.readAsDataURL(this.file);
  }

  // proccessFile(event:any) {
  //   console.log(event);
    
  //   this.urls = [];
  //   this.file = event.target.files;   
  //     for (let file of this.file) {
  //       let reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         this.urls.push(e.target.result);
  //       }
  //       reader.readAsDataURL(file);
  //     }
  // }


  deleteImage(): void {
    this.selectedFile = new ImageSnippet('', this.file);
    console.log("ArroLeft");
    console.log(this.selectedFile);
    console.log("this.urls.length : "+ this.urls.length );

    if(this.urls.length === 1) {
      this.urls = [];
    }

  
    /*if(this.urls.length === 1) {
      this.urls = [];
      return;
    }
    this.urls = this.urls.filter((a) => a !== url);
    console.log();*/
  }


  
}
