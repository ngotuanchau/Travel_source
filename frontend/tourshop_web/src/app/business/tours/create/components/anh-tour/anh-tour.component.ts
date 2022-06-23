import { HttpClient, HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, Subscriber } from "rxjs";

@Component({
  selector: "app-anh-tour",
  templateUrl: "./anh-tour.component.html",
  styleUrls: ["./anh-tour.component.scss"],
})
export class AnhTourComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;
  displaySingleImage!: Boolean;
  displayMultipleImages!: Boolean;
  displayMultipleImageArray!: Array<any>;
  displaySingleImageArray!: Array<any>;

  @ViewChild("multipleInput", { static: false })
  multipleInput!: ElementRef;
  image: any;
  multipleImages = [];
  selectedFiles?: FileList;

  constructor(private http: HttpClient) {
    this.displaySingleImage = false;
    this.displayMultipleImageArray = [];
    this.displayMultipleImages = false;
    this.displaySingleImageArray = [];
  }
  //Chọn 1 file
  // selectImage(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     console.log(file);
  //     this.images = file;
  //   }
  // }

  // onSubmit() {
  // construct formdata

  // const formdata = new FormData();

  // formdata.append("file", this.images);

  // post request to express backend

  // this.http.post<any>("http://localhost:3000/", formdata).subscribe(
  //   (res) => {
  //     console.log(res);
  //     this.singleInput.nativeElement.value = "";
  //     this.displaySingleImage = true;
  //     this.displaySingleImageArray.push(res.path);
  //   },
  //   (err) => {
  //     console.log(err);
  //   }
  // );
  // }

  selectMultipleImage(event: any) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onMultipleSubmit() {
    const formdata = new FormData();

    for (let img of this.multipleImages) {
      formdata.append("files", img);
    }

    this.http
      .post<any>("http://localhost:3000/uploadimages", formdata)
      .subscribe((res) => {
        console.log(res);
        this.multipleInput.nativeElement.value = "";
        //Màn hình nhiều ảnh
        this.displayMultipleImages = true;
        this.displayMultipleImageArray = res.path;
        // this.image = res.path;
        const data = res.path;
        this.image = data;
        this.form.patchValue({ [this.name]: data });
        console.log(data);
      });
  }

  ngOnInit(): void {}
}
