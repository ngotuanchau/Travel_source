import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgToastService } from "ng-angular-popup";
import { HttpClient } from "@angular/common/http";
import { DoanhNghiepsService } from "../../service/doanhnghieps.service";
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
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.disable = true;
    this.idUser = localStorage.getItem("id");
    // this.getUser();
    this.text = "cập nhật";
  }
  // getUser() {
  //   this.doanhNghiepService.u(this.idUser).subscribe((res) => {
  //     if (res != null) {
  //       this.user = res;
  //       this.form = new FormGroup({
  //         tenNguoiDung: new FormControl(res["tenNguoiDung"]),
  //         hoTen: new FormControl(res["hoTen"]),
  //         cmnd: new FormControl(res["cmnd"]),
  //         sdt: new FormControl(res["sdt"]),
  //         ngaySinh: new FormControl(res["ngaySinh"]),
  //       });
  //     }
  //     this.disable = true;
  //   });
  // }
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

      this.doanhNghiepService
        .update_doanhNghiep(this.idUser, this.form.value)
        .subscribe((res) => {
          // this.getUser();
          this.toast.success({
            detail: "Thông báo",
            summary: "Cập nhật thông tin thành công",
            duration: 3000,
          });
        });
      this.text = "Cập nhật";
    }
  }
}
