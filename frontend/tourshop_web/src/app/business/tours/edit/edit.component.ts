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
      [FormField.tentour]: [null, Validators.required], //1
      [FormField.theloai]: [1, Validators.required], //2
      [FormField.soNgay]: [1, Validators.required], //3
      [FormField.soDem]: [0, Validators.required], //4
      [FormField.veToiDa]: [1, Validators.required], //5
      [FormField.veToiThieu]: [1, [Validators.required]], //6
      [FormField.diemDi]: [1, Validators.required], //7
      [FormField.diemDen]: [1, Validators.required], //8
      [FormField.nhungdiadiem]: [[], Validators.required], //9
      [FormField.phanvung]: [1, Validators.required], //11
      [FormField.mota]: [null], //12
      [FormField.amThuc]: ["", Validators.required], //13
      [FormField.luuTru]: ["", Validators.required], //14
      [FormField.phuongtien]: ["", Validators.required], //15
      [FormField.nhungNgayKhoiHanh]: [[], Validators.required], //16
      [FormField.lichtrinh]: [[]], //17,
      [FormField.hinhanh]: [[]], //18
      [FormField.congty]: [null, Validators.required], //19
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
  onSubmit() {
    console.log(this.form.value);
  }
}
