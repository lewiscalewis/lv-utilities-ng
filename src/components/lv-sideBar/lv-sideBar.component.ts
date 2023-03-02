import { Component, Input, OnInit } from '@angular/core';
import { Position } from 'src/constants/lv-constans';
import { LvSideBarLinks } from 'src/interfaces/lv-sideBar/lv-sideBar-links.inteface';

@Component({
  selector: 'app-lv-sideBar',
  templateUrl: './lv-sideBar.component.html',
  styleUrls: ['./lv-sideBar.component.scss']
})
export class LvSideBarComponent implements OnInit {

    /**Debe cumplir la interfaz LvSideBarLinks, serán los botones de enlace que se mostraran*/
    @Input() links!: LvSideBarLinks[];
    @Input() close!: boolean;
    @Input() position!: Position;

    posLeft: Position = Position.LEFT;
    posRight: Position = Position.RIGHT;
    posBottom: Position = Position.BOTTOM;

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
