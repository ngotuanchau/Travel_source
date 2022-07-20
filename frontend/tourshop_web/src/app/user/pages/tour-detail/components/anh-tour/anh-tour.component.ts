import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-anh-tour",
  templateUrl: "./anh-tour.component.html",
  styleUrls: ["./anh-tour.component.scss"],
})
export class AnhTourComponent implements OnInit {
  @Input() tour: any;
  @Input() hinhanh: any;
  anhs: any;
  default: any;
  constructor() {}

  ngOnInit(): void {
    console.log(this.hinhanh);
  }
}
