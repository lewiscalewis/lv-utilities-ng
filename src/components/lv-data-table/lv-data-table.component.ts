import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILvTableDefinition } from 'src/interfaces/lv-table-interfaces/lv-table-definition.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestType } from 'src/constants/lv-constans';
import { LvObjectReader } from 'src/middleware/lv-object-reader.middleware';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';



@Component({
    selector: 'app-lv-data-table',
    templateUrl: './lv-data-table.component.html',
    styleUrls: ['./lv-data-table.component.scss'],
})
export class LvDataTableComponent implements OnInit {

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
    modifiedData: any = [];
    currentPage: number = 1;
    totalPages: number = 0;
    pageRows: any[][] = [];
    flagFirstExecution: boolean = true;
    flagDeleteUpdate: boolean = false;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient, private router: Router) { }

    //TODO: añadir compatibilidad odata, insertar, si se ingresan datos desde el definition, devolver el array modificado tras darle a guardar;


    ngOnInit(): void {
        if (this.definition !== undefined) {
            if (!this.flagDeleteUpdate) {
                this.rows = this.definition.rows;
            }
            this.headers = this.definition.header;
            this.formatDataTable();
        } else {
            if (this.flagFirstExecution) {
                this.http.get(this.url + '/totalpages').subscribe(data => {
                    if(data){
                        let res: any = data;
                        this.totalPages = res;
                        this.flagFirstExecution = false;
                        
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

    getFieldType(value: any): string | void {
        if (typeof value === 'number') {
            return 'number';
        } else if (this.isDateValid(value) || (value instanceof Date)) {
            return 'date';
        } else {
            return 'text';
        }
    }

    isDateValid(dateString: string) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(([+-]\d{2}:\d{2})|Z)?$/;
        let res = false;
        if (dateString.length < 8) {
            return false;
        }
        const date = new Date(dateString);
        if(dateRegex.test(dateString)){
            res = true;
        }
        
        return res;
    }


    formatDataTable() {
        this.pageRows = this.rows;
        console.log(this.rows.length)
        if(this.definition){
            let total = Math.ceil(this.rows.length / 15);
            this.totalPages = total < 1 ? 1 : total;
            this.pageRows = this.rows.slice(0, 15);
        }
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
    //                     console.log(err);
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
            this.rows.forEach((row) => {
                this.modifiedData.forEach((modData: any) => {
                    if (this.rows.indexOf(row) === this.modifiedData.indexOf(modData)) {
                        row = modData;
                    }
                });
            });
            this.updatedDataTable.emit(this.rows);
        } else {
            let data = { ...this.modifiedData };
            this.http.put(this.url, data, this.httpOptions)
                .subscribe({
                    next: (res: any) => {
                        alert(res.message);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
        }
    }

    async canRemove(url: string): Promise<boolean> {
        if (this.definition) {
            return true;
        }
        const res: any = await firstValueFrom(this.http.get(url));
        return res;
    }

    updateFieldValue(event: any, rowIndex: number, row: any, fieldIndex: number) {
        this.modifiedData = this.rowFormatter(row);
        if (parseFloat(event.value) != null && parseFloat(event.value) != undefined && !isNaN(parseFloat(event.value)) && !this.isDateValid(event.value) && event.value.match(/[a-zA-Z]+/) === null) {
            this.modifiedData[this.headers[fieldIndex]] = parseFloat(event.value);
        } else {
            this.modifiedData[this.headers[fieldIndex]] = event.value;
        }
    }

    rowFormatter(row: any) {
        let resRow: any = [];
        row.forEach((item: any) => {
            let index = row.indexOf(item);
            resRow[this.headers[index]] = item;
        });
        return resRow;
    }

    async deleteRow(event: any) {
        this.flagDeleteUpdate = true;
        if (!this.definition) {
            let url = this.url + '/' + event[0];
            if (await this.canRemove(url + '/canRemove')) {
                this.http.delete(url)
                    .subscribe({
                        next: (res) => {
                            alert('Se han borrado los registros: ' + res);
                        },
                        error: (err) => {
                            console.log(err);
                        }
                    });
            }
        } else {
            this.rows.splice(this.rows.indexOf(event), 1);
            this.updatedDataTable.emit(this.rows);
        }
        this.ngOnInit();
    }

    redirectToDetail() {
        this.router.navigate([this.detailUrl]);
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
    }

    requestPage() {
        let objectMapper: LvObjectReader;
        try{
            if(this.currentPage){
                this.http.get(this.url + '/page/' + this.currentPage).subscribe(data => {
                    objectMapper = new LvObjectReader(data);
                    this.headers = objectMapper.getHeadersForTable();
                    this.rows = objectMapper.getRowsForTable();
                    this.formatDataTable(); // llamada aquí
                });
            }
        }catch(error){
            alert(error);
        }
    }

}
