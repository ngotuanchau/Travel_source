import { Component, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { LichTrinh, lstLichTrinh } from "./lichtrinh-data";

@Component({
  selector: "app-lich-trinh",
  templateUrl: "./lich-trinh.component.html",
  styleUrls: ["./lich-trinh.component.scss"],
})
export class LichTrinhComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;
  @Output() soNgay: number;
  lstLichTrinh: LichTrinh[];
  constructor() {
    this.lstLichTrinh = lstLichTrinh;
  }
  get lstLT() {
    return this.form?.controls?.[this.name]?.value || [];
  }

  set lstLT(data) {
    this.form.patchValue({
      [this.name]: data,
    });
  }
  lichTrinhs: any;
  ngay: number;
  moTa: string;
  sang: string;
  trua: string;
  chieu: string;
  toi: string;

  ngOnInit(): void {}
  onAdd() {
    const list = this.lstLT;
    list.push({
      ngay: this.ngay,
      moTa: this.moTa,
      sang: this.sang,
      trua: this.trua,
      chieu: this.chieu,
      toi: this.toi,
    });
    this.lstLT = list;
  }

  onRemove(ngay: number) {
    this.lstLT = this.lstLT.filter((item: any) => item.ngay != ngay);
  }
  Readmore = false;
}
