import { Component, OnInit } from "@angular/core";

import { NguoiDungsService } from "../../../service/nguoidungs.service";
import { DatePipe } from "@angular/common";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup } from "@angular/forms";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  idUser: any;
  user: any;
  disable: boolean;
  text: string;
  form: FormGroup;
  constructor(private userService: NguoiDungsService) {}

  ngOnInit(): void {
    this.idUser = localStorage.getItem("id");
    this.getUser();
    this.disable = true;
    this.text = "cập nhật";
  }
  getUser() {
    this.userService.getUser(this.idUser).subscribe((res) => {
      if (res != null) {
        this.user = res;
      }
      console.log(this.user);
    });
  }
  updateProfile() {}
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
    }
  }
  cancel() {
    this.form.reset();
  }
}
