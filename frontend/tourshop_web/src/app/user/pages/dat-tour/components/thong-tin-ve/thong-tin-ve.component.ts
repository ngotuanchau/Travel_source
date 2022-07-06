import { Component, Input, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-thong-tin-ve",
  templateUrl: "./thong-tin-ve.component.html",
  styleUrls: ["./thong-tin-ve.component.scss"],
})
export class ThongTinVeComponent implements OnInit {
  @Input() tour: any;
  @Input() tongVe: any;
  @Input() nglon: number;
  @Input() trem: number;
  @Input() trnho: number;
  @Input() ngay: number;
  @Input() ngayKHs: any;
  gianl: any;
  giatrem: any;
  giatrnho: any;
  pipe = new DatePipe("en-US");
  constructor() {}

  ngOnInit(): void {
    this.gianl = this.ngayKHs.find(
      (item: any) => item.id == this.ngay
    )?.giaNguoiLon;
    this.giatrem = this.ngayKHs.find(
      (item: any) => item.id == this.ngay
    )?.giaTreEn;
    this.giatrnho = this.ngayKHs.find(
      (item: any) => item.id == this.ngay
    )?.giaTreNho;
  }
  findDateDisplay(id: number) {
    return this.pipe.transform(
      this.ngayKHs.find((item: any) => item.id == id)?.ngayKh,
      "dd/MM/yyyy"
    );
  }
  multi(a: number, b: number) {
    return a * b;
  }
  plus(a: number, b: number, c: number) {
    return a + b + c;
  }
}
