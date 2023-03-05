import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './components/explore/explore.component';
import { FeedComponent } from './components/feed/feed.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: "", redirectTo: "received", pathMatch: "full" },
      { path: '', component: FeedComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'explore', component: ExploreComponent},
      { path: 'inbox', component: InboxComponent},
      { path: 'users', component: UsersComponent},
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
