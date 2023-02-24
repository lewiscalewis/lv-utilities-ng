import { AfterViewInit, Component, OnInit, ViewContainerRef } from '@angular/core';
import { Form, FormGroup, Validators } from '@angular/forms';
import { ModalType } from 'src/constants/lv-constans';
import { LvFormDefinition } from 'src/interfaces/lv-form/lv-form.interface';
import { ILvTableDefinition } from 'src/interfaces/lv-table-interfaces/lv-table-definition.interface';
import { LvSlide } from 'src/models/lv-carrousel-models/lv-slide.model';
import { LvModalService } from 'src/services/lv-modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'lv-utilities-ng';
    slides: LvSlide[] = [
        { nombre: 'example 1', descripcion: 'example 1', src: 'assets/slides-samples/example1.jpg' },
        { nombre: 'example 2', descripcion: 'example 2', src: 'assets/slides-samples/example2.png' },
        { nombre: 'example 3', descripcion: 'example 3', src: 'assets/slides-samples/example3.jpg' }
    ]
    color = 'darkcyan';
    colorBotones: string[] = ['red', 'yellow'];
    definition: ILvTableDefinition = {
        header: ['id', 'pelotudo1', 'pelotudo2', 'pelotudo3', 'pelotudo4', 'pelotudo5', 'fecha'],
        rows: [
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [5, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [5, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [5, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [5, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [0, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],
            [5, 'levi', 'iker', 'elias', 'jesus', 'aaron', new Date()],

        ]
    }
    colorTabla: string[] = ['darkcyan', 'white', 'darkcyan', 'white'];
    colorHeaderTabla: string[] = ['black', 'white']
    //url = 'https://randomuser.me/api/?results=2000'
    //url = 'https://jsonplaceholder.typicode.com/users'
    url = 'https://localhost:7176/api/entities';

    formDef: LvFormDefinition = {
        fields: [
            { label: 'ID', inputType: 'number', formControlName: 'id', id: 'example', validators: [Validators.required] },
            { label: 'NOMBRE', inputType: 'text', formControlName: 'nombre', validators: [Validators.required] },
            { label: 'DESCRIPCION', inputType: 'text', formControlName: 'descripcion', validators: [Validators.required] },
            { label: 'FECHA REGISTRO', inputType: 'date', formControlName: 'fecha', validators: [Validators.required] },
        ],
        showResetButton: true,
        url: 'https://localhost:7176/api/entities',
        name: 'mi mega form'
    };

    getForm(form: FormGroup) {
        console.log(form)
        let inputElement = document.getElementById('example') as HTMLInputElement;
        inputElement.addEventListener('blur', () => {
            console.log('Control lost focus');
        });
    }

    setDefinition(data: any) {
        console.log('definition updated')
    }

    constructor() {

    }
    ngAfterViewInit(): void {

    }

    ngOnInit(): void {

    }
}
