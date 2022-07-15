import { Component, OnInit } from "@angular/core";
import { ToursService } from "../../../../service/tours.service";
import { TheloaisService } from "../../../../service/theloais.service";
import { DLAT, DuLichAnToan } from "./du-lich-an-toan-data";

@Component({
  selector: "app-du-lich-an-toan",
  templateUrl: "./du-lich-an-toan.component.html",
  styleUrls: ["./du-lich-an-toan.component.scss"],
})
export class DuLichAnToanComponent implements OnInit {
  title = "Du lịch an toàn";
  subTitle = "Điểm đến thú vị, vui chơi thỏa thích";
  dlats: DLAT[];
  constructor(
    private theLoaiService: TheloaisService,
    private tourService: ToursService
  ) {}
  theLoai: any;
  tour: any;
  getTheLoai() {
    this.theLoai = [];
    this.theLoaiService.getTheLoai().subscribe((res) => {
      this.theLoai = res.listTheLoai;
    });
  }
  ngOnInit(): void {
    this.dlats = DuLichAnToan;
    this.getTheLoai();
  }
  countTour(id: any) {
    this.tour = [];
    this.tourService.getToursByIdTL(id).subscribe((res) => {
      if (res != null) {
        this.tour = res;
      }
    });
    console.log(this.tour);
  }
}
