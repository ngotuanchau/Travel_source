import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { SignupBusinessComponent } from "./signup/signup-business/signup-business.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { LoginadminComponent } from "./login/loginadmin/loginadmin.component";
import { NgToastModule } from "ng-angular-popup";

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupBusinessComponent,
    LoginadminComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    NgToastModule,
  ],
})
export class AuthModule {}
