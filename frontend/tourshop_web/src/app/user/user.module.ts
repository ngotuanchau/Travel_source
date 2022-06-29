import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { TrangchuModule } from './trangchu/trangchu.module';
import { TourDetailModule } from './pages/tour-detail/tour-detail.module';
import { DatTourModule } from './pages/dat-tour/dat-tour.module';
import { NewtoursComponent } from './pages/newtours/newtours.component';


@NgModule({
  declarations: [
  
    NewtoursComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    TrangchuModule,
    TourDetailModule,
    DatTourModule
  ]
})
export class UserModule { }
