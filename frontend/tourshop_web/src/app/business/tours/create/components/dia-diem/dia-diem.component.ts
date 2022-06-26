import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DiadiemsService } from "../../../../../service/diadiems.service";
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
    this.diadiemService.getAllDiaDiem().subscribe((response) => {
      this.diadiems = response.listDiaDiem;
    });
  }

  constructor(private diadiemService: DiadiemsService) {
    this.getAllDiaDiem();
  }

  ngOnInit(): void {}
  onAdd() {
    if (this.thutu == null) {
      alert("Chưa chọn số thứ tự");
    } else if (this.dd == null) {
      alert("Chưa chọn địa điểm");
    } else {
      const list = this.listDD;
      list.push({
        thutu: this.thutu,
        diadiem: parseInt(this.dd),
      });
      this.listDD = list;
      this.checkTT();
    }
  }

  onRemove(stt: number) {
    this.listDD = this.listDD.filter((item: any) => item.thutu != stt);
    this.thutu = stt;
  }

  findDDById(id: number) {
    return this.diadiems.find((item: any) => item.id == id)?.ten;
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
    console.log(this.thutu);
  }
}
