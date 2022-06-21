import { analyzeAndValidateNgModules } from "@angular/compiler";
import { Component, Input, OnInit, Output } from "@angular/core";
import { FormGroup, MaxValidator } from "@angular/forms";

@Component({
  selector: "app-lich-trinh",
  templateUrl: "./lich-trinh.component.html",
  styleUrls: ["./lich-trinh.component.scss"],
})
export class LichTrinhComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;
  @Input() sngay: any;
  constructor() {}
  get lstLT() {
    return this.form?.controls?.[this.name]?.value || [];
  }
  set lstLT(data) {
    this.form.patchValue({
      [this.name]: data,
    });
  }
  ngay: number = 1;
  moTa: string;
  sang: string;
  trua: string;
  chieu: string;
  toi: string;
  disable = false;

  ngOnInit(): void {}
  //Thêm lich trình
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

    if (this.lstLT.length >= this.sngay) {
      this.disable = true;
    }

    //Lấy danh sách ngày
    let ngays = [];
    for (let i = 0; i < this.lstLT.length; i++) {
      ngays.push(this.lstLT[i].ngay);
    }
    //console.log("Danh sách ngày:" + ngays);
    //Ngày còn thiếu
    function missingItems(arr: any, n: any) {
      let missingItems = [];
      for (let i = 1; i <= n; i++) if (!arr.includes(i)) missingItems.push(i);
      return missingItems;
    }
    //console.log("Danh sach ngay thieu" + missingItems(ngays, this.sngay));
    //Gán ngay nho nhat cho input ngay
    this.ngay = Math.min.apply(
      Math,
      missingItems(ngays, this.sngay).map(function (item: any) {
        return item;
      })
    );

    console.log("Ngày tiếp theo:" + this.ngay);
    this.sort();
  }

  sort() {
    //Sắp xếp danh sách lịch trình
    var temp = 0;
    for (var i = 0; i < this.lstLT.length; i++) {
      for (var j = i; j < this.lstLT.length - 1; j++) {
        if (this.lstLT[j].ngay < this.lstLT[i].ngay) {
          temp = this.lstLT[j];
          this.lstLT[j] = this.lstLT[i];
          this.lstLT[i] = temp;
        }
      }
    }
  }
  //Xóa lịch trình 1 ngày
  onRemove(ngay: number) {
    this.lstLT = this.lstLT.filter((item: any) => item.ngay != ngay);

    if (this.lstLT.length >= this.sngay) {
      this.disable = true;
    } else {
      this.disable = false;
    }
    //Lấy danh sách ngày
    let ngays = [];
    for (let i = 0; i < this.lstLT.length; i++) {
      ngays.push(this.lstLT[i].ngay);
    }
    //console.log("Danh sách ngày:" + ngays);
    //Ngày còn thiếu
    function missingItems(arr: any, n: any) {
      let missingItems = [];
      for (let i = 1; i <= n; i++) if (!arr.includes(i)) missingItems.push(i);
      return missingItems;
    }
    //console.log("Danh sach ngay thieu" + missingItems(ngays, this.sngay));
    //Gán ngay nho nhat cho input ngay
    this.ngay = Math.min.apply(
      Math,
      missingItems(ngays, this.sngay).map(function (item: any) {
        return item;
      })
    );
    console.log("Ngày tiếp theo:" + this.ngay);
  }
}
