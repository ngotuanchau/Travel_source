import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { DiaDiemsModule } from "./pages/diadiems/diadiems.module";
import { NguoiDungsModule } from "./pages/nguoidungs/nguoidungs.module";
import { CongTysModule } from "./pages/congtys/congtys.module";
import { TheloaisModule } from "./pages/theloais/theloais.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DashboardModule,
    DiaDiemsModule,
    NguoiDungsModule,
    CongTysModule,
    TheloaisModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
