import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@shared/shared.module';
import { OnboardingRoutingModule } from './onboarding-routing.module';


@NgModule({
  imports: [
    SharedModule,
    OnboardingRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class OnboardingModule { }
