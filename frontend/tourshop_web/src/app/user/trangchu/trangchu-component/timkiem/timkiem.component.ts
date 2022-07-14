import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FormField } from "../../../../user/pages/search";
import { DiadiemsService } from "../../../../service/diadiems.service";
import { TheloaisService } from "../../../../service/theloais.service";
import { ToursService } from "../../../../service/tours.service";

@Component({
  selector: "app-timkiem",
  templateUrl: "./timkiem.component.html",
  styleUrls: ["./timkiem.component.scss"],
})
export class TimkiemComponent implements OnInit {
  pipe = new DatePipe("en-US");
  form: FormGroup;
  readonly FormField = FormField;

  constructor(
    private tourservice: ToursService,
    private theloaiService: TheloaisService,
    private diadiemService: DiadiemsService,
    private routes: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      [FormField?.theloai]: [0],
      [FormField?.khuvuc]: [0],
      [FormField?.diemdi]: [0],
      [FormField?.diemden]: [0],
      [FormField?.amthuc]: [""],
      [FormField?.luutru]: [""],
      [FormField?.phuongtien]: [""],
      [FormField?.thoigiandi]: [""],
      [FormField?.dichvu]: [""],
    });
  }

  ngOnInit(): void {
    this.getTheLoai();
    this.getAllDiaDiem();
  }

  theloais: any;
  //Lay the loai
  getTheLoai() {
    this.theloaiService.getTheLoai().subscribe((response) => {
      this.theloais = response.listTheLoai;
    });
  }
  findTLById(id: number) {
    return this.theloais.find((item: any) => item.id == id)?.tenLoai;
  }
  diadiems: any;
  //Lay tat ca dia diem
  getAllDiaDiem() {
    this.diadiemService.getAllDiaDiem().subscribe((response) => {
      this.diadiems = response.listDiaDiem;
    });
  }
  findDDById(id: number) {
    return this.diadiems.find((item: any) => item.id == id)?.ten;
  }
  ngayKh: Date = new Date();
  newtours: any;
  onSearch() {
    this.routes.navigate(["search"]);
    // let ngayKh = this.pipe.transform(this.ngayKh, "dd/MM/yyyy");
    // console.log("Ngày: ");
    // console.log(ngayKh);
    // this.tourservice.search(this.form.value).subscribe((res) => {
    //   if (res == null) {
    //     console.log("Không có Tour liên quan");
    //   } else {
    //     this.newtours = [];
    //     this.newtours = res;
    //     console.log("Tour:");
    //     console.log(this.newtours);

    //   }
    // });
  }
}
