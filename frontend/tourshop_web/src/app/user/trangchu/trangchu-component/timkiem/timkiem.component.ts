import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FormField } from "../../../../user/pages/search";
import { DiadiemsService } from "../../../../service/diadiems.service";
import { TheloaisService } from "../../../../service/theloais.service";
import { ToursService } from "../../../../service/tours.service";
import { PhanvungsService } from "../../../../service/phanvungs.service";

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
    private formBuilder: FormBuilder,
    private phanvungService: PhanvungsService
  ) {
    this.form = this.formBuilder.group({
      [FormField?.theloai]: [null],
      [FormField?.khuvuc]: [null],
      [FormField?.diemdi]: [null],
      [FormField?.diemden]: [null],
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
    this.getPhanVung();
  }
  phanvungs: any;
  getPhanVung() {
    this.phanvungs = [];
    this.phanvungService.getPhanVung().subscribe((res) => {
      this.phanvungs = res.listPhanVung;
    });
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
    let value = this.form.value;
    Object.keys(value).forEach((key) => {
      if (!value[key]) {
        delete value[key];
      }
    });
    this.routes.navigate(["/search"], { queryParams: value });
  }
}
