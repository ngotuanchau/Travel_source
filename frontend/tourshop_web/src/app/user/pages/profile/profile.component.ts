import { Component, OnInit } from "@angular/core";

import { NguoiDungsService } from "../../../service/nguoidungs.service";
import { DatePipe } from "@angular/common";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgToastService } from "ng-angular-popup";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  idUser: any;
  user: any;
  disable: boolean = true;
  text: string;
  form: FormGroup;
  form_pass: FormGroup;
  pipe = new DatePipe("en-US");

  constructor(
    private userService: NguoiDungsService,
    private toast: NgToastService
  ) {
    this.form_pass = new FormGroup({
      passwordold: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordnew: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {
    this.disable = true;
    this.idUser = localStorage.getItem("id");
    this.getUser();
    this.text = "cập nhật";
  }
  getUser() {
    this.userService.getUser(this.idUser).subscribe((res) => {
      if (res != null) {
        this.user = res;
        this.form = new FormGroup({
          tenNguoiDung: new FormControl(res["tenNguoiDung"]),
          hoTen: new FormControl(res["hoTen"]),
          cmnd: new FormControl(res["cmnd"]),
          sdt: new FormControl(res["sdt"]),
          ngaySinh: new FormControl(res["ngaySinh"]),
        });
      }
      this.disable = true;
    });
  }
  formatCurrency(money: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  change() {
    if (this.disable) {
      this.disable = false;
      this.text = "Xác nhận";
    } else {
      //Get image from field
      if (this.form.value.avt != null) {
        //Save image to local
      }
      if (this.form.value.tenNguoiDung == "") {
        this.form.value.tenNguoiDung = this.user.tenNguoiDung;
      }
      if (this.form.value.hoTen == "") {
        this.form.value.hoTen = this.user.hoTen;
      }
      if (this.ngay(this.form.value.ngaySinh)) {
        this.userService
          .updateUser(this.idUser, this.form.value)
          .subscribe((res) => {
            this.getUser();
            this.toast.success({
              detail: "Thông báo",
              summary: "Cập nhật thông tin thành công",
              duration: 3000,
            });
          });
        this.text = "Cập nhật";
      } else {
        this.toast.error({
          detail: "Cảnh báo",
          summary:
            this.pipe.transform(this.form.value.ngaySinh, "dd/MM/yyyy") +
            " không hợp lệ",
          duration: 3000,
        });
      }
    }
  }
  change_pass() {
    this.userService.change_pass(this.idUser, this.form_pass.value).subscribe(
      (res) => {
        this.toast.success({
          detail: "Thông báo",
          summary: "Đổi mật khẩu thành công",
          duration: 3000,
        });
        this.form_pass.reset();
      },
      (err) => {
        this.toast.error({
          detail: "Thông báo",
          summary: "Mật khẩu không không chính xác",
          duration: 3000,
        });
      }
    );
  }
  ngay(ngay: Date): boolean {
    const today = new Date();
    const thisDay = new Date(ngay);
    var giaTri: boolean = false;
    if (thisDay.getFullYear() <= today.getFullYear()) {
      if (
        (thisDay.getMonth() < today.getMonth() &&
          thisDay.getFullYear() == today.getFullYear()) || //tháng<tháng hiện tại và năm =năm ht
        thisDay.getFullYear() < today.getFullYear() || //năm nhỏ hơn năm hiện tại
        (thisDay.getDate() <= today.getDate() &&
          thisDay.getMonth() == today.getMonth() &&
          thisDay.getFullYear() == today.getFullYear()) //năm=năm hiện tại và tháng = tháng hiện tại và ngày <ngày hiện tại
      ) {
        giaTri = true;
      } else {
        giaTri = false;
      }
    } else {
      giaTri = false;
    }
    return giaTri;
  }
}
