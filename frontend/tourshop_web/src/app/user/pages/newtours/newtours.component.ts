import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { DiadiemsService } from "../../../service/diadiems.service";
import { TheloaisService } from "../../../service/theloais.service";
import { ToursService } from "../../../service/tours.service";

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
    private diadiemService: DiadiemsService
  ) {}

  ngOnInit(): void {
    this.getNewTours();
    this.getTheLoai();
    this.getAllDiaDiem();
  }

  newtours: any;
  getNewTours() {
    this.tourservice.getNewTours().subscribe((response) => {
      this.newtours = response;
    });
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
}
