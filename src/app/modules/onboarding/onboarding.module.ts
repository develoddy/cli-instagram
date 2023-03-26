import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@shared/shared.module';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { AccountsComponent } from './accounts/accounts.component';


@NgModule({
  imports: [
    SharedModule,
    OnboardingRoutingModule
  ],
  declarations: [
    LoginComponent,
    AccountsComponent
  ]
})
export class OnboardingModule { }
