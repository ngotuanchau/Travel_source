import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tour } from "../models/tour.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToursService {
  baseUrl = "http://localhost:40998/api/Tours";
  constructor(private http: HttpClient) {}

  //Get all Tour
  getAllTour(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.baseUrl + "/get_all_tour");
  }

  //Create Tour
  createTour(tour: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/create", tour);
  }
}
