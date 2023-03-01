import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FeedComponent } from './feed/feed.component';
import { UserRoutingModule } from './user-routing.module';
import { MainComponent } from './main/main.component';
import { WidgetsComponent } from './widgets/widgets.component';


@NgModule({
  declarations: [
    SidebarComponent,
    FeedComponent,
    MainComponent,
    WidgetsComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
