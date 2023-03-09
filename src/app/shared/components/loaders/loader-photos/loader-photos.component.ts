import { Component , ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Post } from "@data/models/post";
import { ScriptsService } from 'app/services/scripts/scripts.service';

@Component({
  selector: 'app-loader-photos',
  templateUrl: './loader-photos.component.html',
  styleUrls: ['./loader-photos.component.css']
})
export class LoaderPhotosComponent implements OnInit  {

  // TODO: Properties
  @Input() posts: Post[] = [];
  public photo: boolean = true;
  @ViewChild('ElementRefCard') ElementViewCard: ElementRef;
  @ViewChild('ElementRefImgCont') ElementViewImgCont: ElementRef;
  @ViewChild('ElementRefCardBody') ElementViewCardBody: ElementRef;
  @ViewChild('ElementRefRow') ElementRefRow: ElementRef;

  // TODO: Lifecycle
  constructor( public scripts: ScriptsService  ) {
  }

  // TODO: Helpers
  ngAfterViewInit() {
    this.setPlaceholder();
    setTimeout (() => {
      this.unsetPlaceholder();
    }, 1000);
  }

  ngOnInit() { }

  public setPlaceholder() {
    /**
     * Se comprueba si existe la clase "card--skeleton"
     * Si no existe entonces se procede a añadir esa clase en el elemento
     * y luego se borra todo lo que tiene el ememente referenciado
     */
    if ( !this.ElementViewCard.nativeElement.classList.contains("card--skeleton") && !this.ElementViewImgCont.nativeElement.classList.contains("col-xl-4 col-md-4 col-4") ) {
      this.ElementViewCard.nativeElement.classList.add("card--skeleton");
      this.ElementViewImgCont.nativeElement.innerHTML = "";
    }
  }

  public unsetPlaceholder() {
    /**
     * Se comprueba si existe la clase "card--skeleton"
     * Y tambien se comprueba si el elemente referenciado (ElementViewCard) contiene * hijos por debajo.
     * Si no lo tuviese entonces se añade un hijo (img)
     */
    if ( this.ElementViewCard.nativeElement.classList.contains("card--skeleton") && this.ElementViewCardBody.nativeElement.children.length != 0 ) {
      this.ElementViewCard.nativeElement.classList.remove("card--skeleton");
      this.ElementViewCardBody.nativeElement.innerHTML = "";
      /**
       * Se comprueba que el elemente ElementViewImgCardBody 
       * no tenga hijos por debajo para intentar crear un nuevo hijo o elemente.
       */
      if ( this.ElementViewCardBody.nativeElement.children.length == 0 ) {
        this.posts.forEach((element) => {
          this.ElementViewCardBody.nativeElement.innerHTML += `
            <figure class="col-xl-4 col-md-4 col-4">
              <a> <img src='${element.imageURL}'></img> </a>
            <figure>
          `;
        });
      }
    }
  }
}