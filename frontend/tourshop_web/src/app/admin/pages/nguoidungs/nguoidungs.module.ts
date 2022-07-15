import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { NguoiDungsIndexComponent } from "./index/index.component";
import { NguoiDungsCreateComponent } from "./create/create.component";
import { NguoiDungsEditComponent } from "./edit/edit.component";
import { NguoiDungsDetailComponent } from "./detail/detail.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
@NgModule({
  declarations: [
    NguoiDungsIndexComponent,
    NguoiDungsCreateComponent,
    NguoiDungsEditComponent,
    NguoiDungsDetailComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
})
export class NguoiDungsModule {}
