import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToursService } from "../../../service/tours.service";

@Component({
  selector: "app-tours-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class ToursDetailComponent implements OnInit {
  idTour: any;
  tour: any;
  constructor(
    private tourService: ToursService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTourDetail();
  }
  getTourDetail() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idTour = params.get("id");
    });
    this.tourService.getDetailTour(this.idTour).subscribe((response) => {
      this.tour = response;
    });
  }
}
