import { Component, Input, OnInit } from "@angular/core";
import { ToursService } from "../../../../../service/tours.service";
import { NguoiDungsService } from "../../../../../service/nguoidungs.service";
import { DatePipe } from "@angular/common";
import { Status, lstStatus } from "../../../hoadon-status";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "app-lich-su-dat-tour",
  templateUrl: "./lich-su-dat-tour.component.html",
  styleUrls: ["./lich-su-dat-tour.component.scss"],
})
export class LichSuDatTourComponent implements OnInit {
  @Input() id: any;
  lst_HD: any;
  pipe = new DatePipe("en-US");
  status: Status[];
  constructor(
    private userService: NguoiDungsService,
    private tourService: ToursService,
    private toast: NgToastService
  ) {
    this.status = lstStatus;
  }

  ngOnInit(): void {
    this.getHoaDon();
  }
  getHoaDon() {
    this.lst_HD = [];
    this.userService.getBillByUser(this.id).subscribe((res) => {
      this.lst_HD = res;
    });
  }
  findSttById(id: any) {
    let status: any;
    for (let stt of this.status) {
      if (stt.id == id) {
        status = stt;
      }
    }
    return status;
  }
  formatCurrency(money: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
  huyTour(id) {
    this.userService.huyTour(id).subscribe(
      (res) => {
        this.toast.success({
          detail: "Thông báo",
          summary: "Hủy tour thành công",
          duration: 3000,
        });
        this.getHoaDon();
      },
      (err) => {
        this.toast.error({
          detail: "Thông báo",
          summary: "Không thể hủy tour",
          duration: 3000,
        });
      }
    );
  }
  filterTourByStt(id: any) {
    let list: any;
    list = [];
    for (let hd of this.lst_HD) {
      if (hd.trangthaihoadon == id) {
        list.push(hd);
      }
    }
    return list;
  }
  filterTourCancelByStt() {
    let list: any;
    list = [];
    for (let hd of this.lst_HD) {
      if (
        hd.trangthaihoadon == 5 ||
        hd.trangthaihoadon == 6 ||
        hd.trangthaihoadon == 7 ||
        hd.trangthaihoadon == 8
      ) {
        list.push(hd);
      }
    }
    return list;
  }
}
