import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-uu-dai-tot-nhat",
  templateUrl: "./uu-dai-tot-nhat.component.html",
  styleUrls: ["./uu-dai-tot-nhat.component.scss"],
})
export class UuDaiTotNhatComponent implements OnInit {
  title: string = "Ưu đãi tốt nhất hôm nay";
  subTitle: string = "Nhanh tay đặt ngay. Để mai sẽ lỡ";
  uuDai: string = "Tiết kiệm đến 50%";
  tenTour: string = "DU LỊCH HỘI AN 3N2Đ";
  giaTour: number = 3900000;
  thongTin: string = "Trẻ nhỏ miễn 100% phí dich vụ";
  constructor() {}

  ngOnInit(): void {}
}
