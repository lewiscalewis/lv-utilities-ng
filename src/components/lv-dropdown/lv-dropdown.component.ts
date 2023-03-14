import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LvSideBarLinks } from 'src/interfaces/lv-sideBar/lv-sideBar-links.inteface';

@Component({
    selector: 'app-lv-dropdown',
    templateUrl: './lv-dropdown.component.html',
    styleUrls: ['./lv-dropdown.component.scss']
})
export class LvDropdownComponent implements OnInit, AfterViewInit {

    constructor() { }

    /**Debe cumplir la interfaz LvSideBarLinks, serán los botones de enlace que se mostraran*/
    @Input() links!: LvSideBarLinks[];
    @Input() public id!: number;
    @Output() drowpDownInstance: EventEmitter<LvDropdownComponent> = new EventEmitter();
    @ViewChild('dropdown') dropdown!: ElementRef;

    close: boolean = false;

    ngOnInit() {
        
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.drowpDownInstance.emit(this);
        });
    }

    redirect(url: string) {
        window.open(url);
    }

    openClose(event: Event) {
        console.log(this.dropdown)
        if (this.close) {
            this.close = false;
        } else {
            this.close = true;
        }
    }
}
