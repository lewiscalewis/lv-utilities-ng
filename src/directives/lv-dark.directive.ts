import { Directive, Input, OnInit } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[lv-dark]'
})
export class LvDarkThemeDirective implements OnInit {

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, "dark-theme");
    }

}
