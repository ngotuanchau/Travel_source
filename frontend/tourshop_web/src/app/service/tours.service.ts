import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tour } from "../models/tour.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToursService {
  baseUrl = "http://localhost:40998/api/Tours";
  baseURLNodeJS = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  //Get all Tour
  getAllTour(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.baseUrl + "/get_all_tour");
  }

  //Create Tour
  createTour(tour: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/create", tour);
  }

  //Update_anh
  updateImage(anh: any): Observable<any[]> {
    var body = {
      anhs: anh,
    };
    return this.http.post<any[]>(this.baseUrl + "/update_anh", body);
  }

  saveImageToLocalByNodeJS(data: any): Observable<any> {
    return this.http.post<any[]>(
      this.baseURLNodeJS + "/node-js/upload-image",
      data
    );
  }
}
