import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { SidebarRoutingModule } from './sidebar-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ExploreComponent } from './components/explore/explore.component';
import { FeedComponent } from './components/feed/feed.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    ExploreComponent,
    FeedComponent,
    InboxComponent,
    UsersComponent,
  ],
  imports: [
    SharedModule,
    SidebarRoutingModule,
  ]
})
export class SidebarModule { }
