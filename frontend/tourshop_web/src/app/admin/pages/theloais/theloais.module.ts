import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TheLoaiIndexComponent } from "./index/index.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
@NgModule({
  declarations: [TheLoaiIndexComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
  ],
})
export class TheloaisModule {}
