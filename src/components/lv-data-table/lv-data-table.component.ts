import { Component, Input, OnInit } from '@angular/core';
import { ILvRowDefinition } from 'src/interfaces/lv-table-interfaces/lv-row-definition.interface';

@Component({
    selector: 'app-lv-data-table',
    templateUrl: './lv-data-table.component.html',
    styleUrls: ['./lv-data-table.component.scss']
})
export class LvDataTableComponent implements OnInit {

    @Input() data: ILvRowDefinition[] = [];

    constructor() { }

    ngOnInit() {
        
    }

}
