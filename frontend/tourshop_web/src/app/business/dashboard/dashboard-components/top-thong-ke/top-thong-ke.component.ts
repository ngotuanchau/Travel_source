import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-top-thong-ke",
  templateUrl: "./top-thong-ke.component.html",
  styleUrls: ["./top-thong-ke.component.scss"],
})
export class TopThongKeComponent implements OnInit {
  @Input() thongKe: any;
  constructor() {}

  ngOnInit(): void {
    console.log(this.thongKe);
  }
}
