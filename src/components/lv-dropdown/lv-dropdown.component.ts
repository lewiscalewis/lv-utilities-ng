import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LvSideBarLinks } from 'src/interfaces/lv-sideBar/lv-sideBar-links.inteface';

@Component({
    selector: 'app-lv-dropdown',
    templateUrl: './lv-dropdown.component.html',
    styleUrls: ['./lv-dropdown.component.scss']
})
export class LvDropdownComponent implements OnInit, AfterViewInit {

    constructor(private elementRef: ElementRef) { }

    /**Debe cumplir la interfaz LvSideBarLinks, serán los botones de enlace que se mostraran*/
    @Input() links!: LvSideBarLinks[];
    @Input() public id!: number;
    @Input() marginLeftDropdown: number = 0;
    @Input() display: boolean = true;
    @Output() drowpDownInstance: EventEmitter<LvDropdownComponent> = new EventEmitter();

    open: boolean = false;

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

    openClose(event: MouseEvent) {
        if (this.open) {
            this.open = false;
        } else {
            this.open = true;
        }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        const clickedInside = this.elementRef.nativeElement.contains(event.target);
        if (!clickedInside) {
            this.open = false;
        }
    }
}
