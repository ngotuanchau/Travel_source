import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DiaDiemsIndexComponent } from "./index/index.component";
import { DiaDiemsCreateComponent } from "./create/create.component";
import { DiaDiemsDetailComponent } from "./detail/detail.component";
import { DiaDiemsEditComponent } from "./edit/edit.component";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { SearchfilterPipe } from "../../../searchfilter.pipe";

@NgModule({
  declarations: [
    DiaDiemsIndexComponent,
    DiaDiemsCreateComponent,
    DiaDiemsDetailComponent,
    DiaDiemsEditComponent,
    SearchfilterPipe,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class DiaDiemsModule {}
