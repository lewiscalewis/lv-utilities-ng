import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { LvSearchData } from 'src/interfaces/lv-searchBar-interfaces/lv-searchBar.interface';
import { LvObject } from 'src/models/lv-object';
import { LvModalService } from 'src/services/lv-modal.service';

@Component({
    selector: 'app-lv-searchBar',
    templateUrl: './lv-searchBar.component.html',
    styleUrls: ['./lv-searchBar.component.scss']
})
export class LvSearchBarComponent<T> implements OnInit {


    @Input() url!: string;
    @Input() rowData: LvSearchData[] = [];
    @Input() showResultList: boolean = true;
    @Input() type!: any;
    @Input() isTableMode: boolean = false;
    @Output() getResults: EventEmitter<any> = new EventEmitter();
    @Output() userInput: EventEmitter<string> = new EventEmitter();

    results: LvSearchData[] = [];
    listResult: any;
    list: any[] = [];

    constructor(private http: HttpClient, private modalService: LvModalService, private viewRef: ViewContainerRef) { }

    ngOnInit() {
    }

    async search(userInput: any) {
        this.list = [];
        if(this.isTableMode){
            this.userInput.emit(userInput);
        }
        if (this.url) {
            const params = new HttpParams().set('search', userInput.target.value);
            this.http.get(this.url, { params }).subscribe((data: any) => {
                this.results = data;
                if(this.type){
                    this.listResult = [...data];
                    this.listResult.forEach((r: any) => {
                        r = Object.assign(this.type, r);
                        let toString: string = '';
                        for(let prop in r){
                            toString = toString + ' ' + r[prop];
                        }
                        this.list.push(toString);
                    });
                }
                if(this.isTableMode){
                    this.getResults.emit(this.results);
                }
            });
        }else{
            this.results = this.rowData.filter((item: LvSearchData) => {
                item.descripcion?.includes(userInput) || 
                item.nombre?.includes(userInput)
            });
            this.getResults.emit(this.results);
        }
    }

    sendData(data: LvObject) {
        if(this.isTableMode){
            this.getResults.emit([data]);
        }else{
            this.getResults.emit(data);
        }
        this.list = [];
    }

    printObject(obj: LvObject): string {
        return obj.toString();
    }

    closeList(){
        setTimeout(()=> this.list = [], 200);
    }
      

}
