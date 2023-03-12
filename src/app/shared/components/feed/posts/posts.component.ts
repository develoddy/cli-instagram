
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { AuthenticationService } from "@core/http/authentication.service";
import { Post } from "@data/models/post";
import { UserService } from "@data/services/api/user.service";

@Component({
      selector: "app-posts",
      templateUrl: "./posts.component.html",
      styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
      // TODO: Properties
      @Input() posts: Post[] = [];
      @Input() noMore: boolean = false;
      @Input() identity: any;
      @Output() eventViewMore = new EventEmitter();
      @Output() eventGotoProfile = new EventEmitter();
      public username: string = "";

      // Loader properties
      @ViewChild('ElementRefCard') ElementViewCard: ElementRef;
      @ViewChild('ElementRefCardBody') ElementViewCardBody: ElementRef;
      @ViewChild('ElementRefAvatar') ElementViewAvatar: ElementRef;
      @ViewChild('ElementRefMedia') ElementViewMedia: ElementRef;
      @ViewChild('ElementRefUsername') ElementViewUsername: ElementRef;
      @ViewChild('ElementRefPostImage') ElementRefPostImage: ElementRef;
      @ViewChild('ElementRefRow') ElementRefPostRow: ElementRef;
      @ViewChild('nativeElement') Element: ElementRef;

      // TODO: Lifecycle
      constructor(
            private _userService: UserService, 
            private _authService: AuthenticationService,
            private renderer: Renderer2,
            private elementRef:ElementRef
      ) {
            this.identity = this._authService.getIdentity();
      }


      // TODO: Helpers
      ngAfterViewInit() {
            
            


            this.setPlaceholder();
            setTimeout (() => {
                  this.unsetPlaceholder();
            }, 1000);
      }

      public setPlaceholder() {
            if ( !this.ElementViewCard.nativeElement.classList.contains("card--skeleton") ) {
                  this.ElementViewCard.nativeElement.classList.add("card--skeleton");
            } else {

                  this.ElementViewCardBody.nativeElement.innerHTML = '';

                  const new_users_socialDIV = this.renderer.createElement('div');
                  this.renderer.addClass(new_users_socialDIV, 'new-users-social');
                  this.renderer.appendChild(this.ElementViewCardBody.nativeElement, new_users_socialDIV);

                  const mediaDIV = this.renderer.createElement('div');
                  this.renderer.addClass(mediaDIV, 'media');
                  this.renderer.appendChild(new_users_socialDIV, mediaDIV);

                  const imageIMG = this.renderer.createElement('img');
                  this.renderer.addClass(imageIMG, 'avatarLoader');
                  this.renderer.addClass(imageIMG, 'rounded-circle');
                  this.renderer.appendChild(mediaDIV, imageIMG);

                  const media_bodyDIV = this.renderer.createElement('div');
                  this.renderer.addClass(media_bodyDIV, 'media-body');
                  this.renderer.appendChild(mediaDIV, media_bodyDIV);

                  const h6 = this.renderer.createElement('h6');
                  this.renderer.addClass(h6, 'h6');
                  this.renderer.appendChild(media_bodyDIV, h6);

                  const p = this.renderer.createElement('p');
                  this.renderer.addClass(p, 'p');
                  this.renderer.appendChild(media_bodyDIV, p);

                  const imagePostIMG = this.renderer.createElement('img');
                  this.renderer.addClass(imagePostIMG, 'img-fluid');
                  this.renderer.addClass(imagePostIMG, 'imagePostLoader');
                  this.renderer.appendChild(this.ElementViewCardBody.nativeElement, imagePostIMG);
            }
      }

      public unsetPlaceholder() {
            if ( this.ElementViewCard.nativeElement.classList.contains("card--skeleton") ) {
                  this.ElementViewCard.nativeElement.classList.remove("card--skeleton");
                  this.ElementRefPostRow.nativeElement.innerHTML = "";
                  if ( this.ElementRefPostRow.nativeElement.children.length == 0 ) {
                        /*
                        Eso no está destinado a funcionar. (click)="..."o cualquier marcado específico de Angular se procesa en el momento de la compilación. Si los agrega en tiempo de ejecución, no tienen ningún efecto (se agregan al DOM tal cual, pero Angular los ignora por completo)

                        Puede usar código imperativo para consultar el elemento después de agregarlo y agregar un detector de eventos como lo haría condart:html
                        */
                        this.posts.forEach((post) => {
                              this.ElementRefPostRow.nativeElement.innerHTML += `
                              <div class="col-xl-10 col-md-10 col-sm-10">
                                    <div class="card">
                                          <div class="new-users-social">
                                                <div class="media" #ElementRefMedia>
                                                      <img class="rounded-circle image-radius m-r-15"  src="${post.ownerImageURL} " #ElementRefAvatar />
                                                      <div class="media-body">
                                                            <h6 class="mb-0 f-w-700 code" id="ownerUsername" value="${post.ownerUid}" (click)="navigate(${post})">${post.ownerUsername}</h6>
                                                            <p> hace 20h</p>
                                                      </div>
                                                      <span class="pull-right mt-0">
                                                            <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="feather feather-more-vertical"
                                                            >
                                                            <circle cx="12" cy="12" r="1"></circle>
                                                            <circle cx="12" cy="5" r="1"></circle>
                                                            <circle cx="12" cy="19" r="1"></circle>
                                                            </svg>
                                                      </span>
                                                </div>
                                          </div>
                                          <img class="img-fluid" #ElementRefPostImage width="100%" src="${post.imageURL} "/>

                                          <div class="timeline-content">
                                                <div class="like-content pt-2">
                                                      <span><i class="fa fa-heart font-danger"></i></span>
                                                      <span class="pull-right comment-number">
                                                            <span><i class="fa fa-bookmark-o me-0"></i></span>
                                                      </span>
                                                      <span class="comment-number px-2">
                                                            <span><i class="fa fa-comment-o"></i></span>
                                                      </span>
                                                </div>

                                                <span> 11 Me gusta </span>
                                                <p>Ver los 2 comentarios</p>

                                                <div class="comments-box">
                                                      <div class="media">
                                                            <img class="img-50 img-fluid m-r-20 rounded-circle" alt="" src="${post.ownerImageURL} " />
                                                            <div class="media-body">
                                                                  <div class="input-group text-box">
                                                                        <input class="form-control input-txt-bx" type="text" name="message-to-send" placeholder="Publica tu comentario" />
                                                                        <div class="input-group-append">
                                                                              <button class="btn btn-transparent" type="button"><i class="fa fa-smile-o"> </i></button>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>`;
                        });
                        /*let element = document.getElementById("code")!;
                        element.onclick = function() {
                        }*/
                  }
            }

            // 
            
            document.getElementById('ownerUsername')!.onclick = (e) => {
                  console.log("click xxxx");
                  /*const username = document.getElementById("ownerUsername")?.textContent;
                  this.username = username!;
                  this.gotoProfile( this.username );*/
            }
            
            /*document.getElementById('ownerUsername')!.addEventListener("click", function() {
                  console.log("XXXX");
                  
                  
            });*/
            
      }

      ngOnInit() {}

      viewMore() {
            this.eventViewMore.emit(true);
      }

      gotoProfile( username: string ) {
            this.eventGotoProfile.emit( username );
      }
}

