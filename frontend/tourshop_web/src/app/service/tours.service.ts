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
  //Save image to server by nodejs
  saveImageToLocalByNodeJS(data: any): Observable<any> {
    return this.http.post<any[]>(
      this.baseURLNodeJS + "/node-js/upload-image",
      data
    );
  }
  //Get all new tours
  //Get all Tour
  getNewTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.baseUrl + "/get_tour_new");
  }
  //Get detail
  getDetailTour(id: any): Observable<Tour> {
    return this.http.get<Tour>(this.baseUrl + "/get_a_tour/" + id);
  }

  //Book tour
  bookTour(tour: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/dat_tour", tour);
  }
  //get user
  getUserByIdTour(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/get_user_dattour/" + id);
  }
  //get all tour of business by id business
  getAllTourBusinessId(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/get_all_tour_bussiness/" + id);
  }
  //confirm user book tour
  confirmBookTour(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/confirm_user_dattour/" + id);
  }
}
