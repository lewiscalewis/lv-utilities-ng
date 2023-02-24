import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HTTP_OPTIONS, ModalType } from 'src/constants/lv-constans';
import { LvFormDefinition } from 'src/interfaces/lv-form/lv-form.interface';
import { LvModalService } from 'src/services/lv-modal.service';

@Component({
    selector: 'app-lv-form',
    templateUrl: './lv-form.component.html',
    styleUrls: ['./lv-form.component.scss']
})
export class LvFormComponent implements OnInit {

    /**
     * Definición que ha de cumplir con los requerimientos de la interfaz LvFormDefinition: {
     * field: [{ label: 'example', inputType: 'text', formControlName: 'example' }],
     * showResetButton: boolean,
     * url: 'https://miapi.com/donde/envies/el/formulario',
     * name: 'Nombre del formulario que se mostrara encapsulado'
     * }
     */
    @Input() definition: LvFormDefinition = {
        fields: [{ label: 'example', inputType: 'text', formControlName: 'example' }],
        showResetButton: false,
        url: ''
    };

    @Output() getForm: EventEmitter<FormGroup> = new EventEmitter();

    form: FormGroup;

    constructor(private http: HttpClient, private modalService: LvModalService, private viewRef: ViewContainerRef) {
        this.form = new FormGroup({});
        this.definition.fields.forEach(field => {
            this.form.addControl(field.formControlName, new FormControl());
        });
    }

    onSubmit() {
        this.http.post(this.definition.url, this.form.value, HTTP_OPTIONS).subscribe({
            next: (data) => {
                this.modalService.showModal(ModalType.SUCCESS, 'Información sobre la operación', 'Se ha enviado su formulario', this.viewRef);
            },
            error: (err) => {
                this.modalService.showModal(ModalType.ERROR, 'Error', 'No se ha encontrado la url proporcionada o bien los datos no son correctos', this.viewRef);
            }
        });
    }

    ngOnInit() {
        //esperamos un ciclo de Angular por si acaso
        setTimeout(() => {
            this.getForm.emit(this.form);
        });
    }

    reset() {
        this.form.reset();
    }

}
