import { Component, Input, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToursService } from "../../../../../service/tours.service";
import { FormField } from "../../model";
import { HttpClient } from "@angular/common/http";
import { NgToastService } from "ng-angular-popup";
@Component({
  selector: "app-thong-tin-ve",
  templateUrl: "./thong-tin-ve.component.html",
  styleUrls: ["./thong-tin-ve.component.scss"],
})
export class ThongTinVeComponent implements OnInit {
  @Input() tour: any;
  @Input() tongVe: any;
  @Input() nglon: number;
  @Input() trem: number;
  @Input() trnho: number;
  @Input() ngay: any;
  @Input() ngayKHs: any;
  @Input() idUser: any;
  gianl: any;
  giatrem: any;
  giatrnho: any;
  pipe = new DatePipe("en-US");
  form: FormGroup;
  tongtien: number;
  readonly FormField = FormField;
  constructor(
    private tourService: ToursService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toast: NgToastService
  ) {
    this.form = this.formBuilder.group({
      [FormField.nguoidungid]: [null, [Validators.required]],
      [FormField.tourid]: [null, [Validators.required]],
      [FormField.sovenguoilon]: [1, [Validators.required]],
      [FormField.sovetreem]: [0],
      [FormField.sovetrenho]: [0],
      [FormField.thoigianid]: [null, [Validators.required]],
      [FormField.tongtien]: [0, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.gianl = this.ngayKHs.find(
      (item: any) => item.id == this.ngay
    )?.giaNguoiLon;
    this.giatrem = this.ngayKHs.find(
      (item: any) => item.id == this.ngay
    )?.giaTreEn;
    this.giatrnho = this.ngayKHs.find(
      (item: any) => item.id == this.ngay
    )?.giaTreNho;
    this.idUser = localStorage.getItem("id");
  }
  findDateDisplay(id: number) {
    return this.pipe.transform(
      this.ngayKHs.find((item: any) => item.id == id)?.ngayKh,
      "dd/MM/yyyy"
    );
  }
  multi(a: number, b: number) {
    return a * b;
  }
  plus(a: number, b: number, c: number) {
    return a + b + c;
  }
  onSubmit() {
    this.tongtien = this.plus(
      this.multi(this.nglon, this.gianl),
      this.multi(this.trem, this.giatrem),
      this.multi(this.trnho, this.giatrnho)
    );
    this.form.patchValue({ [FormField.nguoidungid]: parseInt(this.idUser) });
    this.form.patchValue({ [FormField.tourid]: parseInt(this.tour.id) });
    this.form.patchValue({ [FormField.thoigianid]: parseInt(this.ngay) });
    this.form.patchValue({ [FormField.sovenguoilon]: this.nglon });
    this.form.patchValue({ [FormField.sovetreem]: this.trem });
    this.form.patchValue({ [FormField.sovetrenho]: this.trnho });
    this.form.patchValue({ [FormField.tongtien]: this.tongtien });
    console.log(this.tongtien);
    this.tourService.bookTour(this.form.value).subscribe((response) => {
      if (response != null) {
        this.toast.success({
          detail: "Thông báo",
          summary: "Đặt tour thành công",
          duration: 3000,
        });
      } else {
        this.toast.success({
          detail: "Cảnh báo",
          summary: "Đặt tour thất bại",
          duration: 3000,
        });
      }
    });
    // this.form.patchValue({ [FormField.tongtien]: this.trnho });
  }
  formatCurrency(money: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
}
