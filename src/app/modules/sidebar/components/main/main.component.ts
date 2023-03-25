import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { AuthenticationService } from "@core/http/authentication.service";
import { User } from "@data/models/user";
import { PostService } from "@data/services/api/post.service";
import { ScriptsService } from "app/services/scripts/scripts.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
    
    // TODO: ----- Properties -----
    public cssUrl: string = "";
    public identity = null;
    public currentUser: User;
    public username: string;
    clientesSubscription: Subscription;

    // TODO: ----- Lifecycle -----
    constructor(
        public scripts: ScriptsService,
        public sanitizer: DomSanitizer,
        private authService: AuthenticationService,
        private router: Router,
        private postsService: PostService
    ) {
        this.identity = this.authService.getIdentity();
        this.loadScripts();
        if ( !this.authService.getIdentity() ) {
            this.router.navigate(["/"]);
        }
    }

    // TODO: ----- Helpers -----
    ngOnInit() {
        this.getCurrrentUser();
    }

    private loadScripts() {
        this.scripts.loadFiles(["sidebar-menu"]);
        // this.scripts.loadFiles(["icons/feather-icon/feather.min"]);
        // this.scripts.loadFiles(["icons/feather-icon/feather-icon"]);
        // this.scripts.loadFiles(["script"]);
        
    }

    public getCurrrentUser() {
        this.clientesSubscription = this.authService.getCurrentUser().subscribe(( snapshot ) => {
            this.currentUser = snapshot.payload.data();
            this.username = this.currentUser.username!;  
        });
    }

    ngOnDestroy() {
        // acciones de destrucción
        if (this.clientesSubscription) {
            this.clientesSubscription.unsubscribe();
            console.log("DEBUG: ngDestroy main.component");
            console.log(this.clientesSubscription.unsubscribe);
            
            
        }
    }

    /*public goToProfile() {
      this.authService.getCurrentUser().subscribe((snapshot) => {
            this.currentUser = snapshot.data();           
                this.router.navigate(['/profile'], {
                  state: {
                        key: 1,
                        data: this.currentUser
                  }
            });
      });
    }*/
}
