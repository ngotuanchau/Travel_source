import { Component, OnInit } from "@angular/core";
import { NgToastService } from "ng-angular-popup";
import { ActivatedRoute, Router } from "@angular/router";
import { PhanvungsService } from "../../../service/phanvungs.service";
import { DiadiemsService } from "../../../service/diadiems.service";
import { TheloaisService } from "../../../service/theloais.service";
import { DatePipe } from "@angular/common";
import { FormField } from "./model";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  AmThuc,
  lstAmThucs,
  lstLuuTrus,
  lstPhuongTiens,
  LuuTru,
  PhuongTien,
} from "../dichvu-data";
import { ToursService } from "../../../service/tours.service";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-tours-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class ToursEditComponent implements OnInit {
  form: FormGroup;
  idTour: any;
  tour: any;
  diadiems: any;
  phanvungs: any;
  theloais: any;
  lstAmThuc: AmThuc[];
  lstLuuTru: LuuTru[];
  lstPhuongTien: PhuongTien[];
  listAT: any;
  listLT: any;
  listPT: any;
  lstNKH: any;
  lichtrinh: any;
  diadiem: any;
  readonly FormField = FormField;
  constructor(
    private diadiemService: DiadiemsService,
    private phanvungService: PhanvungsService,
    private theloaiService: TheloaisService,
    private tourService: ToursService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {
    this.lstAmThuc = lstAmThucs;
    this.lstLuuTru = lstLuuTrus;
    this.lstPhuongTien = lstPhuongTiens;
    this.form = this.formBuilder.group({
      [FormField.tentour]: [""], //1
      [FormField.theloai]: [0], //2
      [FormField.soNgay]: [1], //3
      [FormField.soDem]: [0], //4
      [FormField.veToiDa]: [1, Validators.required], //5
      [FormField.veToiThieu]: [1, Validators.required], //6
      [FormField.diemDi]: [0], //7
      [FormField.diemDen]: [0], //8
      [FormField.nhungdiadiem]: [[]], //9
      [FormField.phanvung]: [0], //11
      [FormField.mota]: [""], //12
      [FormField.amThuc]: [""], //13
      [FormField.luuTru]: [""], //14
      [FormField.phuongtien]: [""], //15
      [FormField.nhungNgayKhoiHanh]: [[]], //16
      [FormField.lichtrinh]: [[]], //17,
      [FormField.hinhanh]: [[]], //18
      [FormField.congty]: [null], //19
      [FormField.anhtour]: [""], //20
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idTour = params.get("id");
    });
    this.getAllDiaDiem();
    this.getPhanVung();
    this.getTheLoai();
    this.getTourDetail(this.idTour);
  }
  isControlError(field: FormField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some((type) => !!control?.errors?.[type]);
    }
    return false;
  }
  getAllDiaDiem() {
    this.diadiemService.getDiaDiem().subscribe((response) => {
      this.diadiems = response.listDiaDiem;
    });
  }
  //Lay phan vung
  getPhanVung() {
    this.phanvungService.getPhanVung().subscribe((response) => {
      this.phanvungs = response.listPhanVung;
    });
  }
  //Lay the loai
  getTheLoai() {
    this.theloaiService.getTheLoai().subscribe((response) => {
      this.theloais = response.listTheLoai;
    });
  }
  getTourDetail(id: any) {
    this.tourService.getDetailTour(id).subscribe((response) => {
      this.tour = response;
      //Get array nkh
      this.lstNKH = this.tour.nhungNgayKhoiHanh;
      //get array lichtrinh
      this.lichtrinh = this.tour.lichtrinh;
      //get array diadiem
      this.diadiem = this.tour.nhungdiadiem;
    });
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  //Dịch vụ
  convertToArray(string: string) {
    return string.split(",").map((item) => parseInt(item, 10));
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
    var str1 = ids.toString(); // Gives you "42,55"
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
    var str1 = ids.toString(); // Gives you "42,55"
    this.listPT = String(str1);
  }
  get songay() {
    return this.form?.controls?.[FormField.soNgay]?.value || 0;
  }

  set songay(data) {
    this.form.patchValue({
      [FormField.soNgay]: parseInt(data),
    });
  }
  get sodem() {
    return this.form?.controls?.[FormField.soDem]?.value || 0;
  }

  set sodem(data) {
    this.form.patchValue({
      [FormField.soDem]: parseInt(data),
    });
  }

  // //keyup
  getSoNgay(value: any) {
    this.songay = value;
  }
  getSoDem(value: any) {
    this.sodem = value;
  }
  parseInta(a: string) {
    return parseInt(a);
  }
  mota: any;
  onSubmit() {
    if (this.form.value.tentour == "") {
      this.form.value.tentour = this.tour.tentour; //1
    }
    if (this.form.value.nhungdiadiem == []) {
      this.form.value.nhungdiadiem = this.tour.nhungdiadiem; //2
    }
    if (this.form.value.nhungNgayKhoiHanh == []) {
      this.form.value.nhungNgayKhoiHanh = this.tour.nhungNgayKhoiHanh; //3
    }
    if (this.form.value.lichtrinh == []) {
      this.form.value.lichtrinh = this.tour.lichtrinh; //4
    }
    if (this.form.value.nhungdiadiem == []) {
      this.form.value.nhungdiadiem = this.tour.nhungdiadiem; //5
    }
    if (this.form.value.soNgay == 1) {
      this.form.value.soNgay = this.tour.soNgay; //6
    }
    if (this.form.value.soDem == 0) {
      this.form.value.soDem = this.tour.soDem; //7
    }
    if (this.form.value.diemDi == 0) {
      this.form.value.diemDi = this.tour.diemDi; //8
    }
    if (this.form.value.diemDen == 0) {
      this.form.value.diemDen = this.tour.diemDen; //9
    }
    if (this.form.value.phanvung == 0) {
      this.form.value.phanvung = this.tour.phanvung; //10
    }
    if (this.form.value.veToiDa == 0) {
      this.form.value.veToiDa = this.tour.veToiDa; //11
    }
    if (this.form.value.veToiThieu == 1) {
      this.form.value.veToiThieu = this.tour.veToiThieu; //12
    }
    if (this.form.value.amThuc == "") {
      this.form.value.amThuc = this.tour.amThuc; //13
    }
    if (this.form.value.luuTru == "") {
      this.form.value.luuTru = this.tour.luuTru; //14
    }
    if (this.form.value.phuongtien == "") {
      this.form.value.phuongtien = this.tour.phuongtien; //15
    }
    if (this.form.value.anhtour == "") {
      this.form.value.anhtour = this.tour.anhtour; //16
    }
    if (this.form.value.hinhanh == []) {
      this.form.value.hinhanh = this.tour.hinhanh; //17
    }
    if (this.form.value.congty == null) {
      this.form.value.congty = this.tour.congty; //18
    }
    if (this.form.value.theloai == 0) {
      this.form.value.theloai = this.tour.theloai; //19
    }
    if (this.form.value.mota == "") {
      this.form.value.mota = this.tour.mota; //20
    }
    this.tourService.update(this.tour.id, this.form.value).subscribe(
      (res) => {
        this.toast.success({
          detail: "Thông báo",
          summary: "Cập nhật thông tin Tour thành công",
          duration: 3000,
        });
        this.route.navigate(["/ql-tours/detail/", this.tour.id]);
      },
      (err) => {
        this.toast.error({
          detail: "Thông báo",
          summary: "Không thể cập nhật",
          duration: 3000,
        });
      }
    );
  }
}
