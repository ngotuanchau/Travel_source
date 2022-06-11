import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardComponent } from "./dashboard.component";
import { FeedsComponent } from "./dashboard-components/feeds/feeds.component";
import { BlogCardsComponent } from "./dashboard-components/top-diadiem/blog-diadiems.component";
import { TopThongKeComponent } from './dashboard-components/top-thong-ke/top-thong-ke.component';
import { TopCongTyComponent } from "./dashboard-components/top-congty/top-congty.component";
const routes: Routes = [
  {
    path: "",
    data: {
      title: "Dashboard",
      urls: [{ title: "Dashboard", url: "/dashboard" }, { title: "Dashboard" }],
    },
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
  ],
  declarations: [
    DashboardComponent,
    FeedsComponent,
    BlogCardsComponent,
    TopThongKeComponent,
    TopCongTyComponent
  ],
})
export class DashboardModule {}
