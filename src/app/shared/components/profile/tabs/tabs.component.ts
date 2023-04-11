import { Component , Input, OnInit} from '@angular/core';
import { User } from "@data/models/user";
import { ScriptsService } from 'app/services/scripts/scripts.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit  {

  @Input() user: User;

  constructor( public scripts: ScriptsService, ) {
    this.scripts.loadFiles(["loader"]);
  }
  

  ngOnInit() {
  }

}
