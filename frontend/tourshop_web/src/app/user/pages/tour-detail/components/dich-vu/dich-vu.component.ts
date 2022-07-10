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
  selector: "app-dich-vu",
  templateUrl: "./dich-vu.component.html",
  styleUrls: ["./dich-vu.component.scss"],
})
export class DichVuComponent implements OnInit {
  @Input() tour: any;
  @Input() amthuc: any;
  @Input() luutru: any;
  @Input() phuongtien: any;
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
    this.at = this.convertToArray(this.amthuc);
    console.log(this.at);
    this.lt = this.convertToArray(this.luutru);
    console.log(this.lt);
    this.pt = this.convertToArray(this.phuongtien);
    console.log(this.pt);
  }
  convertToArray(string: string) {
    return string.split(",").map((item) => parseInt(item, 10));
  }
  findDVById(id: number, arr: any) {
    return arr.find((item: any) => item.id == id)?.name;
  }
}
