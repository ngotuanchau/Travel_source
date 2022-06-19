import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BusinessRoutingModule } from "./business-routing.module";
import { ToursModule } from "./tours/tours.module";
import { TourDeXuatComponent } from "./tour-de-xuat/tour-de-xuat.component";
import { CKEditorModule } from "ckeditor4-angular";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [TourDeXuatComponent],
  imports: [CommonModule, BusinessRoutingModule, CKEditorModule, ToursModule],
})
export class BusinessModule {}
