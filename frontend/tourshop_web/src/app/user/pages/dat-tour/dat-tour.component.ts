import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dat-tour',
  templateUrl: './dat-tour.component.html',
  styleUrls: ['./dat-tour.component.scss']
})
export class DatTourComponent implements OnInit {
nglon:number=0;
trem:number=0;
trnho:number=0;
  constructor() { }

  ngOnInit(): void {
  }
  trunglon(){
    if(this.nglon>0){
      this.nglon--;
    }
  }
  congnglon(){
    this.nglon++;
  }
  trutrem(){
    if(this.trem>0){
      this.trem--;
    }
  }
  congtrem(){
    this.trem++;
  }
  trutrnho(){
    if(this.trnho>0){
      this.trnho--;
    }
  }
  congtrnho(){
    this.trnho++;
  }
}
