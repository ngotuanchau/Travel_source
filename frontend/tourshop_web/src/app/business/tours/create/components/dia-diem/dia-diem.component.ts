import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DiadiemsService } from "../../../../../service/diadiems.service";
import { NgToastService } from "ng-angular-popup";
@Component({
  selector: "app-dia-diem",
  templateUrl: "./dia-diem.component.html",
  styleUrls: ["./dia-diem.component.scss"],
})
export class DiaDiemComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;

  get listDD() {
    return this.form?.controls?.[this.name]?.value || [];
  }

  set listDD(data) {
    this.form.patchValue({
      [this.name]: data,
    });
  }

  thutu: number = 1;
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

  ngOnInit(): void {}
  onAdd() {
    if (this.dd == null) {
      this.toast.error({
        detail: "Cảnh báo",
        summary: "Chưa chọn địa điểm",
        duration: 3000,
      });
    } else {
      const list = this.listDD;
      list.push({
        thutu: this.thutu,
        diadiem: parseInt(this.dd),
      });
      this.listDD = list;
      this.checkTT();
    }
    //Lấy danh sách stt
    let thutus: any;
    thutus = [];
    for (let i = 0; i < this.listDD.length; i++) {
      thutus.push(this.listDD[i].thutu);
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
    if (missingItems(thutus, sttmax).length == 0) {
      if (sttmax == null) {
        this.thutu = 1;
      }
      this.thutu = sttmax + 1;
    } else {
      this.thutu = minMiss;
    }
    this.sort();
  }

  onRemove(stt: number) {
    this.listDD = this.listDD.filter((item: any) => item.thutu != stt);
    this.thutu = stt;
    //Lấy danh sách stt
    let thutus: any;
    thutus = [];
    for (let i = 0; i < this.listDD.length; i++) {
      thutus.push(this.listDD[i].thutu);
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
    for (var i = 0; i < this.listDD.length; i++) {
      for (var j = i; j < this.listDD.length; j++) {
        if (this.listDD[j].thutu < this.listDD[i].thutu) {
          temp = this.listDD[j];
          this.listDD[j] = this.listDD[i];
          this.listDD[i] = temp;
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
    this.thutu =
      Math.max.apply(
        Math,
        this.listDD.map(function (item: any) {
          return item.thutu;
        })
      ) + 1;
  }
}
