import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-lich-trinh-edit",
  templateUrl: "./lich-trinh-edit.component.html",
  styleUrls: ["./lich-trinh-edit.component.scss"],
})
export class LichTrinhEditComponent implements OnInit {
  @Input() listlichtrinh: any;
  @Input() lichtrinh: any;
  @Input() form: FormGroup;
  @Input() sngay: any;
  @Input() name: string;
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
  disable: boolean = true;
  oldList: any;
  newList: any;
  capNhat: boolean = true;
  ngOnInit(): void {
    this.newList = [];
    this.oldList = [];
  }
  //Thêm lich trình
  onAdd() {
    const list = this.newList;
    list.push({
      id: 0,
      ngay: this.ngay,
      moTa: this.moTa,
      sang: this.sang,
      trua: this.trua,
      chieu: this.chieu,
      toi: this.toi,
    });
    this.newList = list;

    //Lấy danh sách ngày
    let ngays: any;
    ngays = [];
    for (let i = 0; i < this.listlichtrinh.length; i++) {
      ngays.push(this.listlichtrinh[i].ngay);
    }
    for (let i = 0; i < this.newList.length; i++) {
      ngays.push(this.newList[i].ngay);
    }
    if (ngays.length == this.sngay) {
      this.disable = true;
    } else {
      this.disable = false;
    }
    //console.log("Danh sách ngày:" + ngays);
    //Ngày còn thiếu
    function missingItems(arr: any, n: any) {
      let missingItems: any;
      missingItems = [];
      for (let i = 1; i <= n; i++) if (!arr.includes(i)) missingItems.push(i);
      return missingItems;
    }
    //console.log("Danh sach ngay thieu" + missingItems(ngays, this.sngay));

    if (missingItems(ngays, this.sngay).length > 0) {
      //Gán ngay nho nhat cho input ngay
      this.ngay = Math.min.apply(
        Math,
        missingItems(ngays, this.sngay).map(function (item: any) {
          return item;
        })
      );
    } else {
      this.ngay =
        Math.max.apply(
          Math,
          ngays.map(function (item: any) {
            return item;
          })
        ) + 1;
    }
    //console.log("Ngày tiếp theo: " + this.ngay);
    this.sort();
  }

  sort() {
    //Sắp xếp danh sách lịch trình
    var temp = 0;
    for (var i = 0; i < this.lstLT.length; i++) {
      for (var j = i; j < this.lstLT.length; j++) {
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
    this.newList = this.newList.filter((item: any) => item.ngay != ngay);

    //Lấy danh sách ngày
    let ngays: any;
    ngays = [];
    for (let i = 0; i < this.listlichtrinh.length; i++) {
      ngays.push(this.listlichtrinh[i].ngay);
    }
    for (let i = 0; i < this.newList.length; i++) {
      ngays.push(this.newList[i].ngay);
    }
    if (ngays.length == this.sngay) {
      this.disable = true;
    } else {
      this.disable = false;
    }
    // console.log("Danh sách ngày:" + ngays);
    // console.log("Số ngày" + this.sngay);
    //Ngày còn thiếu
    function missingItems(arr: any, n: any) {
      let missingItems: any;
      missingItems = [];
      for (let i = 1; i <= n; i++) if (!arr.includes(i)) missingItems.push(i);
      return missingItems;
    }
    //console.log("Danh sach ngay thieu" + missingItems(ngays, this.sngay));
    //Gán ngay nho nhat cho input ngay
    if (missingItems(ngays, this.sngay).length > 0) {
      this.ngay = Math.min.apply(
        Math,
        missingItems(ngays, this.sngay).map(function (item: any) {
          return item;
        })
      );
    }
  }
  //Xóa lịch trình 1 ngày
  onDelete(id: number) {
    for (let lt of this.listlichtrinh) {
      if (lt.id == id) {
        this.oldList.push({
          id: lt.id,
          ngay: lt.ngay,
          moTa: lt.moTa,
          sang: lt.sang,
          trua: lt.trua,
          chieu: lt.chieu,
          toi: lt.toi,
          mode: 2,
        });
        break;
      }
    }
    // console.log("Danh sách cũ:");
    // console.log(this.oldList);

    this.listlichtrinh = this.listlichtrinh.filter(
      (item: any) => item.id != id
    );
    //Lấy danh sách ngày
    let ngays: any;
    ngays = [];
    for (let i = 0; i < this.listlichtrinh.length; i++) {
      ngays.push(this.listlichtrinh[i].ngay);
    }
    for (let i = 0; i < this.newList.length; i++) {
      ngays.push(this.newList[i].ngay);
    }
    if (ngays.length == this.sngay) {
      this.disable = true;
    } else {
      this.disable = false;
    }
    //console.log("Danh sách ngày:" + ngays);
    //Ngày còn thiếu
    function missingItems(arr: any, n: any) {
      let missingItems: any;
      missingItems = [];
      for (let i = 1; i <= n; i++) if (!arr.includes(i)) missingItems.push(i);
      return missingItems;
    }
    console.log("Danh sach ngay thieu" + missingItems(ngays, this.sngay));
    //Gán ngay nho nhat cho input ngay
    if (missingItems(ngays, this.sngay).length > 0) {
      this.ngay = Math.min.apply(
        Math,
        missingItems(ngays, this.sngay).map(function (item: any) {
          return item;
        })
      );
    }

    console.log("Ngày tiếp theo:" + this.ngay);
  }
  id: any;
  edit(id: any) {
    this.id = id;
    alert(id);
    this.capNhat = false;
    for (let lt of this.listlichtrinh) {
      if (lt.id == id) {
        this.ngay = lt.ngay;
        this.moTa = lt.moTa;
        this.sang = lt.sang;
        this.trua = lt.trua;
        this.chieu = lt.chieu;
        this.toi = lt.toi;
      }
    }
  }

  capNhatLT(id: any) {
    for (let lt of this.listlichtrinh) {
      if (lt.id == id) {
        this.oldList.push({
          id: id,
          ngay: this.ngay,
          moTa: this.moTa,
          sang: this.sang,
          trua: this.trua,
          chieu: this.chieu,
          toi: this.toi,
          mode: 1,
        });
        break;
      }
    }
    this.capNhat = true;
    this.ngay = 0;
    this.sang = "";
    this.trua = "";
    this.chieu = "";
    this.toi = "";
    this.moTa = "";
    // console.log(this.oldList);
  }
}
