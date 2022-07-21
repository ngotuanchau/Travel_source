import { Component, Input, OnInit } from "@angular/core";
import {
  AmThuc,
  lstAmThucs,
  lstLuuTrus,
  lstPhuongTiens,
  LuuTru,
  PhuongTien,
} from "./dichvu-data";

@Component({
  selector: "app-dich-vu-tour",
  templateUrl: "./dich-vu-tour.component.html",
  styleUrls: ["./dich-vu-tour.component.scss"],
})
export class DichVuTourComponent implements OnInit {
  @Input() tour: any;

  lstAmThuc: AmThuc[];
  lstLuuTru: LuuTru[];
  lstPhuongTien: PhuongTien[];
  at: any;
  lt: any;
  pt: any;
  constructor() {
    this.lstAmThuc = lstAmThucs;
    this.lstLuuTru = lstLuuTrus;
    this.lstPhuongTien = lstPhuongTiens;
  }

  ngOnInit(): void {
    this.at = this.convertToArray(this.tour.amThuc);
    this.lt = this.convertToArray(this.tour.luuTru);
    this.pt = this.convertToArray(this.tour.phuongtien);
  }
  convertToArray(string: string) {
    return string.split(",").map((item) => parseInt(item, 10));
  }
  findDVById(id: number, arr: any) {
    return arr.find((item: any) => item.id == id)?.name;
  }
}
