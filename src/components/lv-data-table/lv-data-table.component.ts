import { Component, Input, OnInit } from '@angular/core';
import { ILvTableDefinition } from 'src/interfaces/lv-table-interfaces/lv-table-definition.interface';

@Component({
  selector: 'app-lv-data-table',
  templateUrl: './lv-data-table.component.html',
  styleUrls: ['./lv-data-table.component.scss'],
})
export class LvDataTableComponent implements OnInit {

  @Input() definition!: ILvTableDefinition;
  @Input() rowColor: string[] = [];
  @Input() headerColor: string[] = [];

  headers: string[] = [];
  fields: string[] = [];
  rows: string[][] = [];

  constructor() { }

  ngOnInit(): void {
    this.headers = this.definition.header;
    this.fields = this.definition.fields;

    const groupSize = this.headers.length;

    while (this.fields.length > 0) {
      const row = [];
      for (let i = 0; i < groupSize; i++) {
        row.push(this.fields.shift() || '');
      }
      this.rows.push(row);
    }
  }
}
