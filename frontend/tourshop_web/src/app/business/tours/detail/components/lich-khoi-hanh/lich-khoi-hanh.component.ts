import { Component, Input, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
@Component({
  selector: "app-lich-khoi-hanh",
  templateUrl: "./lich-khoi-hanh.component.html",
  styleUrls: ["./lich-khoi-hanh.component.scss"],
})
export class LichKhoiHanhComponent implements OnInit {
  @Input() tour: any;
  lichKH: any;
  pipe = new DatePipe("en-US");
  constructor() {}
  getLichKHByIdTour() {
    this.lichKH = this.tour.nhungNgayKhoiHanh;
    console.log(this.lichKH);
  }
  ngOnInit(): void {
    this.getLichKHByIdTour();
  }
}
