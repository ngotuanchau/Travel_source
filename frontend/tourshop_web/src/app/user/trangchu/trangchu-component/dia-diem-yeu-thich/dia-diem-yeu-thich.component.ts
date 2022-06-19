import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dia-diem-yeu-thich",
  templateUrl: "./dia-diem-yeu-thich.component.html",
  styleUrls: ["./dia-diem-yeu-thich.component.scss"],
})
export class DiaDiemYeuThichComponent implements OnInit {
  title: string = "Điểm đến yêu thích trong nước";
  subTitle: string = "Lên rừng xuống biển. Trọn vẹn Việt Nam";

  constructor() {}

  ngOnInit(): void {}
}
