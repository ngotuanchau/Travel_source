import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { ToursIndexComponent } from "./index/index.component";
import { ToursCreateComponent } from "./create/create.component";
import { ToursEditComponent } from "./edit/edit.component";
import { ToursDetailComponent } from "./detail/detail.component";
import { RouterModule } from "@angular/router";
import { LichTrinhsIndexComponent } from "../lichtrinhs/index/index.component";
import { NguoiDungsComponent } from "../nguoidungs/index/index.component";
import { CKEditorModule } from "ckeditor4-angular";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheDoTreEmComponent } from "./create/components/bang-gia/bang-gia";
import { NgayKhoiHanhComponent } from "./create/components/ngay-khoi-hanh/ngay-khoi-hanh.component";
import { DichVuComponent } from "./create/components/dich-vu/dich-vu.component";
import { MatRadioModule } from "@angular/material/radio";
import { LichTrinhComponent } from "./create/components/lich-trinh/lich-trinh.component";
import { DiaDiemComponent } from "./create/components/dia-diem/dia-diem.component";
import { AnhTourComponent } from "./create/components/anh-tour/anh-tour.component";
import { MatCardModule } from "@angular/material/card";
import { ThongTinComponent } from "./create/components/thong-tin/thong-tin.component";
@NgModule({
  declarations: [
    ToursIndexComponent,
    ToursCreateComponent,
    ToursEditComponent,
    ToursDetailComponent,
    LichTrinhsIndexComponent,
    NguoiDungsComponent,
    CheDoTreEmComponent,
    NgayKhoiHanhComponent,
    DichVuComponent,
    LichTrinhComponent,
    DiaDiemComponent,
    AnhTourComponent,
    ThongTinComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    CKEditorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
})
export class ToursModule {}
