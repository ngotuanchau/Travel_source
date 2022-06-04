import { Component } from '@angular/core';
import {NguoiDungs, Employee} from '../nguoidungs-data';
import {NgbNavChangeEvent} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-nguoidungs',
    templateUrl: 'index.component.html'
})
export class NguoiDungsIndexComponent {

  trow:NguoiDungs[];

  constructor() {


    this.trow=Employee;
  }
  //Nav
  currentJustify = 'start';

  active=1;
  activev= "top";

  activeKeep=1;

  activeSelected=1;
  disabled = true;


  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;
  activeDynamic=1;

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.activeSelected = 1;
    }
  }


  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter(id => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.tabs.push(this.counter++);
    event.preventDefault();
  }
}
