import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToursService } from "../../../service/tours.service";

@Component({
  selector: "app-khach-dat-tour",
  templateUrl: "./khach-dat-tour.component.html",
  styleUrls: ["./khach-dat-tour.component.scss"],
})
export class KhachDatTourComponent implements OnInit {
  id: any;
  users: any;
  constructor(
    private tourservice: ToursService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  getUserByIdTour() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get("id");
    });
    this.tourservice.getUserByIdTour(this.id).subscribe((response) => {
      this.users = response;
    });
  }
  confirmBookTour(id: any) {
    this.tourservice.confirmBookTour(id).subscribe((res) => {});
  }
}
