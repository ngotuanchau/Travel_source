import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourDetailComponent } from './tour-detail.component';
import { ToursLienQuanComponent } from './components/tours-lien-quan/tours-lien-quan.component';
import { LichTrinhChiTietComponent } from './components/lich-trinh-chi-tiet/lich-trinh-chi-tiet.component';



@NgModule({
  declarations: [
    TourDetailComponent,
    ToursLienQuanComponent,
    LichTrinhChiTietComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class TourDetailModule { }
