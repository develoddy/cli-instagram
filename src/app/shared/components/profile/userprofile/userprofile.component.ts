import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/http/authentication.service';
import { Post } from '@data/models/post';
import { User } from '@data/models/user';
import { ScriptsService } from 'app/services/scripts/scripts.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  // -- Properties
  @Input() posts: Post[] = [];
  @Input() identity: any;
  @Input() user: User;
  @Input() followButtonText: string;
  

  // -- Lifecycle
  constructor(
    public scripts: ScriptsService,
    private authService: AuthenticationService,
  ) {
    this.scripts.loadFiles(["loader"]);
    this.identity = this.authService.getIdentity();
  }

  ngOnInit() {
  }

  // -- Helpers

}
