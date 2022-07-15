import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-bang-gia",
  templateUrl: "./bang-gia.component.html",
  styleUrls: ["./bang-gia.component.scss"],
})
export class BangGiaComponent implements OnInit {
  @Input() tour: any;
  @Input() ngayKhs: any;
  @Input() amthuc: any;
  @Input() luutru: any;
  @Input() phuongtien: any;
  constructor(private routes: Router) {}
  pipe = new DatePipe("en-US");
  disable: boolean = false;
  formatDate(ngay: any) {
    var day;
    return (day = new Date(ngay).toLocaleDateString());
  }
  ngOnInit(): void {
    const today = new Date().toLocaleDateString();
  }
  findBlankDisplay(id: number, vetoida: number): number {
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();
    var blank = 0;
    blank = this.ngayKhs.find((item: any) => item.id == id)?.vedadat;
    return this.minus(vetoida, blank);
  }

  minus(a: number, b: number) {
    return a - b;
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
  disableDatNgay(idngay: any, ngay: Date): boolean {
    if (this.findBlankDisplay(idngay, this.tour.veToiDa) > 0) {
      const today = new Date();
      const thisDay = new Date(ngay);
      if (thisDay.getFullYear() >= today.getFullYear()) {
        if (thisDay.getMonth() >= today.getMonth()) {
          if (
            (thisDay.getDate() >= today.getDate() &&
              thisDay.getMonth() == today.getMonth()) ||
            thisDay.getMonth() > today.getMonth()
          ) {
            this.disable = false;
          } else {
            this.disable = true;
          }
        } else {
          this.disable = true;
        }
      } else {
        this.disable = true;
      }
    }
    return this.disable;
  }
}
