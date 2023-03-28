import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/http/authentication.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {

  public showBirthDay = false;
  public showDataUsername = true;
  public showCodePhone = false;

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  public sigIn(data: any) {
    this.router.navigate(['login']);
  }

  public showBirthday(data: any) {
    this.showBirthDay = !this.showBirthDay;
    this.showCodePhone = !this.showCodePhone;
    this.showDataUsername = !this.showDataUsername;
  }
}
