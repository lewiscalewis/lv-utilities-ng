import { Component } from '@angular/core';
import { ILvTableDefinition } from 'src/interfaces/lv-table-interfaces/lv-table-definition.interface';
import { LvSlide } from 'src/models/lv-carrousel-models/lv-slide.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'lv-utilities-ng';
    slides: LvSlide[] = [
        { nombre: 'example 1', descripcion: 'example 1', src: 'assets/slides-samples/example1.jpg' },
        { nombre: 'example 2', descripcion: 'example 2', src: 'assets/slides-samples/example2.png' },
        { nombre: 'example 3', descripcion: 'example 3', src: 'assets/slides-samples/example3.jpg' }
    ]
    color = 'darkblue';
    colorBotones: string[] = ['red', 'yellow'];
    definition: ILvTableDefinition = {
        header: ['ypx', 'ypx', 'ypv', 'ypb'],
        fields: ['yp', 'ypt', 'ypr', 'ypr', 'yp', 'ypt', 'ypr', 'ypr']
    }
    colorTabla: string[] = ['cyan', 'white', 'darkcyan', 'white'];
    colorHeaderTabla: string[] = ['darkblue', 'white']
}
