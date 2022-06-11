import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { ToursModule } from './tours/tours.module';
import { TourDeXuatComponent } from './tour-de-xuat/tour-de-xuat.component';


@NgModule({
  declarations: [
    TourDeXuatComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    ToursModule,
  ]
})
export class BusinessModule { }
