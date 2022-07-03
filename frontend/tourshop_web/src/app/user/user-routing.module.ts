import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DatTourComponent } from "./pages/dat-tour/dat-tour.component";
import { NewtoursComponent } from "./pages/newtours/newtours.component";
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
    path: "booking",
    component: DatTourComponent,
    data: { title: "Đặt tour" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
