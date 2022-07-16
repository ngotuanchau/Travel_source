import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NguoiDungsService } from "../../../../service/nguoidungs.service";
import { NgToastService } from "ng-angular-popup";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-nguoidungs-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class NguoiDungsEditComponent implements OnInit {
  public isCollapsed = false;
  idUser: any;
  user: any;
  disable: boolean;
  text: string;
  form: FormGroup;
  pipe = new DatePipe("en-US");
  collapsed = true;
  status: number;
  admin: boolean;
  constructor(
    private userService: NguoiDungsService,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.disable = true;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idUser = params.get("id");
    });
    this.getUser();
  }
  // isStatus() {
  //   if (this.status == 1) {
  //     this.status = 0;
  //   } else {
  //     this.status = 1;
  //   }
  //   console.log("status");
  //   console.log(this.status);
  // }
  isAdmin() {
    if (this.admin == true) {
      this.admin = false;
    } else {
      this.admin = true;
    }
    console.log("admin");
    console.log(this.admin);
  }
  getUser() {
    let status: boolean;
    this.userService.getUser(this.idUser).subscribe((res) => {
      if (res != null) {
        this.user = res;
        this.status = res.trangThai;
        this.isAdmin = res.isAdmin;
        this.form = new FormGroup({
          tenNguoiDung: new FormControl(res["tenNguoiDung"]),
          hoTen: new FormControl(res["hoTen"]),
          cmnd: new FormControl(res["cmnd"]),
          sdt: new FormControl(res["sdt"]),
          ngaySinh: new FormControl(res["ngaySinh"]),
          // trangThai: new FormControl(res["trangThai"]),
          // isAdmin: new FormControl(res["isAdmin"]),
        });
      }
    });
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  change() {
    if (this.form.value.tenNguoiDung == "") {
      this.form.value.tenNguoiDung = this.user.tenNguoiDung;
    }
    if (this.form.value.hoTen == "") {
      this.form.value.hoTen = this.user.hoTen;
    }
    if (this.form.value.sdt == "") {
      this.form.value.sdt = this.user.sdt;
    }
    if (this.form.value.cmnd == "") {
      this.form.value.cmnd = this.user.cmnd;
    }
    if (this.form.value.ngaySinh == null) {
      this.form.value.ngaySinh = this.user.ngaySinh;
    } else {
      if (this.ngay(this.form.value.ngaySinh)) {
        this.userService.updateUser(this.idUser, this.form.value).subscribe(
          (res) => {
            this.getUser();
            this.toast.success({
              detail: "Thông báo",
              summary: "Cập nhật thông tin thành công",
              duration: 3000,
            });
          },
          (err) => {
            this.toast.error({
              detail: "Cảnh báo",
              summary: "Thông tin không hợp lệ",
              duration: 3000,
            });
          }
        );
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
  ngay(ngay: Date): boolean {
    const today = new Date();
    const thisDay = new Date(ngay);
    var giaTri: boolean = false;
    if (thisDay.getFullYear() <= today.getFullYear()) {
      if (thisDay.getMonth() <= today.getMonth()) {
        if (
          (thisDay.getDate() <= today.getDate() &&
            thisDay.getMonth() == today.getMonth()) ||
          thisDay.getMonth() < today.getMonth()
        ) {
          giaTri = true;
        } else {
          giaTri = false;
        }
      } else {
        giaTri = false;
      }
    } else {
      giaTri = false;
    }
    return giaTri;
  }
}
