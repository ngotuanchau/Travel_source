import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { DiadiemsService } from "../../../../service/diadiems.service";
import { TheloaisService } from "../../../../service/theloais.service";
import { ToursService } from "../../../../service/tours.service";

@Component({
  selector: "app-newtours",
  templateUrl: "./newtours.component.html",
  styleUrls: ["./newtours.component.scss"],
})
export class NewtoursComponent implements OnInit {
  title = "Tour mới";
  subTitle = "Cuộc sống là một cuộc phiêu lưu đầy táo bạo hoặc không là gì cả";
  pipe = new DatePipe("en-US");
  constructor(
    private tourservice: ToursService,
    private theloaiService: TheloaisService,
    private diadiemService: DiadiemsService,
    private routes: Router
  ) {}
  ngay: any;
  ngOnInit(): void {
    this.getNewTours();
    this.getTheLoai();
    this.getAllDiaDiem();
  }

  newtours: any;
  tours: any;
  getNewTours() {
    this.newtours = [];
    this.tours = [];
    const size = 10;
    this.tourservice.getNewTours().subscribe((response) => {
      for (let tour of response) {
        if (tour.nhungNgayKhoiHanh.length >= 1) {
          this.tours.push(tour);
        }
      }
      this.newtours = this.tours.slice(0, size);
    });
  }
  // getTour() {
  //   const list = this.tours;
  //   const size = 10;
  //   for (let tour of this.newtours) {
  //     if (tour.nhungNgayKhoiHanh != null) {
  //       this.tours.push(tour);
  //     }
  //   }
  //   this.tours = list.slice(0, size);
  // }
  findDateDisplay(id: number) {
    var nkhs = this.newtours.find(
      (item: any) => item.id == id
    )?.nhungNgayKhoiHanh;
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();
    var ngay: any;
    for (let n of nkhs) {
      if (n.ngayKh > today) {
        ngay = n.ngayKh;
        break;
      }
    }
    return this.pipe.transform(ngay, "dd/MM/yyyy");
  }

  findPriceDisplay(id: number) {
    var nkhs = this.newtours.find(
      (item: any) => item.id == id
    )?.nhungNgayKhoiHanh;
    var vtd = this.newtours.find((item: any) => item.id == id)?.veToiDa;
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();
    var price: any;
    for (let n of nkhs) {
      if (n.ngayKh >= today && n.vedadat < vtd) {
        price = n.giaNguoiLon;
        break;
      } else if (n.ngayKh >= today && n.vedadat == vtd) {
        price = 100;
      }
    }
    return price;
  }
  findBlankDisplay(id: number, vetoida: number): number {
    var nkhs = this.newtours.find(
      (item: any) => item.id == id
    )?.nhungNgayKhoiHanh;
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();
    var blank = 0;
    for (let n of nkhs) {
      if (n.ngayKh > today) {
        blank = n.vedadat;
        break;
      }
    }
    return this.minus(vetoida, blank);
  }

  minus(a: number, b: number) {
    return a - b;
  }
  theloais: any;
  //Lay the loai
  getTheLoai() {
    this.theloaiService.getTheLoai().subscribe((response) => {
      this.theloais = response.listTheLoai;
    });
  }
  findTLById(id: number) {
    return this.theloais.find((item: any) => item.id == id)?.tenLoai;
  }
  diadiems: any;
  //Lay tat ca dia diem
  getAllDiaDiem() {
    this.diadiemService.getAllDiaDiem().subscribe((response) => {
      this.diadiems = response.listDiaDiem;
    });
  }
  findDDById(id: number) {
    return this.diadiems.find((item: any) => item.id == id)?.ten;
  }
  viewAllNewTours() {
    this.routes.navigate(["/newtours"]);
  }
  viewDetail(id: number) {
    this.routes.navigate(["/tour/detail/" + id]);
  }
  findDateId(id: number) {
    var nkhs = this.newtours.find(
      (item: any) => item.id == id
    )?.nhungNgayKhoiHanh;
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();
    var ngay: any;
    for (let n of nkhs) {
      if (n.ngayKh > today) {
        ngay = n.id;
        break;
      }
    }
    return ngay;
  }
  booking(id: any, ngay: any) {
    this.routes.navigate(["../booking/" + id + "/" + ngay]);
  }
  //format currency
  formatCurrency(money: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
}
