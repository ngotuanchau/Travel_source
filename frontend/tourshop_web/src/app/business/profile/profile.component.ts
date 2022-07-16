import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgToastService } from "ng-angular-popup";
import { HttpClient } from "@angular/common/http";
import { DoanhNghiepsService } from "../../service/doanhnghieps.service";
import { PhanvungsService } from "../../service/phanvungs.service";
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
    private doanhNghiepService: DoanhNghiepsService,
    private toast: NgToastService,
    private phanVungService: PhanvungsService
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
    this.getPhanVung();
  }
  getUser() {
    this.doanhNghiepService.getDoanhNghiep(this.idUser).subscribe((res) => {
      if (res != null) {
        this.user = res;
        this.form = new FormGroup({
          tencongty: new FormControl(res.tencongty, [Validators.required]),
          email: new FormControl(res.email, [
            Validators.required,
            Validators.email,
          ]),
          sdt: new FormControl(res.sdt, [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]),
          khuVuc: new FormControl(res.khuVuc),
          vanPhong: new FormControl(res.vanPhong),
          mst: new FormControl(res.mst),
          theNganHang: new FormControl(res.theNganHang),
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
      if (this.form.value.tencongty == "") {
        this.form.value.tencongty = this.user.tencongty;
      }
      if (this.form.value.theNganHang == "") {
        this.form.value.theNganHang = this.user.theNganHang;
      }
      if (this.form.value.sdt == "") {
        this.form.value.sdt = this.user.sdt;
      }
      if (this.form.value.mst == "") {
        this.form.value.mst = this.user.mst;
      }
      this.doanhNghiepService
        .update_doanhNghiep(this.idUser, this.form.value)
        .subscribe((res) => {
          this.getUser();
          this.toast.success({
            detail: "Thông báo",
            summary: "Cập nhật thông tin thành công",
            duration: 3000,
          });
        });
      this.disable = true;
      this.text = "Cập nhật";
    }
  }
  phanvungs: any;
  getPhanVung() {
    this.phanvungs = [];
    this.phanVungService.getPhanVung().subscribe((res) => {
      this.phanvungs = res.listPhanVung;
    });
  }
  change_pass() {
    this.doanhNghiepService
      .change_pass(this.form_pass.value, this.idUser)
      .subscribe(
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
}
