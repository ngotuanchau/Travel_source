import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-lich-trinh-chi-tiet",
  templateUrl: "./lich-trinh-chi-tiet.component.html",
  styleUrls: ["./lich-trinh-chi-tiet.component.scss"],
})
export class LichTrinhChiTietComponent implements OnInit {
  @Input() tour: any;
  @Input() lichtrinh: any;
  @Input() diadiems: any;
  constructor() {}
  sort() {
    //Sắp xếp danh sách lịch trình
    var temp = 0;
    for (var i = 0; i < this.diadiems.length; i++) {
      for (var j = i; j < this.diadiems.length; j++) {
        if (this.diadiems[j].thutu < this.diadiems[i].thutu) {
          temp = this.diadiems[j];
          this.diadiems[j] = this.diadiems[i];
          this.diadiems[i] = temp;
        }
      }
    }
  }
  ngOnInit(): void {
    this.sort();
  }
}
