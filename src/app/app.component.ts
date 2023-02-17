import { Component } from '@angular/core';
import { LvSlide } from 'src/models/lv-carrousel-models/lv-slide.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'lv-utilities-ng';
    slides: LvSlide[] = [
        { nombre: 'pepe', descripcion: 'el pepe', src: 'assets/descargar.png' },
        { nombre: 'pepe', descripcion: 'el pepe', src: 'assets/1366_2000.jpg' },
        { nombre: 'pepe', descripcion: 'el pepe', src: 'assets/descargar.jpg' }
    ]
}
