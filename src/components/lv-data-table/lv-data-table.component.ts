import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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

    headers: string[] = [];
    fields: string = '';
    rows: string[][] = [];
    httpData: any[] = [];
    tmpField: any;
    field: any;
    modifiedData: any[] = [];
    currentPage: number = 1;
    totalPages: number = 0;
    pageRows: any[][] = [];

    constructor(private http: HttpClient, private router: Router) { }


    ngOnInit(): void {
        if (this.definition) {
            this.headers = this.definition.header;
            this.rows = this.definition.rows;
            this.formatDataTable();
        } else {
            this.getHttpData();
        }
        let total = parseInt((this.rows.length / 15).toString());
        console.log(total)
        this.totalPages = total < 0 ? 1 : total;
        this.pageRows = this.rows.slice(0, 15);
    }

    getFieldType(value: any): string | void {
        if (typeof value === 'number') {
            return 'number';
        } else if (value instanceof Date || this.isDateValid(value)) {
            return 'date';
        } else {
            return 'text';
        }
    }

    isDateValid(dateString: string) {
        if (dateString.length < 8) {
            return false;
        }
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    }


    formatDataTable() {
        while (this.httpData.length > 0) {
            const row = this.httpData.shift();
            this.rows.push(row);
        }
        let total = parseInt((this.rows.length / 15).toString());
        console.log(total)
        this.totalPages = total < 0 ? 1 : total;
        this.pageRows = this.rows.slice(0, 15);
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

        this.http.put(this.url, this.modifiedData, httpOptions)
            .subscribe({
                next: (res) => {
                    alert('Se han modificado los datos: ' + res);
                },
                error: (err) => {
                    console.log(err);
                }
            });
    }

    async canRemove(url: string): Promise<boolean> {
        const res: any = await firstValueFrom(this.http.get(url));
        return res.isValid;
    }

    updateFieldValue(event: any, rowIndex: number, row: any, fieldIndex: number) {
        if (parseFloat(event.value) != null && parseFloat(event.value) != undefined && !isNaN(parseFloat(event.value)) && !this.isDateValid(event.value)) {
            row[fieldIndex] = parseFloat(event.value);
            console.log(row[fieldIndex]);
        } else {
            row[fieldIndex] = event.value;
            console.log(typeof row[fieldIndex]);
        }

        this.modifiedData[rowIndex] = {
            ...row
        };
    }

    async deleteRow(event: any) {
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
    }

    redirectToDetail() {
        this.router.navigate([this.detailUrl]);
    }

    previousPage() {
        if(this.currentPage === 1){
            this.currentPage = this.totalPages;
        }else{
            this.currentPage--;
        }
        
        let second = this.currentPage * 15;
        let first = second - 15;
        let tmpArray = this.rows.slice(first, second);
        this.pageRows = tmpArray;
        console.log(this.pageRows);
    }

    nextPage() {
        if(this.currentPage === this.totalPages){
            this.currentPage = 1;
        }else{
            this.currentPage++;
        }
        let second = this.currentPage * 15;
        let first = second - 15;
        let tmpArray = this.rows.slice(first, second);
        this.pageRows = tmpArray;
        console.log(this.pageRows);
    }

}
