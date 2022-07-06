import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToursService } from "../../../service/tours.service";
import { DatePipe } from "@angular/common";
@Component({
  selector: "app-dat-tour",
  templateUrl: "./dat-tour.component.html",
  styleUrls: ["./dat-tour.component.scss"],
})
export class DatTourComponent implements OnInit {
  pipe = new DatePipe("en-US");
  id: any;
  ngay: any;
  tour: any;
  hinhanh: any;
  ngayKHs: any;
  ngaykh: any;
  veDaDat: number;
  veTrong: number;
  constructor(
    private routes: Router,
    private tourService: ToursService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get("id");
      this.ngay = params.get("id2");
    });
    this.getDetail(this.id);
    this.veTrong = this.findBlank(this.ngay);
  }
  //Get detail
  getDetail(id: any) {
    this.tourService.getDetailTour(id).subscribe((res) => {
      this.tour = res;

      //Get array nkh
      this.ngayKHs = this.tour.nhungNgayKhoiHanh;
      // //get array lichtrinh
      // this.lichtrinh = this.tour.lichtrinh;
      // //get array diadiem
      // this.diadiem = this.tour.nhungdiadiem;
      //get array image detail
      this.hinhanh = this.tour.hinhanh;
      console.log("Tour");
    });
  }

  findDateDisplay(id: number) {
    return this.pipe.transform(
      this.ngayKHs.find((item: any) => item.id == id)?.ngayKh,
      "dd/MM/yyyy"
    );
  }
  findBlank(id: number): number {
    var blank = 0;
    blank = this.ngayKHs.find((item: any) => item.id == id)?.vedadat;
    return this.minus(this.tour.veToiDa, blank);
  }

  minus(a: number, b: number) {
    return a - b;
  }
}
