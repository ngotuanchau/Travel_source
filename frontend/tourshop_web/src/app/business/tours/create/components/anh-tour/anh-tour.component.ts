import { HttpClient } from "@angular/common/http";
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormAnh } from "./anh";
@Component({
  selector: "app-anh-tour",
  templateUrl: "./anh-tour.component.html",
  styleUrls: ["./anh-tour.component.scss"],
})
export class AnhTourComponent implements OnInit {
  @Input() formha: FormGroup;
  @Input() imageMain: any;

  @Output()
  onselects: EventEmitter<any> = new EventEmitter<any>();
  displaySingleImage!: Boolean;
  displayMultipleImages!: Boolean;
  displayMultipleImageArray!: Array<any>;
  displaySingleImageArray!: Array<any>;
  @ViewChild("singleInput", { static: false })
  singleInput!: ElementRef;
  @ViewChild("multipleInput", { static: false })
  multipleInput!: ElementRef;
  selectedFiles?: FileList;
  form: FormGroup;
  forms: FormGroup;
  isSuccess = false;
  multipleImages = [];
  constructor(private http: HttpClient) {
    this.displaySingleImage = false;
    this.displayMultipleImageArray = [];
    this.displayMultipleImages = false;
    this.displaySingleImageArray = [];
  }

  // Chọn 1 file
  selectMainImage(event: any) {
    if (event.target.files.length > 0) {
      this.formha.patchValue({
        [this.imageMain]: event.target.files,
      });
      console.log(
        "ảnh đại diện: " + this.formha?.controls?.[this.imageMain]?.value
      );
    }
  }

  //ẢNH CHI TIẾT TOUR
  get lstAnh() {
    return this.forms?.controls?.[FormAnh.anhs]?.value || null;
  }
  set lstAnh(data) {
    this.forms.patchValue({
      [FormAnh.anhs]: data,
    });
  }

  //Chọn nhiều ảnh
  selectMultipleImage(event: any) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
      this.onselects.emit(this.multipleImages);
    }
    console.log("Ảnh chi tiết: " + this.multipleImages);
  }

  ngOnInit(): void {}
}
