import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { ILvHeaderdDefinition } from 'src/interfaces/lv-table-interfaces/lv-headers-definition.interface';
import { ILvTableDefinition } from 'src/interfaces/lv-table-interfaces/lv-table-definition.interface';
import { ILvFieldsDefinicion } from 'src/interfaces/lv-table-interfaces/lv-fields.definition-interface';

@Component({
    selector: 'app-lv-data-table',
    templateUrl: './lv-data-table.component.html',
    styleUrls: ['./lv-data-table.component.scss']
})
export class LvDataTableComponent implements OnInit, AfterViewChecked {

    /**
     * Este parámetro requiere implementar la interfaz ILvRowDefinition: [{header: ['header1', 'header2'...], fields: ['fields1', 'fields2'...]}]
     */
    @Input() definition!: ILvTableDefinition;
    /**
     * Este parámetro requiere 4 parámtros el resto serán ignorados: 
     * 1 color de las filas pares 
     * 2 color de letra de filas pares 
     * 3 color de las filas impares 
     * 4 color de letra de filas impares
     */
    @Input() rowColor: string[] = [];
    /**
     * Color de los header 1 color del header 2 color de la letra
     */
    @Input() headerColor: string[] = [];
    public selectorHeader: string = '';
    public selector: string = '';
    public headers: string[] = [];
    public fields: string[] = [];
    public entries: string [][] = [];

    constructor() { }

    ngAfterViewChecked(): void {

        this.headers = this.definition.header;
        this.fields = this.definition.fields;
        let rowCount = this.fields.length / this.headers.length;
        console.log(rowCount);
        for (let index = 0; index < rowCount; index++) {
            this.entries.push([...this.fields]);
        }

        this.selectorHeader = `background-color: ${this.headerColor[0]}; color: ${this.headerColor[1]}`;
        console.log(this.selectorHeader);

        const rows = document.getElementsByClassName('rows');
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i] as HTMLElement;
            // Aplica los estilos a la fila actual en función de su posición en la tabla
            if (i % 2 == 0) {
                row.style.backgroundColor = this.rowColor[0];
                row.style.color = this.rowColor[1];
            } else {
                row.style.backgroundColor = this.rowColor[2];
                row.style.color = this.rowColor[3];
            }
        }
    }

    ngOnInit() {

    }

}
