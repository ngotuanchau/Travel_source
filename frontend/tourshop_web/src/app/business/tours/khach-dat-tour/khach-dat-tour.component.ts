import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToursService } from "../../../service/tours.service";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { Status, lstStatus } from "../hoadon-status";

@Component({
  selector: "app-khach-dat-tour",
  templateUrl: "./khach-dat-tour.component.html",
  styleUrls: ["./khach-dat-tour.component.scss"],
})
export class KhachDatTourComponent implements OnInit {
  idTG: any;
  id: any;
  users: any;
  users1: any;
  users2: any;
  hoadonStatus: Status[];
  constructor(
    private tourservice: ToursService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserByIdNHK();
    this.hoadonStatus = lstStatus;
  }
  //Lấy danh sách Khách hàng Đặt Tour
  getUserByIdNHK() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idTG = params.get("id");
      this.id = params.get("id2");
    });
    this.tourservice.getUserByIdTour(this.id).subscribe((response) => {
      this.users = response;
    });
  }
  //Xác nhận
  confirmBookTour(id: any) {
    this.tourservice.confirmBookTour(id).subscribe((res) => {
      if (res.message == "Success") {
        this.getUserByIdNHK();
      }
    });
  }
  //Thanh toán
  confirmThanhToan(id: any) {
    this.tourservice.confirmThanhToan(id).subscribe((res) => {
      if (res.message == "Success") {
        this.getUserByIdNHK();
      }
    });
  }
  //Hoàn thành thanh toán
  cofirmHTThanhToan(id: any) {
    this.tourservice.confirmKTThanhToan(id).subscribe((res) => {
      if (res.message == "Success") {
        this.getUserByIdNHK();
      }
    });
  }
  //Xác nhận đã hoàn tiền
  cofirmHoanTien(id: any) {
    this.tourservice.confirmRefund(id).subscribe((res) => {
      if (res.message == "Success") {
        this.getUserByIdNHK();
      }
    });
  }

  //Huy
  huy(id: any) {}
  //Get status name by id
  getStatus(id: number) {
    return this.hoadonStatus.find((item: any) => item.id == id)?.name;
  }

  formatCurrency(money: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
  getColor(id: number) {
    return this.hoadonStatus.find((item: any) => item.id == id)?.color;
  }
  filterHDByStatus(id: any) {
    let list: any;
    list = [];
    for (let hd of this.users) {
      if (hd.trangThai == id) {
        list.push(hd);
      }
    }
    return list;
  }
  filterTourCancelByStt() {
    let list: any;
    list = [];
    for (let hd of this.users) {
      if (
        hd.trangthaihoadon == 5 ||
        hd.trangthaihoadon == 6 ||
        hd.trangthaihoadon == 7 ||
        hd.trangthaihoadon == 8 ||
        hd.trangthaihoadon == 9 ||
        hd.trangthaihoadon == 10 ||
        hd.trangthaihoadon == 11
      ) {
        list.push(hd);
      }
    }
    return list;
  }
}
