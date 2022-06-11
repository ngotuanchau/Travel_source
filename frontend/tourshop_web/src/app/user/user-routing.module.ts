import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatTourComponent } from './pages/dat-tour/dat-tour.component';
import { TourDetailComponent } from './pages/tour-detail/tour-detail.component';
import { TrangchuComponent } from './trangchu/trangchu.component';

const routes: Routes = [
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  {
    path:'home',
    component:TrangchuComponent
  },
  {
    path:'detail',
    component:TourDetailComponent
  },
  {
    path:'booking',
    component:DatTourComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
