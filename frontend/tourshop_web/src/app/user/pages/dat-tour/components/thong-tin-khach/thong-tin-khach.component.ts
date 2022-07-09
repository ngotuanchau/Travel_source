import { Component, Input, OnInit } from "@angular/core";
import { NguoiDungsService } from "../../../../../service/nguoidungs.service";
import { DatePipe } from "@angular/common";

import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-thong-tin-khach",
  templateUrl: "./thong-tin-khach.component.html",
  styleUrls: ["./thong-tin-khach.component.scss"],
})
export class ThongTinKhachComponent implements OnInit {
  @Input() tour: any;
  @Input() ngaykh: any;
  @Input() vetrong: number;
  @Input() ngayKHs: any;

  nglon: number = 1;
  trem: number = 0;
  trnho: number = 0;
  maxVe: number;
  user: any;
  idUser: any;
  ngaySinh: any;
  pipe = new DatePipe("en-US");

  constructor(
    private userService: NguoiDungsService,

    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUser = localStorage.getItem("id");
    this.getUser();
    this.ngaySinh = this.user.ngaySinh;
  }
  getUser() {
    // (this.email = localStorage.getItem("email")),
    // (this.hoten = localStorage.getItem("hoTen")),
    // (this.sdt = localStorage.getItem("sdt"));
    this.userService.getUser(this.idUser).subscribe((res) => {
      if (res != null) {
        this.user = res;
      }
      console.log(this.user);
    });
  }
  congnl() {
    this.nglon = this.nglon + 1;
    this.updateTongKhach();
  }
  trunl() {
    this.nglon = this.nglon - 1;
    this.updateTongKhach();
  }
  congte() {
    this.trem = this.trem + 1;
    this.updateTongKhach();
  }
  trute() {
    this.trem = this.trem - 1;
    this.updateTongKhach();
  }
  congtn() {
    this.trnho = this.trnho + 1;
    this.updateTongKhach();
  }
  trutn() {
    this.trnho = this.trnho - 1;
    this.updateTongKhach();
  }
  tongKhach() {
    return this.nglon + this.trem + this.trnho;
  }
  updateTongKhach() {
    this.maxVe = this.vetrong - this.tongKhach();
  }
}
