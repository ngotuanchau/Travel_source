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
  booking(id: any, ngay: any) {
    this.routes.navigate(["../booking/" + id + "/" + ngay]);
  }
}
