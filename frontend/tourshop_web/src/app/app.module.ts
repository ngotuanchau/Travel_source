import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FullComponent } from "./layouts/full/full.component";

import { NavigationComponent } from "./shared/header/navigation.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";

import { Approutes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AuthLayoutComponent } from "./layouts/auth/auth.component";
import { UserLayoutComponent } from "./layouts/user-layout/user-layout.component";
import { HeaderComponent } from "./user/component/header/header.component";
import { FooterComponent } from "./user/component/footer/footer.component";
import { BusinessComponent } from "./layouts/business/business.component";
import { SidebarBusinessComponent } from "./shared/sidebar-business/sidebar.component";
import { CookieService } from "ngx-cookie-service";
import { TokenInterceptorService } from "./service/token-interceptor.service";
import { NgToastModule } from "ng-angular-popup";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20,
};

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    SidebarBusinessComponent,
    AuthLayoutComponent,
    UserLayoutComponent,
    HeaderComponent,
    FooterComponent,
    BusinessComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgToastModule,
    RouterModule.forRoot(Approutes, {
      useHash: false,
      relativeLinkResolution: "legacy",
    }),
    PerfectScrollbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
