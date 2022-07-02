import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LoginadminComponent } from "./login/loginadmin/loginadmin.component";
import { SignupComponent } from "./signup/signup.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "login_admin",
    component: LoginadminComponent,
  },
  {
    path: "logout",
    redirectTo: "/login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
