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
  getAllTour(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "/get_all_tour");
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
  getNewTours(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "/get_tour_new");
  }
  //Get Tour by The loai Id
  getToursByIdTL(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "/get_tour_by_theloaiid/" + id);
  }
  //Get Tour by Diem Den Id
  getToursByIdDD(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "/get_tour_by_diemdenid/" + id);
  }
  //Get detail
  getDetailTour(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/get_a_tour/" + id);
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
  //Tour prepare
  prepare(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/confirm_tour_prepare/" + id);
  }
  //Tour start
  start(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/confirm_tour_start/" + id);
  }
  //Tour end
  end(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/confirm_tour_end/" + id);
  }
  //Tour cancel
  cancel(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/tour_cancel/" + id);
  }
  //confirm user book tour
  confirmBookTour(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/confirm_user_dattour/" + id);
  }
  //confirm thanh toan
  confirmThanhToan(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/confirm_user_thanhtoan/" + id);
  }
  //cofirm Refund
  confirmRefund(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/confirm_dahoantien/" + id);
  }
  //cofirm Refund
  confirmKTThanhToan(id: any): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "/confirm_user_hoanthanhthanhtoan/" + id
    );
  }
  //Search
  search(tour: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/search_tour", tour);
  }
  //update
  update(id: any, tour: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "/update/" + id, tour);
  }
}
