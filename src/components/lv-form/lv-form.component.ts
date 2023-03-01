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
    @Input() definition!: LvFormDefinition;

    @Output() getForm: EventEmitter<FormGroup> = new EventEmitter();

    form: FormGroup;
    flagIsInvalid: boolean = true;
    errors: any[] = [];

    constructor(private http: HttpClient, private modalService: LvModalService, private viewRef: ViewContainerRef) {
        this.form = new FormGroup({});
    }

    //TODO: AÑADIR VALIDAR AL DARLE A GUARDAR, ROJO -> ERRORES, VERDER -> CORRECTO
    onSubmit() {
        this.http.post(this.definition.url, this.form.value, HTTP_OPTIONS).subscribe({
            next: (data) => {
                this.modalService.showModal(ModalType.SUCCESS, 'Información sobre la operación', 'Se ha enviado su formulario', this.viewRef).getUserResponse().subscribe(res => location.reload());
            },
            error: (err) => {
                let response: HttpErrorResponse | string = new HttpErrorResponse(err)
                let errorText = '';
                if(response.error.errors){
                    for (let message in response.error.errors) {
                        errorText += `${response.error.errors[message]}\n`;
                    }
                    this.modalService.showModal(ModalType.ERROR, 'Error', errorText, this.viewRef);
                }else{
                    this.modalService.showModal(ModalType.ERROR, 'Error', 'Ha ocurrido un error, no se han podido envíar los datos', this.viewRef);
                }
            }
        });
    }

    ngOnInit() {
        if (this.definition) {
            this.definition.fields.forEach(field => {
                this.form.addControl(field.formControlName,
                    field.control);
            });
            this.getForm.emit(this.form);
            this.form.valueChanges.subscribe((changes) => {
                let formIsValid = true;
                this.definition.fields.forEach(field => {
                    let control = this.form.get(field.formControlName);
                    let controlError = control?.errors;
                    if (control?.errors) {
                        formIsValid = false;
                        this.errors[this.definition.fields.indexOf(field)] = {
                            error: controlError,
                            show: this.form.dirty ? true : false
                        };
                    } else {
                        this.errors[this.definition.fields.indexOf(field)] = {
                            error: '',
                            show: this.form.dirty ? true : false
                        };
                    }
                });
                if (!this.form.touched && !this.form.dirty || !formIsValid) {
                    this.flagIsInvalid = true;
                } else {
                    this.flagIsInvalid = false;
                }
            });
        }
    }

    reset() {
        this.form.reset();
    }

}
