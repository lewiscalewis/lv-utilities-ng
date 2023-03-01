import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { ILvTableDefinition } from 'src/interfaces/lv-table-interfaces/lv-table-definition.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HTTP_OPTIONS, ModalType, RequestType, States } from 'src/constants/lv-constans';
import { LvObjectReader } from 'src/middleware/lv-object-reader.middleware';
import { Router } from '@angular/router';
import { firstValueFrom, NotFoundError } from 'rxjs';
import { LvModalService } from 'src/services/lv-modal.service';



@Component({
    selector: 'app-lv-data-table',
    templateUrl: './lv-data-table.component.html',
    styleUrls: ['./lv-data-table.component.scss'],
})
export class LvDataTableComponent implements OnInit, AfterViewInit {

    /**
     * Url de la que quiere sacar la información para pintar la tabla
     */
    @Input() url: string = '';
    /**
     * El objeto que quieres enviar para hacer el Post o Put
     */
    @Input() data: string = '';
    /**
     * Definicion de la tabla debe cumplir la definicion de la interfaz ILvTableDefinition, campo opcional
     * por si se desea setear los datos de forma local y manuel en lugar de por petición
     */
    @Input() definition?: ILvTableDefinition;
    /**
     * Objeto de tupo RequestType para definir el tipo de petición: get o post, por defecto si no se rellena: GET
     */
    @Input() requestType: RequestType = RequestType.GET;
    @Input() rowColor: string[] = [];
    @Input() headerColor: string[] = [];
    @Input() readOnly: boolean = false;
    @Input() detailUrl: string = '';
    @Output() updatedDataTable: EventEmitter<any[][]> = new EventEmitter();

    headers: string[] = [];
    fields: string = '';
    rows: string[][] = [];
    httpData: any[] = [];
    tmpField: any;
    field: any;
    modifiedData: any[] = [];
    currentPage: number = 1;
    totalPages: number = 0;
    pageRows: any = [];
    flagFirstExecution: boolean = true;
    flagDeleteUpdate: boolean = false;
    flagReduceOrExpandShow: boolean = false;
    isDirty: boolean = false;
    newRow: boolean = false;
    newRowObject: any = [];
    newRowCleanObject: any[] = [];
    valueTypes: string[] = [];
    newRows: any[] = [];
    rowChanges: any[] = [];
    newRowChanges: any[] = [];
    private rowId = 0;

    constructor(
        private http: HttpClient, 
        private router: Router, 
        private viewRef: ViewContainerRef, 
        private modalService: LvModalService,
        private cdRef: ChangeDetectorRef) { }

    ngAfterViewInit(): void {
        if (this.definition !== undefined) {
            if (!this.flagDeleteUpdate) {
                this.rows = this.definition.rows;
            }
            this.headers = this.definition.header;
            this.formatDataTable();
        } else {
            if (this.flagFirstExecution) {
                this.http.get(this.url + '/totalpages').subscribe({
                    next: (data) => {
                        if (!!data) {
                            let res: any = data;
                            this.totalPages = res;
                            this.flagFirstExecution = false;
                        }
                    },
                    error: (err) => {
                        this.modalService.showModal(ModalType.ERROR, 'Error', 'No se ha encontrado la url proporcionada o bien los datos no son correctos', this.viewRef);
                    }
                });
            }
            this.requestPage();
            //this.getHttpData();
        }
        if (this.rows) {
            this.getCurrentPage();
        }
    }

    //TODO: añadir compatibilidad odata, insertar, si se ingresan datos desde el definition, devolver el array modificado tras darle a guardar;


    ngOnInit(): void {

    }

    getFieldType(value: any): string | void {
        if (typeof value === 'number') {
            if (this.valueTypes.length < this.headers.length) {
                this.valueTypes.push('number')
            }
            return 'number';
        } else if (this.isDateValid(value) || (value instanceof Date)) {
            if (this.valueTypes.length < this.headers.length) {
                this.valueTypes.push('date')
            }
            return 'date';
        } else if (this.isEmailValid(value)) {
            if (this.valueTypes.length < this.headers.length) {
                this.valueTypes.push('email')
            }
            return 'email';
        } else {
            if (this.valueTypes.length < this.headers.length) {
                this.valueTypes.push('text')
            }
            return 'text';
        }
    }

    isEmailValid(email: string): boolean {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }


    isDateValid(dateString: string) {
        if (dateString) {
            const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(([+-]\d{2}:\d{2})|Z)?$/;
            let res = false;
            if (dateString.length < 8) {
                return false;
            }
            const date = new Date(dateString);
            if (dateRegex.test(dateString)) {
                res = true;
            }

            return res;
        }

        return false;

    }


    formatDataTable() {
        this.pageRows = this.rows;
        if (this.definition) {
            let total = Math.ceil(this.rows.length / 15);
            this.totalPages = total <= 1 ? 1 : total;
            this.pageRows = this.rows.slice(0, 15);
        }
        this.cdRef.detectChanges();
    }


    // getHttpData() {
    //     let objectMapper: LvObjectReader;
    //     if (this.requestType === RequestType.POST) {
    //         this.http.post(this.url, this.data, this.httpOptions)
    //             .subscribe({
    //                 next: (res) => {
    //                     objectMapper = new LvObjectReader(res);
    //                     this.headers = objectMapper.getHeadersForTable();
    //                     this.httpData = objectMapper.getRowsForTable();
    //                     this.formatDataTable(); // llamada aquí
    //                 },
    //                 error: (err) => {
    //                     let error = new HttpErrorResponse(err)
    // let errorText = '';
    // for (let key in error.error.errors) {
    //     errorText += `${key}: ${error.error.errors[key]}\n`;
    // }
    // this.modalService.showModal(ModalType.ERROR, 'Error', errorText, this.viewRef);
    //                 }
    //             });
    //     }
    //     if (this.requestType === RequestType.GET) {
    //         this.http.get(this.url).subscribe(data => {
    //             objectMapper = new LvObjectReader(data);
    //             this.headers = objectMapper.getHeadersForTable();
    //             this.httpData = objectMapper.getRowsForTable();
    //             this.formatDataTable(); // llamada aquí
    //         });
    //     }
    // }

    modifyData() {
        if (this.definition) {
            if (this.newRowChanges.length > 0) {
                let formattedData = this.newRowChanges.map((row: any) => {
                    return Object.values(row) as any[];
                });
                this.rows = [...this.rows, ...formattedData]
            }
            if(this.modifiedData.length > 0){
                this.rows = [...this.rows, ...this.modifiedData];
            }
            this.modalService.showModal(ModalType.SUCCESS, 'Información sobre la operación', 'Se han guardado los datos correctamente', this.viewRef);
            this.updatedDataTable.emit(this.rows);
            this.getCurrentPage();
        } else {
            let data;
            if (this.newRowChanges.length > 0) {
                let newChanges = this.newRowChanges.map(row => {
                    let object = { ...row }
                    return object;
                });
                this.requestNew(newChanges);
            }
            if(this.modifiedData.length > 0){
                data = [...this.modifiedData];
                this.requestModify(data);
            }
            this.requestPage();
        }
        this.newRows = [];
        this.newRowChanges = [];
        this.isDirty = false;
    }

    requestModify(data: any) {
        this.http.put(this.url, data, HTTP_OPTIONS)
            .subscribe({
                next: (res: any) => {
                    this.modalService.showModal(ModalType.SUCCESS, 'Información sobre la operación', 'Se han modificado los datos', this.viewRef);
                },
                error: (err) => {
                    let response = new HttpErrorResponse(err);
                    let errorText = '';
                    let index = 1;

                    if (response.status === 200) {
                        this.modalService.showModal(ModalType.SUCCESS, 'Información sobre la operación', 'Se han modificado los datos', this.viewRef);
                    } else {
                        for (let message in response.error.errors) {
                            errorText += `${index}: ${response.error.errors[message]}\n`;
                            index++;
                        }

                        this.modalService.showModal(ModalType.ERROR, 'Error', errorText, this.viewRef);
                    }
                }
            });
        this.modifiedData = [];
    }

    requestNew(data: any){
        this.http.post(this.url, data, HTTP_OPTIONS).subscribe({
            next: (res: any) => {
                this.modalService.showModal(ModalType.SUCCESS, 'Información sobre la operación', 'Se han añadido los datos', this.viewRef);
            },
            error: (err) => {
                let response = new HttpErrorResponse(err);
                let errorText = '';
                let index = 1;

                if (response.status === 200) {
                    this.modalService.showModal(ModalType.SUCCESS, 'Información sobre la operación', 'Se han añadido los datos', this.viewRef);
                } else {
                    for (let message in response.error.errors) {
                        errorText += `${index}: ${response.error.errors[message]}\n`;
                        index++;
                    }

                    this.modalService.showModal(ModalType.ERROR, 'Error', errorText, this.viewRef);
                }
            }
        });

        this.newRowChanges = [];
    }

    async canRemove(url: string): Promise<boolean> {
        if (this.definition) {
            return true;
        }
        const res: any = await firstValueFrom(this.http.get(url));
        return res;
    }

    updateFieldValue(event: any, row: any, fieldIndex: number, isNew?: boolean) {
        let cleanRow = { ...this.rowFormatter(row) };

        if (parseFloat(event.value) != null && parseFloat(event.value) != undefined && !isNaN(parseFloat(event.value)) && !this.isDateValid(event.value) && event.value.match(/[a-zA-Z]+/) === null) {
            cleanRow[this.headers[fieldIndex]] = parseFloat(event.value);
        } else {
            cleanRow[this.headers[fieldIndex]] = event.value;
        }

        if (isNew) {
            let finded = this.newRowChanges.find((r: any) => r.id === row.id);
            if (finded) {
                this.newRowChanges.forEach((r: any) => {
                    if (r.id === finded.id) {
                        row[this.headers[fieldIndex]] = event.value;
                        r = row;
                    }
                });
            } else {
                row[this.headers[fieldIndex]] = event.value;
                this.newRowChanges.push(row);
            }
        } else {
            let finded = this.modifiedData.find((r: any) => r.id === cleanRow.id);
            if (finded) {
                this.modifiedData.forEach((r: any) => {
                    if (r.id === finded.id) {
                        row[this.headers[fieldIndex]] = event.value;
                        r = cleanRow;
                    }
                });
            } else {
                this.modifiedData.push(cleanRow);
            }
        }

        this.isDirty = true;
    }

    rowFormatter(row: any) {
        let resRow: any = [];
        row.forEach((item: any) => {
            let index = row.indexOf(item);
            resRow[this.headers[index]] = item;
        });
        return resRow;
    }

    async deleteRow(event: any, newRow?: boolean) {
        if (newRow) {
            this.newRow = false;
            let index = this.newRows.indexOf(event);
            this.newRows.splice(index, 1);
            if (!!this.modifiedData && !!this.newRows) {
                this.isDirty = false;
            }
        } else {
            this.modalService
                .showModal(ModalType.CONFIRMATION, 'Confirmación de operación', '¿Está seguro de que desea eliminar este registro?', this.viewRef)
                .getUserResponse().subscribe(async res => {
                    if (res) {
                        this.flagDeleteUpdate = true;
                        if (this.definition) {
                            this.rows.splice(this.rows.indexOf(event), 1);
                            this.formatDataTable();
                            this.currentPage = this.currentPage > this.totalPages ? this.currentPage - 1 : this.currentPage;
                            this.getCurrentPage();
                            this.cdRef.detectChanges();
                        } else {
                            let url = this.url + '/' + event[0];
                            if (await this.canRemove(url + '/canRemove')) {
                                this.http.delete(url)
                                    .subscribe({
                                        next: (res: any) => {
                                            this.modalService.showModal(ModalType.SUCCESS, 'Se han borrado los registros', res.message, this.viewRef)
                                                .getUserResponse().subscribe((res) => {
                                                    this.requestPage();
                                                    //this.getCurrentPage();
                                                });
                                        },
                                        error: (err) => {
                                            let error: HttpErrorResponse | string = new HttpErrorResponse(err)
                                            let errorText = '';
                                            if (err) {
                                                if (error.error) {
                                                    for (let key in error.error.errors) {
                                                        errorText += `${key}: ${error.error.errors[key]}\n`;
                                                    }
                                                } else {
                                                    errorText = 'No se ha encontrado la página con url: ' + url;
                                                }
                                            } else {
                                                errorText = 'No se ha encontrado la página con url: ' + url;
                                            }

                                            this.modalService.showModal(ModalType.ERROR, 'Error', errorText, this.viewRef);
                                        }
                                    });
                            }
                        }
                    }
                });
        }
    }

    addRow() {
        this.newRowObject = [];
        this.headers.forEach(header => {
            switch (this.valueTypes[this.headers.indexOf(header)]) {
                case 'number': this.newRowObject[header] = 0;
                    break;
                case 'text': this.newRowObject[header] = ''
                    break;
                case 'date': this.newRowObject[header] = new Date();
                    break;
                case 'email': this.newRowObject[header] = '';
                    break;
            }
        });
        this.isDirty = true;
        this.newRowCleanObject = Object.values(this.newRowObject);
        this.newRows.push(this.newRowObject);
        this.newRowChanges = [...this.newRowChanges, ...this.newRowObject]
        this.newRow = true;
    }

    redirectToDetail(id: any) {
        if (this.detailUrl) {
            this.router.navigate([this.detailUrl]);
        } else {
            this.router.navigate([this.url + '/' + id]);
        }
    }

    previousPage() {
        if (this.currentPage === 1) {
            this.currentPage = this.totalPages;
        } else {
            this.currentPage--;
        }

        if (this.definition) {
            this.getCurrentPage();
        } else {
            this.requestPage();
        }

    }

    nextPage() {
        if (this.currentPage === this.totalPages) {
            this.currentPage = 1;
        } else {
            this.currentPage++;
        }

        if (this.definition) {
            this.getCurrentPage();
        } else {
            this.requestPage();
        }

    }

    getCurrentPage() {
        let second = this.currentPage * 15;
        let first = second - 15;
        let tmpArray = this.rows.slice(first, second);
        this.pageRows = tmpArray;
        //this.cdRef.detectChanges();
    }

    requestPage() {
        let objectMapper: LvObjectReader;
        try {
            if (this.currentPage) {
                this.http.get(this.url + '/page/' + this.currentPage).subscribe(data => {
                    objectMapper = new LvObjectReader(data);
                    this.headers = objectMapper.getHeadersForTable();
                    this.rows = objectMapper.getRowsForTable();
                    this.formatDataTable(); // llamada aquí
                });
            }
        } catch (error: any) {
            this.modalService.showModal(ModalType.ERROR, 'Error', error, this.viewRef);
        }
    }

    reduceOrExpand() {
        if (this.flagReduceOrExpandShow) {
            this.flagReduceOrExpandShow = false; //se expande
        } else {
            this.flagReduceOrExpandShow = true; //se contrae
        }
    }

}
