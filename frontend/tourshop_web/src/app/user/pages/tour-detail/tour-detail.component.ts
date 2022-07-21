import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToursService } from "../../../service/tours.service";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { DoanhNghiepsService } from "../../../service/doanhnghieps.service";
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
    private doanhNghiepService: DoanhNghiepsService
  ) {}
  pipe = new DatePipe("en-US");
  id: any;
  tour: any;
  ngay: any;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get("id");
    });
    this.getDetail(this.id);
    ///
  }
  datNgay() {
    this.routes.navigate(["../booking/" + this.id + "/" + this.ngay]);
  }

  ngayKHs: any;
  lichtrinh: any;
  diadiem: any;
  hinhanh: any;
  amthuc: any;
  phuongtien: any;
  luutru: any;
  message: string;
  idCongTy: any;
  congty: any;
  getCongTy(id: any) {
    this.doanhNghiepService.getDoanhNghiep(id).subscribe((res) => {
      this.congty = res;
    });
  }
  //Get detail
  getDetail(id: any) {
    this.tourService.getDetailTour(id).subscribe((res) => {
      this.tour = res;
      //get id cong ty
      this.idCongTy = this.tour.congty;
      this.getCongTy(this.idCongTy);
      //Get array nkh
      this.ngayKHs = this.tour.nhungNgayKhoiHanh;
      //get array lichtrinh
      this.lichtrinh = this.tour.lichtrinh;
      //get array diadiem
      this.diadiem = this.tour.nhungdiadiem;
      //get array image detail
      this.hinhanh = this.tour.hinhanh;
      //get dich vu
      this.amthuc = this.tour.amThuc;
      this.luutru = this.tour.luuTru;
      this.phuongtien = this.tour.phuongtien;
      const today = new Date().toLocaleDateString();
      for (let n of this.ngayKHs) {
        const today = new Date();
        const thisDay = new Date(n.ngayKh);
        if (this.findBlank(n.id) > 0) {
          if (thisDay.getFullYear() >= today.getFullYear()) {
            if (thisDay.getMonth() >= today.getMonth()) {
              if (
                (thisDay.getDate() >= today.getDate() &&
                  thisDay.getMonth() == today.getMonth()) ||
                thisDay.getMonth() > today.getMonth()
              ) {
                this.ngay = n.id;
                break;
              } else {
                this.message = "Đã qua thời gian mở tour";
              }
            } else {
              this.message = "Đã qua thời gian mở tour";
            }
          } else {
            this.message = "Đã qua thời gian mở tour";
          }
        } else {
          this.message = "Vé đã bán hết";
        }
      }
    });
  }
  findDateDisplay(id: any) {
    return this.ngayKHs.find((item: any) => item.id == id)?.ngayKh;
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
