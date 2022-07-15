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
  //Get status name by id
  getStatus(id: number) {
    return this.hoadonStatus.find((item: any) => item.id == id)?.name;
  }

  //Nav
  currentJustify = "start";

  active = 1;
  activev = "top";

  activeKeep = 1;

  activeSelected = 1;
  disabled = true;

  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;
  activeDynamic = 1;

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.activeSelected = 1;
    }
  }

  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter((id) => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.tabs.push(this.counter++);
    event.preventDefault();
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
}
