import { Component } from "@angular/core";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";
import { DoanhNghiepsService } from "../../../../service/doanhnghieps.service";
import { PhanvungsService } from "../../../../service/phanvungs.service";
@Component({
  selector: "app-congtys",
  templateUrl: "index.component.html",
  styleUrls: ["index.component.css"],
})
export class CongTysIndexComponent {
  pipe = new DatePipe("en-US");
  constructor(
    private doanhnghiepService: DoanhNghiepsService,
    private phanvungServices: PhanvungsService
  ) {}
  ngOnInit(): void {
    this.getAllDoanhNghiep();
    this.getPhanVung();
  }
  user: any;
  bac: any;
  trung: any;
  nam: any;
  getAllDoanhNghiep() {
    this.user = [];
    this.doanhnghiepService.getAllBusiness().subscribe((res) => {
      this.user = res;
    });
  }
  phanvungs: any;
  getPhanVung() {
    this.phanvungs = [];
    this.phanvungServices.getPhanVung().subscribe((res) => {
      this.phanvungs = res.listPhanVung;
    });
  }
  findNamePhanVung(id: any) {
    return this.phanvungs.find((item: any) => item.id == id)?.tenVung;
  }
  filterDNByStt(id: any) {
    let list: any;
    list = [];
    for (let dn of this.user) {
      if (dn.trangThai == id) {
        list.push(dn);
      }
    }
    return list;
  }
}
