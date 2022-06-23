import { Component, OnInit, ViewChild } from "@angular/core";
import { PhanvungsService } from "../../../service/phanvungs.service";
import { DiadiemsService } from "../../../service/diadiems.service";
import { TheloaisService } from "../../../service/theloais.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToursService } from "../../../service/tours.service";
import { FormField } from "./components/model";
import { LichTrinhComponent } from "./components/lich-trinh/lich-trinh.component";
@Component({
  selector: "app-tours-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class ToursCreateComponent {
  diadiems: any;
  phanvungs: any;
  theloais: any;
  Date = new Date(Date.now());
  form: FormGroup;
  readonly FormField = FormField;
  constructor(
    private diadiemService: DiadiemsService,
    private phanvungService: PhanvungsService,
    private theloaiService: TheloaisService,
    private tourService: ToursService,
    private formBuilder: FormBuilder
  ) {
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
      [FormField.lichtrinh]: [[], Validators.required], //17,
      [FormField.anhTour]: [null, Validators.required], //18
      [FormField.congty]: [null, Validators.required], //19
    });
  }

  ngOnInit(): void {
    this.getAllDiaDiem();
    this.getPhanVung();
    this.getTheLoai();
    // this.form.patchValue({
    //   [FormField.soNgay]: this.idCty,
    // });
    this.getId();
    console.log("Đây là id: " + this.idCty);
  }

  isControlError(field: FormField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some((type) => !!control?.errors?.[type]);
    }
    return false;
  }

  //Tao tour
  onSubmit() {
    const value = this.form.value;
    this.tourService.createTour(value).subscribe((response) => {
      console.log("Tao tour thanh cong");
    });
  }

  //Lay tat ca dia diem
  getAllDiaDiem() {
    this.diadiemService.getAllDiaDiem().subscribe((response) => {
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
  getId() {
    const id = this.idCty;
    this.form.patchValue({ [FormField.congty]: id });
    console.log(id);
  }
  get idCty() {
    return localStorage.getItem("id");
  }
  // set idCty(data) {
  //   this.form.patchValue({
  //     [FormField.congty]: data,
  //   });
  // }

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

  // get vetoida() {
  //   return this.form?.controls?.[FormField.veToiDa]?.value || 0;
  // }

  // set vetoida(data) {
  //   this.form.patchValue({
  //     [this.FormField.veToiDa]: parseInt(data),
  //   });
  // }
  // get vetoithieu() {
  //   return this.form?.controls?.[FormField.veToiThieu]?.value || 0;
  // }

  // set vetoithieu(data) {
  //   this.form.patchValue({
  //     [FormField.veToiThieu]: parseInt(data),
  //   });
  // }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  N: number = 1;
  D: number = 0;

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
}
