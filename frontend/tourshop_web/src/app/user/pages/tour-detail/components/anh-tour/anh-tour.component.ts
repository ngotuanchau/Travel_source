import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-anh-tour",
  templateUrl: "./anh-tour.component.html",
  styleUrls: ["./anh-tour.component.scss"],
})
export class AnhTourComponent implements OnInit {
  @Input() tour: any;
  @Input() hinhanh: any;
  constructor() {}

  ngOnInit(): void {}
  // getlstAnh() {
  //   var lstanh = [];
  //   for (let anh of this.hinhanh) {
  //     var url = "http://localhost:3000/" + anh.tenanh;
  //     lstanh.push({ url: url });
  //   }
  //   console.log("lstanh");
  //   console.log(lstanh);
  //   return lstanh;
  // }
}
