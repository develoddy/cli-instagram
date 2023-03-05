import { Component, Input, Output } from '@angular/core';
import { UserService } from '@data/services/api/user.service';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent {

  // TODO: PROPERTIES
  public url: string;
  @Input() identity:any;

  // TODO: LIFECYCLE
  constructor(
    private userService: UserService
  ) {
    this.url = this.userService.url;
  }

  // TODO: HELPERS
}
