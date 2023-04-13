import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { ExploreComponent } from './components/explore/explore.component';
import { FeedComponent } from './components/feed/feed.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from '@core/guards/auth.guard';


const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', redirectTo: "feed", pathMatch: "full" },
      { path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
      { path: 'profile/:username', component: ProfileComponent},
      { path: 'profile/:postId', component: ProfileComponent},
      { path: 'explore', component: ExploreComponent},
      { path: 'inbox', component: InboxComponent},
      { path: 'users', component: UsersComponent},
      { path: 'bookmark', component: BookmarkComponent},
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
