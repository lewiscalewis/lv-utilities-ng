import { AfterViewChecked, Component, ElementRef, Input, OnInit } from '@angular/core';
import { trigger, transition, style, animate, AnimationBuilder, query, animateChild, group, keyframes, NoopAnimationPlayer } from '@angular/animations';
import { ILvSlide } from '../../interfaces/lv-carrousel-interfaces/lv-slide.interface';

@Component({
    selector: 'app-lv-carrousel',
    templateUrl: './lv-carrousel.component.html',
    styleUrls: ['./lv-carrousel.component.scss'],
    animations: [
        trigger('slideAnimation', [
            transition(':increment, :decrement', [
              style({ position: 'relative' }),
              query(':enter, :leave', [
                style({
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%'
                })
              ]),
              query(':enter', [
                style({
                  left: '100%',
                  transform: 'translateX(-100%)'
                })
              ]),
              query(':leave', animateChild(), { optional: true }),
              group([
                query(':leave', [
                  animate('500ms ease-in-out', keyframes([
                    style({
                      transform: 'translateX(0)',
                      offset: 0
                    }),
                    style({
                      transform: 'translateX(100%)',
                      offset: 1
                    })
                  ]))
                ], { optional: true }),
                query(':enter', [
                  animate('500ms ease-in-out', keyframes([
                    style({
                      transform: 'translateX(-100%)',
                      offset: 0
                    }),
                    style({
                      transform: 'translateX(0)',
                      offset: 1
                    })
                  ]))
                ])
              ]),
              query(':enter', animateChild())
            ])
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
    theme: string = 'light-theme';

    constructor(private animationBuilder: AnimationBuilder, private el: ElementRef) { }
    ngAfterViewChecked(): void {
        this.selector = '';
        this.selectorBoton = this.colorBotones.length !== 0 ? 'background-color: ' + this.colorBotones[0] + '; ' + 'color: ' + this.colorBotones[1] : 'background-color: white; color: black;';
        this.theme = this.el.nativeElement.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    }

    ngOnInit() {
        
    }

    anterior() {
        const prevIndex = this.currentIndex;
        const prevImg = document.getElementById('slide');
        const prevAnimation = this.animationBuilder.build([
          style({ transform: 'translateX(0)' }),
          animate('600ms ease-in-out', style({ transform: 'translateX(200%)' }))
        ]);
        const prevPlayer = prevAnimation.create(prevImg);
        
        prevPlayer.onDone(() => {
          this.currentIndex = (this.currentIndex === 0) ? this.slides.length - 1 : this.currentIndex - 1;
          const currImg = document.getElementById('slide');
          const currAnimation = this.animationBuilder.build([
            style({ transform: 'translateX(-200%)' }),
            animate('600ms ease-in-out', style({ transform: 'translateX(0)' }))
          ]);
          const currPlayer = currAnimation.create(currImg);
          currPlayer.play();
        });
        
        prevPlayer.play();
      }
      
      
      
      siguiente() {
        const prevIndex = this.currentIndex;
        const prevImg = document.getElementById('slide');
        const prevAnimation = this.animationBuilder.build([
          style({ transform: 'translateX(0)' }),
          animate('600ms ease-in-out', style({ transform: 'translateX(-200%)' }))
        ]);
        const prevPlayer = prevAnimation.create(prevImg);
        
        prevPlayer.onDone(() => {
          this.currentIndex = (this.currentIndex === this.slides?.length - 1) ? 0 : this.currentIndex + 1;
          const currImg = document.getElementById('slide');
          const currAnimation = this.animationBuilder.build([
            style({ transform: 'translateX(200%)' }),
            animate('600ms ease-in-out', style({ transform: 'translateX(0)' }))
          ]);
          const currPlayer = currAnimation.create(currImg);
          currPlayer.play();
        });
        
        prevPlayer.play();
      }
      
      
      

}
