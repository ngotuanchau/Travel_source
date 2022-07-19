import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DiaDiemsIndexComponent } from "./index/index.component";
import { DiaDiemsCreateComponent } from "./create/create.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [DiaDiemsCreateComponent, DiaDiemsIndexComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DiaDiemsModule {}
