import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { CongTysIndexComponent } from "./index/index.component";
import { CongTysCreateComponent } from "./create/create.component";
import { CongTysEditComponent } from "./edit/edit.component";
import { CongTysDetailComponent } from "./detail/detail.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
@NgModule({
  declarations: [
    CongTysIndexComponent,
    CongTysCreateComponent,
    CongTysEditComponent,
    CongTysDetailComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
  ],
})
export class CongTysModule {}
