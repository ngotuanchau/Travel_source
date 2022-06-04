import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ToursIndexComponent } from './index/index.component';
import { ToursCreateComponent } from './create/create.component';
import { ToursEditComponent } from './edit/edit.component';
import { ToursDetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { LichTrinhsIndexComponent } from '../lichtrinhs/index/index.component';


@NgModule({
  declarations: [
    ToursIndexComponent,
    ToursCreateComponent,
    ToursEditComponent,
    ToursDetailComponent,
    LichTrinhsIndexComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class ToursModule { }
