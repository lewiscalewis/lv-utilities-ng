import { Component, Input, OnInit } from '@angular/core';
import { LvSideBarLinks } from 'src/interfaces/lv-sideBar/lv-sideBar-links.inteface';

@Component({
  selector: 'app-lv-sideBar',
  templateUrl: './lv-sideBar.component.html',
  styleUrls: ['./lv-sideBar.component.scss']
})
export class LvSideBarComponent implements OnInit {

    @Input() links!: LvSideBarLinks[];
    @Input() actions!: LvSideBarLinks[];
    @Input() close!: boolean;

  constructor() { }

  ngOnInit() {
  }

  closeState(){
    if(this.close){
        this.close = false;
    }else{
        this.close = true;
    }
  }

}
