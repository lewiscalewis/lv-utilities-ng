import { AfterViewInit, Component, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ModalType, Position } from 'src/constants/lv-constans';
import { LvFormDefinition } from 'src/interfaces/lv-form/lv-form.interface';
import { LvSideBarLinks } from 'src/interfaces/lv-sideBar/lv-sideBar-links.inteface';
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

        ]
    }
    colorTabla: string[] = ['darkcyan', 'white', 'darkcyan', 'white'];
    colorHeaderTabla: string[] = ['black', 'white']
    //url = 'https://randomuser.me/api/?results=2000'
    //url = 'https://jsonplaceholder.typicode.com/users'
    url = 'https://localhost:7176/api/entities';

    idControl = new FormControl('', [this.customLengthValidator]);
    descControl = new FormControl();

    formDef: LvFormDefinition = {
        fields: [
            { label: 'ID', control: this.idControl, inputType: 'number', formControlName: 'id', id: 'example' },
            { label: 'NOMBRE', control: new FormControl(), inputType: 'text', formControlName: 'nombre' },
            { label: 'DESCRIPCION', control: this.descControl, inputType: 'text', formControlName: 'descripcion' },
            { label: 'FECHA REGISTRO', control: new FormControl(), inputType: 'date', formControlName: 'fecha' },
            { label: 'SID', control: new FormControl(), inputType: 'number', formControlName: 'sid', id: 'example' },
            { label: 'ESTADO', control: new FormControl(), inputType: 'text', formControlName: 'estado', },
            { label: 'DOCUMENTOS', control: new FormControl(), inputType: 'file', formControlName: 'documento' },
            { label: 'FECHA EXPIRACION', control: new FormControl(), inputType: 'date', formControlName: 'expira' },
        ],
        showResetButton: true,
        url: 'https://localhost:7176/api/entity',
        name: 'mi mega form'
    };

    links: LvSideBarLinks[] = [
        { description: 'example1', url: '' },
        { description: 'example2', url: '' },
        { description: 'example3', url: '' },
        { description: 'example4', url: '' },
        { description: 'example5', url: '' }
    ];

    isClosed = true;

    position = Position.LEFT;

    setClose(){
        if(this.isClosed){
            this.isClosed = false;
        }else{
            this.isClosed = true;
        }
    }

    customLengthValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value as string;

        if (value.length < 5 || value.length > 10) {
            return { customError: `La longitud debe estar entre 5 y 10 caracteres (actualmente: ${value.length})` };
        }

        return null;
    }

    getForm(form: FormGroup) {
        console.log(form)
        let inputElement = document.getElementById('example') as HTMLInputElement;
        inputElement.addEventListener('blur', () => {
            console.log('Control lost focus');
        });
    }

    setDefinition(data: any) {
        console.log(data)
        this.definition = data;
    }

    constructor() {

    }
    ngAfterViewInit(): void {

    }

    ngOnInit(): void {

    }
}
