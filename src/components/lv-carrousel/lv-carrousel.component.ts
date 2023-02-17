import { Component, Input, OnInit } from '@angular/core';
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
export class LvCarrouselComponent implements OnInit {

    @Input() slides: ILvSlide[] = [];
    public currentIndex: number = 0;

    constructor(private animationBuilder: AnimationBuilder) { }

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
