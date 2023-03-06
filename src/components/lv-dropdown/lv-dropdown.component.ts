import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LvSideBarLinks } from 'src/interfaces/lv-sideBar/lv-sideBar-links.inteface';

@Component({
  selector: 'app-lv-dropdown',
  templateUrl: './lv-dropdown.component.html',
  styleUrls: ['./lv-dropdown.component.scss']
})
export class LvDropdownComponent implements OnInit {

  constructor() { }

  /**Debe cumplir la interfaz LvSideBarLinks, serán los botones de enlace que se mostraran*/
  @Input() links!: LvSideBarLinks[];
  close: boolean = false;

  ngOnInit() {
  }

  redirect(url: string){
    window.open(url);
  }

  openClose(){
    if(this.close){
        this.close = false;
    }else{
        this.close = true;
    }
  }

}
