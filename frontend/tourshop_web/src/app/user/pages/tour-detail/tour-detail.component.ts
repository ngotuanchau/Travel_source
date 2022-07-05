import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToursService } from "../../../service/tours.service";
import { ActivatedRoute } from "@angular/router";
import { TheloaisService } from "../../../service/theloais.service";
import { DiadiemsService } from "../../../service/diadiems.service";
import { DatePipe } from "@angular/common";
@Component({
  selector: "app-tour-detail",
  templateUrl: "./tour-detail.component.html",
  styleUrls: ["./tour-detail.component.scss"],
})
export class TourDetailComponent implements OnInit {
  constructor(
    private routes: Router,
    private tourService: ToursService,
    private activatedRoute: ActivatedRoute,
    private theloaiService: TheloaisService,
    private diadiemService: DiadiemsService
  ) {}
  pipe = new DatePipe("en-US");
  id: any;
  tour: any;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get("id");
    });
    this.getDetail(this.id);
  }
  datNgay() {
    this.routes.navigate(["../booking"]);
  }
  ngayKHs: any;
  lichtrinh: any;
  diadiem: any;
  hinhanh: any;
  //Get detail
  getDetail(id: any) {
    this.tourService.getDetailTour(id).subscribe((res) => {
      this.tour = res;
      console.log("Tour");
      //Get array nkh
      this.ngayKHs = this.tour.nhungNgayKhoiHanh;
      //get array lichtrinh
      this.lichtrinh = this.tour.lichtrinh;
      //get array diadiem
      this.diadiem = this.tour.nhungdiadiem;
      //get array image detail
      this.hinhanh = this.tour.hinhanh;
    });
  }
  findDateDisplay(id: number) {
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();
    var ngay: any;
    for (let n of this.ngayKHs) {
      if (n.ngayKh > today) {
        ngay = n.ngayKh;
        break;
      }
    }
    return this.pipe.transform(ngay, "dd/MM/yyyy");
  }
}
