import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter } from 'rxjs';
//import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-cardheader',
  templateUrl: './cardheader.component.html',
  styleUrls: ['./cardheader.component.css']
})
export class CardheaderComponent implements OnInit {

  // TODO: Properties
  

  constructor( private route: ActivatedRoute ) {
    


    // this.route.queryParams
    //   .filter(params => params.order)
    //   .subscribe(params => {
    //     console.log(params); // { order: "popular" }

    //     this.order = params.order;
    //     console.log(this.order); // popular
    //   }
    // );
  }

  ngOnInit(){
  }

}
