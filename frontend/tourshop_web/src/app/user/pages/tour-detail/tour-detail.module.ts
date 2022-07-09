import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TourDetailComponent } from "./tour-detail.component";
import { LichTrinhChiTietComponent } from "./components/lich-trinh-chi-tiet/lich-trinh-chi-tiet.component";
import { BangGiaComponent } from "./components/bang-gia/bang-gia.component";
import { TourLienQuanComponent } from "./components/tour-lien-quan/tour-lien-quan.component";
import { MatButtonModule } from "@angular/material/button";
import { AnhTourComponent } from "./components/anh-tour/anh-tour.component";
import { SlickCarouselModule } from "ngx-slick-carousel";
@NgModule({
  declarations: [
    TourDetailComponent,
    LichTrinhChiTietComponent,
    BangGiaComponent,
    TourLienQuanComponent,
    AnhTourComponent,
  ],
  imports: [CommonModule, MatButtonModule, SlickCarouselModule],
})
export class TourDetailModule {}
