import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { DiadiemsService } from "../../../service/diadiems.service";
import { TheloaisService } from "../../../service/theloais.service";
import { ToursService } from "../../../service/tours.service";
import {
  AmThuc,
  lstAmThucs,
  lstLuuTrus,
  lstPhuongTiens,
  LuuTru,
  PhuongTien,
} from "../dichvu-data";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FormField } from "../search";
import { PhanvungsService } from "../../../service/phanvungs.service";
@Component({
  selector: "app-newtours",
  templateUrl: "./newtours.component.html",
  styleUrls: ["./newtours.component.scss"],
})
export class NewtoursComponent implements OnInit {
  lstAmThuc: AmThuc[];
  lstLuuTru: LuuTru[];
  lstPhuongTien: PhuongTien[];
  title = "Tour mới";
  subTitle = "Cuộc sống là một cuộc phiêu lưu đầy táo bạo hoặc không là gì cả";
  pipe = new DatePipe("en-US");
  form: FormGroup;
  readonly FormField = FormField;
  constructor(
    private tourservice: ToursService,
    private theloaiService: TheloaisService,
    private diadiemService: DiadiemsService,
    private routes: Router,
    private phanvungService: PhanvungsService,
    private formBuilder: FormBuilder
  ) {
    this.lstAmThuc = lstAmThucs;
    this.lstLuuTru = lstLuuTrus;
    this.lstPhuongTien = lstPhuongTiens;
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
  listAT: any;
  listLT: any;
  listPT: any;
  ngayKh: Date = new Date();
  onSearch() {
    let ngayKh = this.pipe.transform(this.ngayKh, "dd/MM/yyyy");
    this.form.patchValue({
      [FormField.amthuc]: this.listAT,
      [FormField.luutru]: this.listLT,
      [FormField.phuongtien]: this.listPT,
      [FormField.thoigiandi]: ngayKh,
    });
    this.form.patchValue({
      [FormField.amthuc]: this.listAT,
      [FormField.luutru]: this.listLT,
      [FormField.phuongtien]: this.listPT,
      [FormField.thoigiandi]: ngayKh,
    });
    this.tourservice.search(this.form.value).subscribe((res) => {
      if (res == null) {
        console.log("Không có Tour liên quan");
      } else {
        this.newtours = [];
        this.newtours = res;
        console.log("Tour:");
        console.log(this.newtours);
      }
    });
  }
  onChangeAT($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;

    this.lstAmThuc = this.lstAmThuc.map((d) => {
      if (d.id == id) {
        d.completed = isChecked;
        return d;
      }
      return d;
    });
    const ids = this.lstAmThuc
      .filter((item) => item.completed)
      .map((item) => item.id);
    // this.listAT = ids;
    var str1 = ids.toString(); // Gives you "42,55"
  }
  onChangeLT($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;

    this.lstLuuTru = this.lstLuuTru.map((d) => {
      if (d.id == id) {
        d.completed = isChecked;
        return d;
      }
      return d;
    });

    const ids = this.lstLuuTru
      .filter((item) => item.completed)
      .map((item) => item.id);
    var str1 = ids.toString();
  }
  onChangePT($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;

    this.lstPhuongTien = this.lstPhuongTien.map((d) => {
      if (d.id == id) {
        d.completed = isChecked;
        return d;
      }
      return d;
    });
    const ids = this.lstPhuongTien
      .filter((item) => item.completed)
      .map((item) => item.id);
    var str1 = ids.toString();
  }
  ngOnInit(): void {
    this.getNewTours();
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
  newtours: any;
  tours: any;
  getNewTours() {
    this.newtours = [];
    this.tours = [];
    this.tourservice.getNewTours().subscribe((response) => {
      for (let tour of response) {
        if (tour.nhungNgayKhoiHanh.length >= 1) {
          this.tours.push(tour);
        }
      }
      this.newtours = this.tours;
    });
  }
  findDateDisplay(id: number) {
    var nkhs = this.newtours.find(
      (item: any) => item.id == id
    )?.nhungNgayKhoiHanh;
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();
    var ngay: any;
    for (let n of nkhs) {
      if (n.ngayKh > today) {
        ngay = n.ngayKh;
        break;
      }
    }
    return this.pipe.transform(ngay, "dd/MM/yyyy");
  }
  findPriceDisplay(id: number) {
    var nkhs = this.newtours.find(
      (item: any) => item.id == id
    )?.nhungNgayKhoiHanh;
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();
    var price: any;
    for (let n of nkhs) {
      if (n.ngayKh > today) {
        price = n.giaNguoiLon;
        break;
      }
    }
    return price;
  }
  findBlankDisplay(id: number, vetoida: number): number {
    var nkhs = this.newtours.find(
      (item: any) => item.id == id
    )?.nhungNgayKhoiHanh;
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();
    var blank = 0;
    for (let n of nkhs) {
      if (n.ngayKh > today) {
        blank = n.vedadat;
        break;
      }
    }
    return this.minus(vetoida, blank);
  }

  minus(a: number, b: number) {
    return a - b;
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
    return this.diadiems.find((item: any) => item.id == id)?.tendiadiem;
  }
  viewDetail(id: number) {
    this.routes.navigate(["/tour/detail/" + id]);
  }
}
