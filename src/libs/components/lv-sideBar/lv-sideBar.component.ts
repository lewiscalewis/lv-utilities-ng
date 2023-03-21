import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    @Output() isClosed: EventEmitter<boolean> = new EventEmitter();

    posLeft: Position = Position.LEFT;
    posRight: Position = Position.RIGHT;
    posBottom: Position = Position.BOTTOM;

    constructor(private router: Router) { }

    ngOnInit() {
    }

    closeState() {
        if (this.close) {
            this.close = false;
            this.isClosed.emit(this.close);
        } else {
            this.close = true;
            this.isClosed.emit(this.close);
        }
    }

    redirect(url: string) {
        window.open(url);
    }

}
