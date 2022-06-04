import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CongTysIndexComponent } from './index/index.component';
import { CongTysCreateComponent } from './create/create.component';
import { CongTysEditComponent } from './edit/edit.component';
import { CongTysDetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CongTysIndexComponent,
    CongTysCreateComponent,
    CongTysEditComponent,
    CongTysDetailComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class CongTysModule { }
