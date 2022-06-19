import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-anh-tour",
  templateUrl: "./anh-tour.component.html",
  styleUrls: ["./anh-tour.component.scss"],
})
export class AnhTourComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;

  constructor() {}

  ngOnInit(): void {}
  url = "";
  fileName = "";
  selectedImage(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        const data = event.target.result;
        this.url = data;
      };
    }
    const file: File = e.target.files[0];
    const data = file.name;
    this.fileName = data;
    this.form.patchValue({ [this.name]: data });
    console.log(data);
  }
  selectFile(event: any) {
    // if (event.target.file) {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(event.target.file[0]);
    //   reader.onload = (event: any) => {
    //     this.url = event.target.result;
    //   };
    //   console.log(this.url);
    // }
    // const file: File = event.target.files[0];
    // const data = file.name;
    // this.fileName = data;
    // this.form.patchValue({ [this.name]: data });
    // console.log(data);
  }
}
