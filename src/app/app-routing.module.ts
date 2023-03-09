import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SkeletonComponent } from "@layout/skeleton/skeleton.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    component: SkeletonComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./modules/onboarding/onboarding.module").then(
            (m) => m.OnboardingModule
          ),
      },
    ],
  },
  {
    path: "",
    component: SkeletonComponent,
    children: [
      {
        //path: 'feed',
        path: "app",
        loadChildren: () =>
          import("./modules/sidebar/sidebar.module").then(
            (m) => m.SidebarModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
