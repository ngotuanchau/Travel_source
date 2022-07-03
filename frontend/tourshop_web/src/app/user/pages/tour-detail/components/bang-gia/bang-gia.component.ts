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
  constructor(private routes: Router) {}
  pipe = new DatePipe("en-US");
  today = new Date().toLocaleDateString();
  formatDate(ngay: any) {
    var day;
    return (day = new Date(ngay).toLocaleDateString());
  }
  ngOnInit(): void {}
  disable: false;
  findBlankDisplay(id: number, vetoida: number): number {
    const today = new Date().toLocaleDateString();
    //const thisDay = new Date(this.ngayKh).toLocaleDateString();
    var blank = 0;
    for (let n of this.ngayKhs) {
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
  datNgay() {
    this.routes.navigate(["../booking"]);
  }
}
