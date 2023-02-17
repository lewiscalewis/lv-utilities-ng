import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { trigger, transition, style, animate, AnimationBuilder } from '@angular/animations';
import { ILvSlide } from 'src/interfaces/lv-carrousel-interfaces/lv-slide.interface';

@Component({
    selector: 'app-lv-carrousel',
    templateUrl: './lv-carrousel.component.html',
    styleUrls: ['./lv-carrousel.component.scss'],
    animations: [
        trigger('slideAnimation', [
            // Transición de entrada para el estado previous
            transition(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('500ms ease-in-out', style({ transform: 'translateX(0)' }))
            ]),
            // Transición de entrada para el estado next
            transition(':leave', [
                style({ transform: 'translateX(100%)' }),
                animate('500ms ease-in-out', style({ transform: 'translateX(0)' }))
            ]),
        ])
    ]
})
export class LvCarrouselComponent implements OnInit, AfterViewChecked {

    /**
     * Debe implementar la interfaz ILvSlide: [{nombre: 'nombre', descripcion: 'descripcion', src='url/de/tu/imagen' (usar ruta relativa: assets/../miimagen.jpg), srcSet(campo opcional):'srcset'}]
     */
    @Input() slides: ILvSlide[] = [];
    /**
     * Color que quiere aplicar en el carrusel, se expresa igual que en css: red,blue...
     */
    @Input() color: string = '';
    public selector: string = '';
    /**
     * Array con el color de fondo del botón y color de la letra
     */
    @Input() colorBotones: string[] = [];
    public selectorBoton: string  = '';
    public currentIndex: number = 0;

    constructor(private animationBuilder: AnimationBuilder) { }
    ngAfterViewChecked(): void {
        this.selector = 'background-color: ' + this.color + ';' + 'border: 3px solid ' + this.color;
        this.selectorBoton = this.colorBotones.length !== 0 ? 'background-color: ' + this.colorBotones[0] + '; ' + 'color: ' + this.colorBotones[1] : 'background-color: white; color: black;';
    }

    ngOnInit() {
        
    }

    anterior() {
        this.currentIndex = (this.currentIndex === 0) ? this.slides.length - 1 : this.currentIndex - 1;
        const animation = this.animationBuilder.build([
            style({ transform: 'translateX(-100%)' }),
            animate('500ms ease-in-out', style({ transform: 'translateX(0)' }))
        ]);

        const player = animation.create(document.getElementById('slide'));
        player.play();
    }

    siguiente() {
        this.currentIndex = (this.currentIndex === this.slides?.length - 1) ? 0 : this.currentIndex + 1;
        const animation = this.animationBuilder.build([
            style({ transform: 'translateX(100%)' }),
            animate('500ms ease-in-out', style({ transform: 'translateX(0)' }))
        ]);

        const player = animation.create(document.getElementById('slide'));
        player.play();
    }

}
