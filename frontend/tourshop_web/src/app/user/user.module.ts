import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { RouterModule } from "@angular/router";
import { TrangchuModule } from "./trangchu/trangchu.module";
import { TourDetailModule } from "./pages/tour-detail/tour-detail.module";
import { DatTourModule } from "./pages/dat-tour/dat-tour.module";
import { Title } from "@angular/platform-browser";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NewtoursComponent } from "./pages/newtours/newtours.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { ProfileComponent } from './pages/profile/profile.component';
@NgModule({
  declarations: [NewtoursComponent, SearchResultComponent, ProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    TrangchuModule,
    TourDetailModule,
    DatTourModule,
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ],
  providers: [Title],
})
export class UserModule {}
