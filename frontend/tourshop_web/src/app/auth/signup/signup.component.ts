import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, NgForm, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { NguoiDung } from "../../models/nguoidung.model";
import { SignUpsService } from "../../service/signups.service";

import { NgToastService } from "ng-angular-popup";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  alert: boolean = false;
  danger: boolean = false;
  title = "Đăng ký";
  Date = new Date(Date.now());
  nguoiDung: NguoiDung = {
    tenNguoiDung: "",
    email: "",
    matKhau: "",
    cmnd: "",
    sdt: "",
    avt: "",
    hoTen: "",
    ngayTao: this.Date,
    ngaySua: this.Date,
    trangThai: 1,
    isAdmin: false,
    id: 0,
  };
  constructor(
    private signupService: SignUpsService,
    private routes: Router,
    private signUpForm: FormBuilder,
    private toast: NgToastService
  ) {}

  infoUser = this.signUpForm.group({
    tenNguoiDung: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    matKhau: ["", [Validators.required, Validators.minLength(6)]],
    cmnd: ["", Validators.required],
    sdt: ["", Validators.required],
    hoTen: ["", Validators.required],
  });
  get f() {
    return this.infoUser.controls;
  }
  ngOnInit(): void {}

  onSubmit() {
    this.signupService.signUpUser(this.nguoiDung).subscribe(
      (response) => {
        this.toast.success({
          detail: "Thông báo",
          summary: "Đăng ký Khách hàng thành công",
          duration: 3000,
        });
        this.nguoiDung = {
          tenNguoiDung: "",
          email: "",
          matKhau: "",
          cmnd: "",
          sdt: "",
          avt: "test.jpg",
          hoTen: "",
          ngayTao: this.Date,
          ngaySua: this.Date,
          trangThai: 0,
          isAdmin: false,
          id: 0,
        };
        this.routes.navigate(["/login"]);
      },
      (err) => {
        this.toast.error({
          detail: "Cảnh báo",
          summary: "Thông tin đăng ký không hợp lệ",
          duration: 3000,
        });
      }
    );
  }
  closeAlert() {
    this.alert = false;
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
