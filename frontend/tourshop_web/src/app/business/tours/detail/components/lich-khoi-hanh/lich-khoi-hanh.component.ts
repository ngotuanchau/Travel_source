import { Component, Input, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Status, lstStatus } from "../../../tour-status";
import { ToursService } from "../../../../../service/tours.service";
@Component({
  selector: "app-lich-khoi-hanh",
  templateUrl: "./lich-khoi-hanh.component.html",
  styleUrls: ["./lich-khoi-hanh.component.scss"],
})
export class LichKhoiHanhComponent implements OnInit {
  @Input() idTour: number;
  id: any;
  tour: any;
  lichKH: any;
  pipe = new DatePipe("en-US");
  tourStatus: Status[];
  constructor(private tourService: ToursService) {}
  ngOnInit(): void {
    this.getLichKHByIdTour();
    this.tourStatus = lstStatus;
  }
  //Lấy lịch khởi hành
  getLichKHByIdTour() {
    this.id = this.idTour;
    this.tourService.getDetailTour(this.id).subscribe((res) => {
      this.lichKH = res.nhungNgayKhoiHanh;
      console.log("Những ngày khởi hành:");
      console.log(this.lichKH);
    });
  }

  //Get status name by id
  getStatus(id: number) {
    return this.tourStatus.find((item: any) => item.id == id)?.name;
  }
  getColor(id: number) {
    return this.tourStatus.find((item: any) => item.id == id)?.color;
  }
  //Prepare
  prepare(id: any) {
    this.tourService.prepare(id).subscribe((res) => {
      if (res.message == "Success") {
        this.getLichKHByIdTour();
      }
    });
  }
  //Start
  start(id: any) {
    this.tourService.start(id).subscribe((res) => {
      if (res.message == "Success") {
        this.getLichKHByIdTour();
      }
    });
  }
  //End
  end(id: any) {
    this.tourService.end(id).subscribe((res) => {
      if (res.message == "Success") {
        this.getLichKHByIdTour();
      }
    });
  }
  //Cancel
  cancel(id: any) {
    this.tourService.cancel(id).subscribe((res) => {
      if (res.message == "Success") {
        this.getLichKHByIdTour();
      }
    });
  }
  formatCurrency(money: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
}
