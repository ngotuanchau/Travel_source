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
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FormField } from "../search";
import { PhanvungsService } from "../../../service/phanvungs.service";
@Component({
  selector: "app-tour-by-diem-den",
  templateUrl: "./tour-by-diem-den.component.html",
  styleUrls: ["./tour-by-diem-den.component.scss"],
})
export class TourByDiemDenComponent implements OnInit {
  lstAmThuc: AmThuc[];
  lstLuuTru: LuuTru[];
  lstPhuongTien: PhuongTien[];
  title = "Tour mới";
  subTitle = "Cuộc sống là một cuộc phiêu lưu đầy táo bạo hoặc không là gì cả";
  pipe = new DatePipe("en-US");
  id: any;
  form: FormGroup;
  readonly FormField = FormField;
  constructor(
    private tourservice: ToursService,
    private theloaiService: TheloaisService,
    private diadiemService: DiadiemsService,
    private routes: Router,
    private activatedRoute: ActivatedRoute,
    private phanvungService: PhanvungsService,
    private formBuilder: FormBuilder
  ) {
    this.lstAmThuc = lstAmThucs;
    this.lstLuuTru = lstLuuTrus;
    this.lstPhuongTien = lstPhuongTiens;
    this.form = this.formBuilder.group({
      [FormField?.theloai]: [null],
      [FormField?.khuvuc]: [null],
      [FormField?.diemdi]: [null],
      [FormField?.diemden]: [null],
      [FormField?.amthuc]: [""],
      [FormField?.luutru]: [""],
      [FormField?.phuongtien]: [""],
      [FormField?.thoigiandi]: [""],
      [FormField?.dichvu]: [null],
    });
  }
  listAT: any;
  listLT: any;
  listPT: any;
  ngayKh: Date = new Date();
  onSearch() {
    let ngayKh = this.pipe.transform(this.ngayKh, "dd/MM/yyyy");
    if (this.form.value.diemdi != null) {
      this.form.patchValue({
        [FormField.diemdi]: Number(this.form.value.diemdi).toString(),
      });
    }
    if (this.form.value.diemden != null) {
      this.form.patchValue({
        [FormField.diemden]: Number(this.form.value.diemden).toString(),
      });
    }
    if (this.form.value.khuvuc != null) {
      this.form.patchValue({
        [FormField.khuvuc]: Number(this.form.value.khuvuc).toString(),
      });
    }
    if (this.form.value.theloai != null) {
      this.form.patchValue({
        [FormField.theloai]: Number(this.form.value.theloai).toString(),
      });
    }
    if (this.form.value.diemden == null) {
      this.form.patchValue({
        [FormField.amthuc]: this.listAT,
        [FormField.luutru]: this.listLT,
        [FormField.phuongtien]: this.listPT,
        [FormField.thoigiandi]: ngayKh,
        [FormField.diemden]: this.id,
      });
    } else {
      this.form.patchValue({
        [FormField.amthuc]: this.listAT,
        [FormField.luutru]: this.listLT,
        [FormField.phuongtien]: this.listPT,
        [FormField.thoigiandi]: ngayKh,
      });
    }

    this.tourservice.search(this.form.value).subscribe((res) => {
      if (res == null) {
        console.log("Không có Tour liên quan");
      } else {
        this.tours = [];
        this.tours = res;
        console.log("Tour:");
        console.log(this.tours);
      }
    });
    this.form.reset();
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
    this.listAT = String(str1);
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
    this.listLT = String(str1);
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
    this.listPT = String(str1);
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get("id");
    });
    this.getNewTours(this.id);
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
  ngay: any;
  getNewTours(id: any) {
    this.tours = [];
    this.tourservice.getToursByIdDD(id).subscribe((response) => {
      for (let tour of response) {
        if (tour.nhungNgayKhoiHanh.length >= 1) {
          this.tours.push(tour);
        }
      }
      console.log(this.tours);
    });
  }
  findDateDisplay(id: number) {
    var nkhs = this.tours.find((item: any) => item.id == id)?.nhungNgayKhoiHanh;
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();

    for (let n of nkhs) {
      if (n.ngayKh > today) {
        this.ngay = n.ngayKh;
        break;
      }
    }
    return this.pipe.transform(this.ngay, "dd/MM/yyyy");
  }
  findPriceDisplay(id: number) {
    var nkhs = this.tours.find((item: any) => item.id == id)?.nhungNgayKhoiHanh;
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
    var nkhs = this.tours.find((item: any) => item.id == id)?.nhungNgayKhoiHanh;
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
    this.diadiemService.getDiaDiem().subscribe((response) => {
      this.diadiems = response.listDiaDiem;
    });
  }
  findDDById(id: number) {
    return this.diadiems.find((item: any) => item.id == id)?.tendiadiem;
  }
  viewDetail(id: number) {
    this.routes.navigate(["/tour/detail/" + id]);
  }
  //format currency
  formatCurrency(money: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
  datNgay(id: any) {
    this.routes.navigate(["../booking/" + this.id + "/" + id]);
  }
}
