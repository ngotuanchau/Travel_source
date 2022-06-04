import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DiaDiemsIndexComponent } from './index/index.component';
import { DiaDiemsCreateComponent } from './create/create.component';
import { DiaDiemsDetailComponent } from './detail/detail.component';
import { DiaDiemsEditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    DiaDiemsIndexComponent,
    DiaDiemsCreateComponent,
    DiaDiemsDetailComponent,
    DiaDiemsEditComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class DiaDiemsModule { }
