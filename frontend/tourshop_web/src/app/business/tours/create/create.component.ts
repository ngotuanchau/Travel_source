import { Component, OnInit, ViewChild } from "@angular/core";
import { PhanvungsService } from "../../../service/phanvungs.service";
import { DiadiemsService } from "../../../service/diadiems.service";
import { TheloaisService } from "../../../service/theloais.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToursService } from "../../../service/tours.service";
import { FormField } from "./components/model";
import { HttpClient } from "@angular/common/http";
import { AnhsService } from "../../../service/anhs.service";
@Component({
  selector: "app-tours-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class ToursCreateComponent {
  diadiems: any;
  phanvungs: any;
  theloais: any;
  Date = new Date(Date.now());
  form: FormGroup;
  idTour: number;
  ha: any;
  image: any;
  lstAnh = [];
  readonly FormField = FormField;
  constructor(
    private diadiemService: DiadiemsService,
    private phanvungService: PhanvungsService,
    private theloaiService: TheloaisService,
    private tourService: ToursService,
    private formBuilder: FormBuilder,
    private anhService: AnhsService,
    private http: HttpClient
  ) {
    this.form = this.formBuilder.group({
      [FormField.tentour]: [null, Validators.required], //1
      [FormField.theloai]: [1, Validators.required], //2
      [FormField.soNgay]: [1, Validators.required], //3
      [FormField.soDem]: [0, Validators.required], //4
      [FormField.veToiDa]: [1, Validators.required], //5
      [FormField.veToiThieu]: [1, [Validators.required]], //6
      [FormField.diemDi]: [1, Validators.required], //7
      [FormField.diemDen]: [1, Validators.required], //8
      [FormField.nhungdiadiem]: [[], Validators.required], //9
      [FormField.phanvung]: [1, Validators.required], //11
      [FormField.mota]: [null], //12
      [FormField.amThuc]: ["", Validators.required], //13
      [FormField.luuTru]: ["", Validators.required], //14
      [FormField.phuongtien]: ["", Validators.required], //15
      [FormField.nhungNgayKhoiHanh]: [[], Validators.required], //16
      [FormField.lichtrinh]: [[]], //17,
      [FormField.hinhanh]: [[]], //18
      [FormField.congty]: [null, Validators.required], //19
    });
  }

  ngOnInit(): void {
    this.getAllDiaDiem();
    this.getPhanVung();
    this.getTheLoai();
    // this.form.patchValue({
    //   [FormField.soNgay]: this.idCty,
    // });
    this.getId();
  }

  isControlError(field: FormField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some((type) => !!control?.errors?.[type]);
    }
    return false;
  }
  selectsimage(multipleImages: any) {
    this.ha = multipleImages;
  }
  //Tao tour
  onSubmit() {
    //Get image from field
    const imageMain = this.form?.controls?.[FormField.hinhanh]?.value;
    //Get images detail
    var imageDetail = this.ha;
    console.log("Hinh ảnh chi tiết: " + imageDetail);
    //Set filed to = []
    this.form.patchValue({ [FormField.hinhanh]: [] });
    //Cal API create tour to database
    this.tourService.createTour(this.form.value).subscribe((response) => {
      if (response != null) {
        var idTour = response.idTour;
        if (imageMain[0] != null) {
          //Save image to local
          this.saveImageToLocalByNodeJS(idTour, imageMain[0]).subscribe(
            (response) => {
              //console.log("Chạy vao đây: " + response);
              //Check save success
              if (response == null) {
                console.log("Không thể lưu ảnh tour");
                return;
              }
              //add image saved to list with format {idtour, tenanh}
              var imageMainSubmit: any = [];
              imageMainSubmit.push({
                idTour: idTour,
                tenanh: response.path,
              });
              console.log("abc" + imageMainSubmit);
              //Call API update image to database
              this.tourService
                .updateImage(imageMainSubmit)
                .subscribe((response) => {
                  if (response != null) {
                    console.log("Lưu ảnh đại diện thành công");
                  } else {
                    console.log("Không thể lưu ảnh vào database");
                  }
                });
            }
          );
        }
        if (this.ha != null) {
          this.saveImagesToLocalByNodeJS().subscribe((response) => {
            if (response == null) {
              console.log("Không thể lưu ảnh chi tiết");
              return;
            } else {
              console.log("Res: " + response);
              const data = response.path;
              this.lstAnh = data;
              // console.log("this.lstAnh: " + this.lstAnh);
              var imageDetailSubmit: any = [];
              for (let dt of this.lstAnh) {
                const anh = dt;
                console.log("anh: " + anh);
                //add image saved to list with format {idtour, tenanh}
                imageDetailSubmit.push({
                  idTour: idTour,
                  tenanh: anh,
                });
              }
            }
            this.lstAnh = imageDetailSubmit;
            return this.anhService
              .createImage(this.lstAnh)
              .subscribe((response) => {
                if (response != null) {
                  console.log("Res:");
                  console.log(response);
                }
              });
          });
        }
        alert("Tạo tour thành công!");
      } else {
        console.log("Không thể tạo tour");
      }
    });
  }

  saveImageToLocalByNodeJS(idTour: any, imageMain: any) {
    var formData = new FormData();
    var extension = imageMain.name.split(".").pop();
    var newName = idTour + "." + extension;
    formData.append("file", imageMain, newName);
    return this.http.post<any>(
      "http://localhost:3000/node-js/upload-image",
      formData
    );
  }

  saveImagesToLocalByNodeJS() {
    const formdata = new FormData();

    for (let img of this.ha) {
      formdata.append("files", img);
    }
    console.log(formdata);

    return this.http.post<any>(
      "http://localhost:3000/node-js/create-images",
      formdata
    );
  }

  getAllDiaDiem() {
    this.diadiemService.getAllDiaDiem().subscribe((response) => {
      this.diadiems = response.listDiaDiem;
    });
  }
  //Lay phan vung
  getPhanVung() {
    this.phanvungService.getPhanVung().subscribe((response) => {
      this.phanvungs = response.listPhanVung;
    });
  }
  //Lay the loai
  getTheLoai() {
    this.theloaiService.getTheLoai().subscribe((response) => {
      this.theloais = response.listTheLoai;
    });
  }
  getId() {
    const id = this.idCty;
    this.form.patchValue({ [FormField.congty]: id });
    console.log(id);
  }
  get idCty() {
    return localStorage.getItem("id");
  }

  get songay() {
    return this.form?.controls?.[FormField.soNgay]?.value || 0;
  }

  set songay(data) {
    this.form.patchValue({
      [FormField.soNgay]: parseInt(data),
    });
  }
  get sodem() {
    return this.form?.controls?.[FormField.soDem]?.value || 0;
  }

  set sodem(data) {
    this.form.patchValue({
      [FormField.soDem]: parseInt(data),
    });
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  N: number = 1;
  D: number = 0;

  // //keyup
  getSoNgay(value: any) {
    this.songay = value;
  }
  getSoDem(value: any) {
    this.sodem = value;
  }
  parseInta(a: string) {
    return parseInt(a);
  }
}
