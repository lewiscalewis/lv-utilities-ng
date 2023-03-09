import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
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

    results: LvSearchData[] = [];

    constructor(private http: HttpClient, private modalService: LvModalService, private viewRef: ViewContainerRef) { }

    ngOnInit() {
    }

    async search(userInput: any) {
        if (this.url) {
            console.log(userInput.target.value);
            const params = new HttpParams().set('search', userInput.target.value);
            this.http.get(this.url, { params }).subscribe((data: any) => {
                this.results = data;
            });
        }else{
            this.results = this.rowData.filter((item: LvSearchData) => {
                item.descripcion?.includes(userInput) || 
                item.nombre?.includes(userInput)
            });
        }
    }

}
