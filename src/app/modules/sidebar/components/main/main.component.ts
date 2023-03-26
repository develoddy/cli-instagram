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

    // TODO: - LIFECYCLE
    constructor(
        public scripts: ScriptsService,
        public sanitizer: DomSanitizer,
        private authenticationService: AuthenticationService,
        private router: Router,
        private postsService: PostService
    ) {
        
        if ( !this.authenticationService.isLoggedIn ) {
            this.router.navigate([ 'login' ])
        }

        this.identity = this.authenticationService.getIdentity();
        this.loadScripts();
    }

    // TODO: - HELPER
    ngOnInit() {
        this.getCurrrentUser();
    }

    private loadScripts() {
        this.scripts.loadFiles(["sidebar-menu"]);
    }

    public getCurrrentUser() {
        this.clientesSubscription = this.authenticationService.getCurrentUser().subscribe(( snapshot ) => {
            this.currentUser = snapshot.payload.data();
            this.username = this.currentUser.username!;  
        });
    }

    ngOnDestroy() {
        if (this.clientesSubscription) {
            this.clientesSubscription.unsubscribe();
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
