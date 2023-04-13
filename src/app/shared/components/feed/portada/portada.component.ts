import { Component, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '@core/http/authentication.service';
import { UserService } from '@data/services/api/user.service';
import { User } from "@data/models/user";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {

  // ------------- [Properties] -------------
  @Input() user: User;
  @Input() followButtonText: string;

  // ------------- [Lifecycle] -------------
  constructor( private userService: UserService, private authService: AuthenticationService ) {}

  // ------------- [Helpers] -------------
  ngOnInit() {}
}
