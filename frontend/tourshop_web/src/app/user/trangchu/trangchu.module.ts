import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimkiemComponent } from './trangchu-component/timkiem/timkiem.component';
import { TrangchuComponent } from './trangchu.component';
import { TienichComponent } from './trangchu-component/tienich/tienich.component';
import { DiadanhComponent } from './trangchu-component/diadanh/diadanh.component';
import { GioithieuComponent } from './trangchu-component/gioithieu/gioithieu.component';
import { UudiemComponent } from './trangchu-component/uudiem/uudiem.component';
import { BestsellingtoursComponent } from './trangchu-component/bestsellingtours/bestsellingtours.component';
import { NewtoursComponent } from './trangchu-component/newtours/newtours.component';
import { TintucComponent } from './trangchu-component/tintuc/tintuc.component';


@NgModule({
  declarations: [
    TimkiemComponent,
    TrangchuComponent,
    TienichComponent,
    DiadanhComponent,
    GioithieuComponent,
    UudiemComponent,
    BestsellingtoursComponent,
    NewtoursComponent,
    TintucComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class TrangchuModule { }
