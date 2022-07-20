import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DiadiemsService } from "../../../../../service/diadiems.service";
import { NgToastService } from "ng-angular-popup";
@Component({
  selector: "app-dia-diem-edit",
  templateUrl: "./dia-diem-edit.component.html",
  styleUrls: ["./dia-diem-edit.component.scss"],
})
export class DiaDiemEditComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;
  @Input() listdiadiem: any;
  newList: any;
  oldList: any;
  get listDD() {
    return this.listdiadiem.concat(this.newList).concat(this.oldList);
  }

  setlistNKH1ToForm() {
    this.form.patchValue({
      [this.name]: this.listDD,
    });
  }

  thutu: number;
  dd: string;

  diadiems: any;
  //Lay tat ca dia diem
  getAllDiaDiem() {
    this.diadiemService.getDiaDiem().subscribe((response) => {
      this.diadiems = response.listDiaDiem;
    });
  }

  constructor(
    private diadiemService: DiadiemsService,
    private toast: NgToastService
  ) {
    this.getAllDiaDiem();
  }

  ngOnInit(): void {
    this.newList = [];
    this.oldList = [];
    //Lấy danh sách stt
    let thutus: any;
    thutus = [];
    for (let i = 0; i < this.listdiadiem.length; i++) {
      thutus.push(this.listdiadiem[i].thutu);
    }
    for (let i = 0; i < this.newList.length; i++) {
      thutus.push(this.newList[i].thutu);
    }
    var sttmax = Math.max.apply(
      Math,
      thutus.map(function (item: any) {
        return item;
      })
    );
    this.thutu = sttmax + 1;
  }
  onAdd() {
    if (this.dd == null) {
      this.toast.error({
        detail: "Cảnh báo",
        summary: "Chưa chọn địa điểm",
        duration: 3000,
      });
    } else {
      this.newList.push({
        thutu: this.thutu,
        diadiem: parseInt(this.dd),
      });
      this.setlistNKH1ToForm();
    }
    //Lấy danh sách stt
    let thutus: any;
    thutus = [];
    for (let i = 0; i < this.listdiadiem.length; i++) {
      thutus.push(this.listdiadiem[i].thutu);
    }
    for (let i = 0; i < this.newList.length; i++) {
      thutus.push(this.newList[i].thutu);
    }
    var sttmax = Math.max.apply(
      Math,
      thutus.map(function (item: any) {
        return item;
      })
    );
    //STT còn thiếu
    function missingItems(arr: any, n: any) {
      let missingItems: any;
      missingItems = [];
      for (let i = 1; i <= n; i++) if (!arr.includes(i)) missingItems.push(i);
      return missingItems;
    }
    var minMiss = Math.min.apply(
      Math,
      missingItems(thutus, sttmax).map(function (item: any) {
        return item;
      })
    );
    //Kiem tra
    if (missingItems(thutus, sttmax).length == 0) {
      this.thutu = sttmax + 1;
    } else {
      this.thutu = minMiss;
    }
  }

  onRemove(stt: number) {
    this.newList = this.newList.filter((item: any) => item.thutu != stt);
    this.setlistNKH1ToForm();
    this.thutu = stt;
    //Lấy danh sách stt
    let thutus: any;
    thutus = [];
    for (let i = 0; i < this.listdiadiem.length; i++) {
      thutus.push(this.listdiadiem[i].thutu);
    }
    for (let i = 0; i < this.newList.length; i++) {
      thutus.push(this.newList[i].thutu);
    }
    var sttmax = Math.max.apply(
      Math,
      thutus.map(function (item: any) {
        return item;
      })
    );
    //STT còn thiếu
    function missingItems(arr: any, n: any) {
      let missingItems: any;
      missingItems = [];
      for (let i = 1; i <= n; i++) if (!arr.includes(i)) missingItems.push(i);
      return missingItems;
    }
    var minMiss = Math.min.apply(
      Math,
      missingItems(thutus, sttmax).map(function (item: any) {
        return item;
      })
    );
    //Kiem tra
    if (missingItems(thutus, sttmax).length == 0) {
      this.thutu = sttmax + 1;
    } else {
      this.thutu = minMiss;
    }
    this.sort();
  }
  onDelete(id: number) {
    for (let dd of this.listdiadiem) {
      if (dd.id == id) {
        this.thutu = dd.thutu;
        this.oldList.push({
          id: id,
          thutu: dd.thutu,
          diadiem: dd.diadiem,
          mode: 2,
        });
      }
    }
    this.listdiadiem = this.listdiadiem.filter((item: any) => item.id != id);
    this.setlistNKH1ToForm();
    //Lấy danh sách stt
    let thutus: any;
    thutus = [];
    for (let i = 0; i < this.listdiadiem.length; i++) {
      thutus.push(this.listdiadiem[i].thutu);
    }
    for (let i = 0; i < this.newList.length; i++) {
      thutus.push(this.newList[i].thutu);
    }
    var sttmax = Math.max.apply(
      Math,
      thutus.map(function (item: any) {
        return item;
      })
    );
    //STT còn thiếu
    function missingItems(arr: any, n: any) {
      let missingItems: any;
      missingItems = [];
      for (let i = 1; i <= n; i++) if (!arr.includes(i)) missingItems.push(i);
      return missingItems;
    }
    var minMiss = Math.min.apply(
      Math,
      missingItems(thutus, sttmax).map(function (item: any) {
        return item;
      })
    );
    //Kiem tra
    if (missingItems(thutus, sttmax).length == 0) {
      this.thutu = sttmax + 1;
    } else {
      this.thutu = minMiss;
    }
    this.sort();
  }
  sort() {
    //Sắp xếp danh sách lịch trình
    var temp = 0;
    for (var i = 0; i < this.listdiadiem.length; i++) {
      for (var j = i; j < this.listdiadiem.length; j++) {
        if (this.listdiadiem[j].thutu < this.listdiadiem[i].thutu) {
          temp = this.listdiadiem[j];
          this.listdiadiem[j] = this.listdiadiem[i];
          this.listdiadiem[i] = temp;
        }
      }
    }
  }
  findDDById(id: number) {
    return this.diadiems.find((item: any) => item.id == id)?.tendiadiem;
  }
  getSTT(value: any) {
    this.thutu = value;
  }
  checkTT() {
    let list = this.listdiadiem.push(this.newList);
    this.thutu =
      Math.max.apply(
        Math,
        list.map(function (item: any) {
          return item.thutu;
        })
      ) + 1;
  }
}
