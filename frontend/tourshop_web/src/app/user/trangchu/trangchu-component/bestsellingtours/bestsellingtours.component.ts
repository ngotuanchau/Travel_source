import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { DiadiemsService } from "../../../../service/diadiems.service";
import { TheloaisService } from "../../../../service/theloais.service";
import { ToursService } from "../../../../service/tours.service";
@Component({
  selector: "app-bestsellingtours",
  templateUrl: "./bestsellingtours.component.html",
  styleUrls: ["./bestsellingtours.component.scss"],
})
export class BestsellingtoursComponent implements OnInit {
  title = "Tour đang hot";
  subTitle = "Cuộc sống là một cuộc phiêu lưu đầy táo bạo hoặc không là gì cả";
  pipe = new DatePipe("en-US");
  constructor(
    private tourservice: ToursService,
    private theloaiService: TheloaisService,
    private diadiemService: DiadiemsService,
    private routes: Router
  ) {}

  ngOnInit(): void {
    this.getNewTours();
    this.getTheLoai();
    this.getAllDiaDiem();
  }

  newtours: any;
  getNewTours() {
    const size = 10;
    this.tourservice.getNewTours().subscribe((response) => {
      this.newtours = response.slice(0, size);
    });
    // this.tourservice.getNewTours().subscribe((response) => {
    //   this.newtours = response;
    // });
  }

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
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();
    var price: any;
    for (let n of nkhs) {
      if (n.ngayKh > today) {
        price = n.giaNguoiLon;
        break;
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
  formatCurrency(money: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
}
