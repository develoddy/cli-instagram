import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@shared/shared.module';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { AccountsComponent } from './accounts/accounts.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


@NgModule({
  imports: [
    SharedModule,
    OnboardingRoutingModule,
    AngularFireStorageModule
  ],
  declarations: [
    LoginComponent,
    AccountsComponent
  ],
  providers: []
})
export class OnboardingModule { }
