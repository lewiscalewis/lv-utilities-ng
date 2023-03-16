import { Directive } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[lv-dark]'
})
export class LvDarkThemeDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { 
    this.renderer.addClass(this.el.nativeElement, "dark-theme");
  }

}
