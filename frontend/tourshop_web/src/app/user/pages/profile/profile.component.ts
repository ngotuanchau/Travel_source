import { Component, OnInit } from "@angular/core";

import { NguoiDungsService } from "../../../service/nguoidungs.service";
import { DatePipe } from "@angular/common";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  idUser: any;
  user: any;
  constructor(private userService: NguoiDungsService) {}

  ngOnInit(): void {
    this.idUser = localStorage.getItem("id");
    this.getUser();
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
}
