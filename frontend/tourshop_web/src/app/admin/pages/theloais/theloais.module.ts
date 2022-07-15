import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TheLoaiIndexComponent } from "./index/index.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [TheLoaiIndexComponent],
  imports: [CommonModule, NgbModule, RouterModule],
})
export class TheloaisModule {}
