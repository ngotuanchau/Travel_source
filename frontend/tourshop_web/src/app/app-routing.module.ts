import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoleGuard } from "./guard/role.guard";
import { RoleadminGuard } from "./guard/roleadmin.guard";
import { AuthLayoutComponent } from "./layouts/auth/auth.component";
import { BusinessComponent } from "./layouts/business/business.component";

import { FullComponent } from "./layouts/full/full.component";
import { UserLayoutComponent } from "./layouts/user-layout/user-layout.component";

export const Approutes: Routes = [
  {
    path: "",
    component: UserLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/home",
        pathMatch: "full",
      },
      {
        path: "",
        loadChildren: () =>
          import("./user/user.module").then((m) => m.UserModule),
      },
    ],
  },
  {
    path: "",
    component: FullComponent,
    children: [
      {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full",
      },
      {
        path: "",
        loadChildren: () =>
          import("./admin/admin.module").then((m) => m.AdminModule),
      },
    ],
    canActivate: [RoleadminGuard],
  },
  {
    path: "",
    component: BusinessComponent,
    children: [
      {
        path: "",
        redirectTo: "/ql-tours",
        pathMatch: "full",
      },
      {
        path: "",
        loadChildren: () =>
          import("./business/business.module").then((m) => m.BusinessModule),
      },
    ],
    canActivate: [RoleGuard],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/login",
        pathMatch: "full",
      },

      {
        path: "",
        loadChildren: () =>
          import("./auth/auth.module").then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "/starter",
  },
];
