import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatTourComponent } from "./dat-tour.component";
import { ThongTinKhachComponent } from "./components/thong-tin-khach/thong-tin-khach.component";
import { ThongTinVeComponent } from "./components/thong-tin-ve/thong-tin-ve.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [DatTourComponent, ThongTinKhachComponent, ThongTinVeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class DatTourModule {}
