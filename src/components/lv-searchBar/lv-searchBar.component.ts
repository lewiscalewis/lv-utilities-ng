import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ModalType } from 'src/constants/lv-constans';
import { LvSearchData } from 'src/interfaces/lv-searchBar-interfaces/lv-searchBar.interface';
import { LvModalService } from 'src/services/lv-modal.service';

@Component({
    selector: 'app-lv-searchBar',
    templateUrl: './lv-searchBar.component.html',
    styleUrls: ['./lv-searchBar.component.scss']
})
export class LvSearchBarComponent implements OnInit {


    @Input() url!: string;
    @Input() rowData: LvSearchData[] = [];
    @Input() showResultList: boolean = true;
    @Output() getResults: EventEmitter<any[]> = new EventEmitter();
    @Output() userInput: EventEmitter<string> = new EventEmitter();

    results: LvSearchData[] = [];

    constructor(private http: HttpClient, private modalService: LvModalService, private viewRef: ViewContainerRef) { }

    ngOnInit() {
    }

    async search(userInput: any) {
        this.userInput.emit(userInput);
        if (this.url) {
            const params = new HttpParams().set('search', userInput.target.value);
            this.http.get(this.url, { params }).subscribe((data: any) => {
                this.results = data;
                this.getResults.emit(this.results);
            });
        }else{
            this.results = this.rowData.filter((item: LvSearchData) => {
                item.descripcion?.includes(userInput) || 
                item.nombre?.includes(userInput)
            });
            this.getResults.emit(this.results);
        }
    }

    sendData(data: LvSearchData) {
        this.getResults.emit([data]);
    }

}
