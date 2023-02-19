import { Component, Input, OnInit } from '@angular/core';
import { ILvTableDefinition } from 'src/interfaces/lv-table-interfaces/lv-table-definition.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestType } from 'src/constants/lv-constans';
import { LvObjectReader } from 'src/middleware/lv-object-reader.middleware';


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

    headers: string[] = [];
    fields: string[] = [];
    rows: string[][] = [];
    httpData: any[] = [];
    tmpField: any;
    field: any;
    modifiedData: any[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        if (this.definition) {
            this.headers = this.definition.header;
            this.fields = this.definition.fields;
            this.formatDataTable();
        } else {
            this.getHttpData();
        }
    }

    getFieldType(value: any): string {
        if (typeof value === 'number') {
            return 'number';
        } else if (value instanceof Date) {
            return 'date';
        } else {
            return 'text';
        }
    }


    formatDataTable() {
        const groupSize = this.headers.length;
        if (this.definition) {
            while (this.fields.length > 0) {
                const row = [];
                for (let i = 0; i < groupSize; i++) {
                    row.push(this.fields.shift() || '');
                }
                this.rows.push(row);
            }
        } else {
            while (this.httpData.length > 0) {
                const row = this.httpData.shift();
                this.rows.push(row);
            }
        }
    }


    getHttpData() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        let objectMapper: LvObjectReader;
        if (this.requestType === RequestType.POST) {
            this.http.post(this.url, this.data, httpOptions)
                .subscribe({
                    next: (res) => {
                        objectMapper = new LvObjectReader(res);
                        this.headers = objectMapper.getHeadersForTable();
                        this.httpData = objectMapper.getRowsForTable();
                        this.formatDataTable(); // llamada aquí
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
        }
        if (this.requestType === RequestType.GET) {
            this.http.get(this.url).subscribe(data => {
                objectMapper = new LvObjectReader(data);
                this.headers = objectMapper.getHeadersForTable();
                this.httpData = objectMapper.getRowsForTable();
                this.formatDataTable(); // llamada aquí
            });
        }
    }

    modifyData() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        console.log(this.modifiedData)
        if (this.requestType !== RequestType.DELETE) {
            this.http.put(this.url, this.modifiedData, httpOptions)
                .subscribe({
                    next: (res) => {
                        alert('Se han modificado los datos: ' + res);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });;

            // if (this.requestType === RequestType.DELETE) {
            //     this.http.delete(this.url)
            //         .subscribe({
            //             next: (res) => {
            //                 alert('Se han borrado los registros: ' + res);
            //             },
            //             error: (err) => {
            //                 console.log(err);
            //             }
            //         });
            // }
        }
    }

    // async canRemove(data: any): Promise<boolean> {
    //     let canRemove: boolean = false;
    //     this.http.get(this.url).subscribe(res => {
    //         canRemove = res;
    //     });
    //     return true;
    // }

    updateFieldValue(event: any, rowIndex: number, row: any, fieldIndex: number) {
        row[fieldIndex] = event.value;
        this.modifiedData[rowIndex] = {
            ...row
        };
    }

}
