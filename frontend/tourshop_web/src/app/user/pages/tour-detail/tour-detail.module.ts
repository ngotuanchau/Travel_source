import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TourDetailComponent } from "./tour-detail.component";
import { LichTrinhChiTietComponent } from "./components/lich-trinh-chi-tiet/lich-trinh-chi-tiet.component";
import { BangGiaComponent } from "./components/bang-gia/bang-gia.component";
import { TourLienQuanComponent } from "./components/tour-lien-quan/tour-lien-quan.component";
import { MatButtonModule } from "@angular/material/button";
import { AnhTourComponent } from "./components/anh-tour/anh-tour.component";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { DichVuComponent } from './components/dich-vu/dich-vu.component';
@NgModule({
  declarations: [
    TourDetailComponent,
    LichTrinhChiTietComponent,
    BangGiaComponent,
    TourLienQuanComponent,
    AnhTourComponent,
    DichVuComponent,
  ],
  imports: [CommonModule, MatButtonModule, SlickCarouselModule],
})
export class TourDetailModule {}
