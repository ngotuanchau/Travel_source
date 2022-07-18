import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PhanvungsService } from "../../../service/phanvungs.service";
import { FormField } from "../search";
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
import { forkJoin, Subscription, SubscriptionLike } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.scss"],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  lstAmThuc: AmThuc[];
  lstLuuTru: LuuTru[];
  lstPhuongTien: PhuongTien[];
  title = "Tour mới";
  subTitle = "Cuộc sống là một cuộc phiêu lưu đầy táo bạo hoặc không là gì cả";
  pipe = new DatePipe("en-US");
  lstTour: any;
  form: FormGroup;
  readonly FormField = FormField;
  constructor(
    private tourservice: ToursService,
    private theloaiService: TheloaisService,
    private diadiemService: DiadiemsService,
    private routes: Router,
    private phanvungService: PhanvungsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
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
  queryParamsSubscription: Subscription;

  onSearch() {
    let ngayKh = this.pipe.transform(this.ngayKh, "dd/MM/yyyy");

    this.form.patchValue({
      [FormField.amthuc]: this.listAT,
      [FormField.luutru]: this.listLT,
      [FormField.phuongtien]: this.listPT,
      [FormField.thoigiandi]: ngayKh,
    });

    let value = this.form.value;
    if (this.form.value.diemdi != null) {
      value[FormField.diemdi] = Number(this.form.value.diemdi).toString();
    }
    if (this.form.value.diemden != null) {
      value[FormField.diemden] = Number(this.form.value.diemden).toString();
    }
    if (this.form.value.khuvuc != null) {
      value[FormField.khuvuc] = Number(this.form.value.khuvuc).toString();
    }
    if (this.form.value.theloai != null) {
      value[FormField.theloai] = Number(this.form.value.theloai).toString();
    }
    console.log(value);
    this.tourservice.search(value).subscribe((res) => {
      if (res == null) {
        console.log("Không có Tour liên quan");
      } else {
        this.newtours = [];
        this.newtours = res;
      }
    });
  }

  onReset() {
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
    forkJoin([
      this.getNewTours(),
      this.getTheLoai(),
      this.getAllDiaDiem(),
      this.getPhanVung(),
    ]).subscribe((data) => {
      this.subTest();
    });
  }

  subTest() {
    this.queryParamsSubscription = this.route.queryParams.subscribe((query) => {
      const { theloai, diemdi, diemden, khuvuc } = query;
      let search = false;

      if (theloai) {
        this.form.controls[FormField.theloai].setValue(Number(theloai));
        search = true;
      }
      if (diemdi) {
        this.form.controls[FormField.diemdi].setValue(Number(diemdi));
        search = true;
      }
      if (diemden) {
        this.form.controls[FormField.diemden].setValue(Number(diemden));
        search = true;
      }
      if (khuvuc) {
        this.form.controls[FormField.khuvuc].setValue(Number(khuvuc));
        search = true;
      }
      if (search) {
        this.onSearch();
      }
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  newtours: any;
  tours: any;
  phanvungs: any;
  getPhanVung() {
    this.phanvungs = [];
    return this.phanvungService.getPhanVung().pipe(
      map((res) => {
        this.phanvungs = res.listPhanVung;
      })
    );
  }
  getNewTours() {
    this.newtours = [];
    this.tours = [];
    return this.tourservice.getNewTours().pipe(
      map((response) => {
        for (let tour of response) {
          if (tour.nhungNgayKhoiHanh.length >= 1) {
            this.tours.push(tour);
          }
        }
        this.newtours = this.tours;
      })
    );
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
    return this.theloaiService.getTheLoai().pipe(
      map((response) => {
        this.theloais = response.listTheLoai;
      })
    );
  }
  findTLById(id: number) {
    return this.theloais.find((item: any) => item.id == id)?.tenLoai;
  }
  diadiems: any;
  //Lay tat ca dia diem
  getAllDiaDiem() {
    return this.diadiemService.getAllDiaDiem().pipe(
      map((response) => {
        this.diadiems = response.listDiaDiem;
      })
    );
  }
  findDDById(id: number) {
    return this.diadiems.find((item: any) => item.id == id)?.tendiadiem;
  }
  viewDetail(id: number) {
    this.routes.navigate(["/tour/detail/" + id]);
  }

  formatCurrency(money: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
}
