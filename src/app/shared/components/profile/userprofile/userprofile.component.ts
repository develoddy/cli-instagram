import { Component, Input, Output, EventEmitter,  OnInit } from '@angular/core';
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

  // TODO: - PROPERTIES
  @Input() posts: Post[] = [];
  @Input() identity: any;
  @Input() user: User;
  @Input() followButtonText: string;
  @Output() eventUser = new EventEmitter();
  

  // TODO: - LIFECYCLE
  constructor(
    public scripts: ScriptsService,
    private authService: AuthenticationService,
  ) {
    this.scripts.loadFiles(["loader"]);
    this.identity = this.authService.getIdentity();
  }

  ngOnInit() {}

  // TODO: - HELPERS

  // TODO: - ACTIONS

  // AL HACER CLICK EN EL BOTON DE EDITAR O SEGUIR SE ENVIARA 
  // LOS DATOS DEL USUARIO DEL PERFIL QUE SE VISITA AL COMPONENTE PADRE.
  public didTapActionbuttonfor(user: User) {
    this.eventUser.emit( user);
  }
}
