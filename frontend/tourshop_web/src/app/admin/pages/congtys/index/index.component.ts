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
  filterDNByVung(id: any) {
    let list: any;
    list = [];
    for (let dn of this.user) {
      if (dn.khuVuc == id) {
        list.push(dn);
      }
    }
    return list;
  }

  //Nav
  currentJustify = "start";

  active = 1;
  activev = "top";

  activeKeep = 1;

  activeSelected = 1;
  disabled = true;

  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;
  activeDynamic = 1;

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.activeSelected = 1;
    }
  }

  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter((id) => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.tabs.push(this.counter++);
    event.preventDefault();
  }
}
