import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guard/auth.guard";
import { DatTourComponent } from "./pages/dat-tour/dat-tour.component";
import { NewtoursComponent } from "./pages/newtours/newtours.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { SearchResultComponent } from "./pages/search-result/search-result.component";
import { TourByDiemDenComponent } from "./pages/tour-by-diem-den/tour-by-diem-den.component";
import { TourByTheLoaiComponent } from "./pages/tour-by-the-loai/tour-by-the-loai.component";
import { TourDetailComponent } from "./pages/tour-detail/tour-detail.component";
import { TrangchuComponent } from "./trangchu/trangchu.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: TrangchuComponent,
    data: { title: "Trang chủ" },
  },
  {
    path: "newtours",
    component: NewtoursComponent,
    data: { title: "Tour mới" },
  },
  {
    path: "tour/detail/:id",
    component: TourDetailComponent,
    data: { title: "Chi tiết tour" },
  },
  {
    path: "tour/theloai/:id",
    component: TourByTheLoaiComponent,
    data: { title: "" },
  },
  {
    path: "tour/diemden/:id",
    component: TourByDiemDenComponent,
    data: { title: "" },
  },
  {
    path: "booking/:id/:id2",
    component: DatTourComponent,
    data: { title: "Đặt tour" },
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    data: { title: "Trang cá nhân" },
    canActivate: [AuthGuard],
  },
  {
    path: "search",
    component: SearchResultComponent,
    data: { title: "Tìm kiếm" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
