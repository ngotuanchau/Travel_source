import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PhanvungsService } from "../../../service/phanvungs.service";
import { CongTy } from "../../../models/congty.model";
import { SignUpsService } from "../../../service/signups.service";

@Component({
  selector: "app-signup-business",
  templateUrl: "./signup-business.component.html",
  styleUrls: ["./signup-business.component.scss"],
})
export class SignupBusinessComponent implements OnInit {
  Date = new Date(Date.now());
  constructor(
    private signupService: SignUpsService,
    private routes: Router,
    private signUpForm_bus: FormBuilder,
    private phanvungService: PhanvungsService
  ) {}
  isSuccess = false;
  phanvungs: any;
  ngOnInit(): void {
    this.getPhanVung();
  }
  //Business
  congTy: CongTy = {
    id: 0,
    tenCongTy: "",
    email: "",
    matKhau: "",
    sdt: "",
    khuVuc: "",
    vanPhong: "",
    mst: "",
    theNganHang: "",
    ngayTao: this.Date,
    ngaySua: this.Date,
    trangThai: 1,
  };

  infoBusiness = this.signUpForm_bus.group({
    tenCongTy: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    matKhau: ["", [Validators.required, Validators.minLength(6)]],
    khuVuc: ["", Validators.required],
    vanPhong: ["", Validators.required],
    sdt: ["", Validators.required],
  });
  get b() {
    return this.infoBusiness.controls;
  }

  onSubmit_bus() {
    this.signupService.signUpBusiness(this.congTy).subscribe((response) => {
      this.congTy = {
        id: 0,
        tenCongTy: "",
        email: "",
        matKhau: "",
        sdt: "",
        khuVuc: "",
        vanPhong: "",
        mst: "",
        theNganHang: "",
        ngayTao: this.Date,
        ngaySua: this.Date,
        trangThai: 1,
      };
    });
    this.isSuccess = true;
    this.routes.navigate(["/login"]);
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  //Lay phan vung
  getPhanVung() {
    this.phanvungService.getPhanVung().subscribe((response) => {
      this.phanvungs = response.listPhanVung;
    });
  }
  closeAlert() {
    this.isSuccess = false;
  }
}
