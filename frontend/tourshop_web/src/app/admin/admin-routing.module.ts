import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CongTysCreateComponent } from "./pages/congtys/create/create.component";
import { CongTysDetailComponent } from "./pages/congtys/detail/detail.component";
import { CongTysEditComponent } from "./pages/congtys/edit/edit.component";
import { CongTysIndexComponent } from "./pages/congtys/index/index.component";
import { DiaDiemsCreateComponent } from "./pages/diadiems/create/create.component";
import { DiaDiemsDetailComponent } from "./pages/diadiems/detail/detail.component";
import { DiaDiemsEditComponent } from "./pages/diadiems/edit/edit.component";
import { DiaDiemsIndexComponent } from "./pages/diadiems/index/index.component";
import { NguoiDungsCreateComponent } from "./pages/nguoidungs/create/create.component";
import { NguoiDungsDetailComponent } from "./pages/nguoidungs/detail/detail.component";
import { NguoiDungsEditComponent } from "./pages/nguoidungs/edit/edit.component";
import { NguoiDungsIndexComponent } from "./pages/nguoidungs/index/index.component";
import { TheLoaiIndexComponent } from "./pages/theloais/index/index.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },

  //The loai
  {
    path: "theloai",
    component: TheLoaiIndexComponent,
  },
  //Dia Diem
  {
    path: "diadiem",
    component: DiaDiemsIndexComponent,
  },
  {
    path: "diadiem/create",
    component: DiaDiemsCreateComponent,
  },
  {
    path: "diadiem/update",
    component: DiaDiemsEditComponent,
  },
  {
    path: "diadiem/detail",
    component: DiaDiemsDetailComponent,
  },

  //NguoiDung
  {
    path: "nguoidung",
    component: NguoiDungsIndexComponent,
  },
  {
    path: "nguoidung/create",
    component: NguoiDungsCreateComponent,
  },
  {
    path: "nguoidung/update/:id",
    component: NguoiDungsEditComponent,
  },
  {
    path: "nguoidung/detail/:id",
    component: NguoiDungsDetailComponent,
  },

  //Cong ty
  {
    path: "congty",
    component: CongTysIndexComponent,
  },
  {
    path: "congty/create",
    component: CongTysCreateComponent,
  },
  {
    path: "congty/update",
    component: CongTysEditComponent,
  },
  {
    path: "congty/detail",
    component: CongTysDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
