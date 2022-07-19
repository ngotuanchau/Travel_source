import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { TourDeXuatComponent } from "./tour-de-xuat/tour-de-xuat.component";
import { ToursCreateComponent } from "./tours/create/create.component";
import { ToursDetailComponent } from "./tours/detail/detail.component";
import { ToursEditComponent } from "./tours/edit/edit.component";
import { ToursIndexComponent } from "./tours/index/index.component";
import { KhachDatTourComponent } from "./tours/khach-dat-tour/khach-dat-tour.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DiaDiemsIndexComponent } from "./diadiems/index/index.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboardDN",
    pathMatch: "full",
  },
  //Dashboard
  {
    path: "dashboardDN",
    component: DashboardComponent,
  },
  //Tour
  {
    path: "ql-tours",
    component: ToursIndexComponent,
  },
  {
    path: "ql-tours/create",
    component: ToursCreateComponent,
  },
  {
    path: "ql-tours/update/:id",
    component: ToursEditComponent,
  },
  {
    path: "ql-tours/detail/:id",
    component: ToursDetailComponent,
  },
  {
    path: "ql-tours/khach-dat-tour/:id/:id2",
    component: KhachDatTourComponent,
  },
  //Đề xuất Tour
  {
    path: "dx-tours",
    component: TourDeXuatComponent,
  },
  //Đề xuất Địa điểm
  {
    path: "dx-diadiem",
    component: DiaDiemsIndexComponent,
  },
  //Thông tin công ty
  {
    path: "doanhnghiep/profile",
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}
