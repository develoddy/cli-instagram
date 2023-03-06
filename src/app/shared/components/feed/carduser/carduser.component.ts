import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "@core/http/authentication.service";

@Component({
      selector: "app-carduser",
      templateUrl: "./carduser.component.html",
      styleUrls: ["./carduser.component.css"],
})
export class CarduserComponent implements OnInit {
      // TODO: Properties
      public currentUser: any;
      @Output() eventUser = new EventEmitter();

      // TODO: Lifecycle
      constructor(
            public authService: AuthenticationService,
            private router: Router,
            private route: ActivatedRoute
      ) {
            authService.getCurrentUser().subscribe((snapshot) => {
                  this.currentUser = snapshot.data();
            });
      }

      ngOnInit() {}

      // TODO: ViewModel

      // TODO: Helpers

      gotToProfile(user: any) {
            console.log(user);
            
            this.eventUser.emit(user);
      }
}
