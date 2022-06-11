import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourDeXuatComponent } from './tour-de-xuat/tour-de-xuat.component';
import { ToursCreateComponent } from './tours/create/create.component';
import { ToursDetailComponent } from './tours/detail/detail.component';
import { ToursEditComponent } from './tours/edit/edit.component';
import { ToursIndexComponent } from './tours/index/index.component';

const routes: Routes = [
  {
    path:'', redirectTo:'ql-tours',pathMatch:'full'
  },

  //Tour
  {
    path:'ql-tours',component:ToursIndexComponent
  },
  {
    path:'ql-tours/create',component:ToursCreateComponent,
  },
  {
    path:'ql-tours/update',component:ToursEditComponent,
  },
  {
    path:'ql-tours/detail',component:ToursDetailComponent,
  },
  //Đề xuất Tour
  {
    path:'dx-tours',component:TourDeXuatComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
