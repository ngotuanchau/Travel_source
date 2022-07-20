import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DiadiemsService } from "../../../../../service/diadiems.service";
import { TheloaisService } from "../../../../../service/theloais.service";
import { ToursService } from "../../../../../service/tours.service";

@Component({
  selector: "app-tour-lien-quan",
  templateUrl: "./tour-lien-quan.component.html",
  styleUrls: ["./tour-lien-quan.component.scss"],
})
export class TourLienQuanComponent implements OnInit {
  @Input() tour: any;
  id: any;
  pipe = new DatePipe("en-US");
  constructor(
    private tourservice: ToursService,
    private theloaiService: TheloaisService,
    private diadiemService: DiadiemsService,
    private routes: Router
  ) {}

  ngOnInit(): void {
    this.id = this.tour.diemDen;
    this.getNewTours(this.id);
  }
  newtours: any;
  tours: any;
  ngay: any;
  getNewTours(id: any) {
    this.tours = [];
    const size = 3;
    this.tourservice.getToursByIdDD(id).subscribe((response) => {
      for (let tour of response) {
        if (tour.nhungNgayKhoiHanh.length >= 1) {
          this.tours.push(tour);
        }
      }
      this.tours = this.tours.slice(0, size);
    });
  }
  theloais: any;
  //Lay the loai
  getTheLoai() {
    this.theloais = [];
    this.theloaiService.getTheLoai().subscribe((response) => {
      this.theloais = response.listTheLoai;
    });
  }
  findTLById(id: number) {
    let thloai: any;
    for (let tl of this.theloais) {
      if (tl.id == id) {
        thloai = tl.tenLoai;
      }
    }
    return thloai;
  }
  findDateDisplay(id: number) {
    var nkhs = this.tours.find((item: any) => item.id == id)?.nhungNgayKhoiHanh;
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();

    for (let n of nkhs) {
      if (n.ngayKh > today) {
        this.ngay = n.ngayKh;
        break;
      }
    }
    return this.pipe.transform(this.ngay, "dd/MM/yyyy");
  }

  findPriceDisplay(id: number) {
    var nkhs = this.tours.find((item: any) => item.id == id)?.nhungNgayKhoiHanh;
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
    var nkhs = this.tours.find((item: any) => item.id == id)?.nhungNgayKhoiHanh;
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

  diadiems: any;
  //Lay tat ca dia diem
  getAllDiaDiem() {
    this.diadiems = [];
    this.diadiemService.getDiaDiem().subscribe((response) => {
      this.diadiems = response.listDiaDiem;
    });
  }
  findDDById(id: number) {
    return this.diadiems.find((item: any) => item.id == id)?.tendiadiem;
  }
  viewDetail(id: number) {
    this.routes.navigate(["/tour/detail/" + id]);
  }
  //format currency
  formatCurrency(money: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
  findDateId(id: number) {
    let idNgay: any;
    var nkhs = this.tours.find((item: any) => item.id == id)?.nhungNgayKhoiHanh;
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();

    for (let n of nkhs) {
      if (n.ngayKh > today) {
        idNgay = n.id;
        break;
      }
    }
    return idNgay;
  }
  booking(id: any, ngay: any) {
    this.routes.navigate(["/booking/", id, ngay]);
  }
}
