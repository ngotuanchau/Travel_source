import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-lich-trinh-tours",
  templateUrl: "index.component.html",
  styleUrls: ["index.component.css"],
})
export class LichTrinhsIndexComponent implements OnInit {
  @Input() tour: any;
  lichTrinh: any;
  constructor() {}
  getLichTrinhByIdTour() {
    this.lichTrinh = this.tour.lichtrinh;
    console.log(this.lichTrinh);
  }
  ngOnInit(): void {
    this.getLichTrinhByIdTour();
  }
}
