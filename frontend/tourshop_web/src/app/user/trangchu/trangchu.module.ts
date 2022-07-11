import { NgModule, LOCALE_ID } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimkiemComponent } from "./trangchu-component/timkiem/timkiem.component";
import { TrangchuComponent } from "./trangchu.component";
import { TienichComponent } from "./trangchu-component/tienich/tienich.component";
import { RouterModule, Routes } from "@angular/router";
import { GioithieuComponent } from "./trangchu-component/gioithieu/gioithieu.component";
import { UudiemComponent } from "./trangchu-component/uudiem/uudiem.component";
import { BestsellingtoursComponent } from "./trangchu-component/bestsellingtours/bestsellingtours.component";
import { NewtoursComponent } from "./trangchu-component/newtours/newtours.component";
import { TintucComponent } from "./trangchu-component/tintuc/tintuc.component";
import { DuLichAnToanComponent } from "./trangchu-component/du-lich-an-toan/du-lich-an-toan.component";
import { UuDaiTotNhatComponent } from "./trangchu-component/uu-dai-tot-nhat/uu-dai-tot-nhat.component";
import { DiaDiemYeuThichComponent } from "./trangchu-component/dia-diem-yeu-thich/dia-diem-yeu-thich.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { HeaderComponent } from "../component/header/header.component";

@NgModule({
  declarations: [
    TimkiemComponent,
    TrangchuComponent,
    TienichComponent,
    DuLichAnToanComponent,
    GioithieuComponent,
    UudiemComponent,
    BestsellingtoursComponent,
    NewtoursComponent,
    TintucComponent,
    UuDaiTotNhatComponent,
    DiaDiemYeuThichComponent,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    RouterModule,
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "de-DE", // 'de-DE' for Germany, 'fr-FR' for France ...
    },
  ],
})
export class TrangchuModule {}
