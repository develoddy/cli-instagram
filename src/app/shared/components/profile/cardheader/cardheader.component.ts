import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-cardheader',
  templateUrl: './cardheader.component.html',
  styleUrls: ['./cardheader.component.css']
})
export class CardheaderComponent implements OnInit {

  constructor( private route: ActivatedRoute ) {}

  ngOnInit() {}

}
