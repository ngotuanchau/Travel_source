import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NguoiDungsIndexComponent } from './index/index.component';
import { NguoiDungsCreateComponent } from './create/create.component';
import { NguoiDungsEditComponent } from './edit/edit.component';
import { NguoiDungsDetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NguoiDungsIndexComponent,
    NguoiDungsCreateComponent,
    NguoiDungsEditComponent,
    NguoiDungsDetailComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class NguoiDungsModule { }
