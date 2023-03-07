import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ModalType } from 'src/constants/lv-constans';
import { LvModalService } from 'src/services/lv-modal.service';

@Component({
    selector: 'app-lv-searchBar',
    templateUrl: './lv-searchBar.component.html',
    styleUrls: ['./lv-searchBar.component.scss']
})
export class LvSearchBarComponent implements OnInit {


    @Input() url!: string;
    @Input() internalLinkUrl!: string;

    results: any[] = [];

    constructor(private http: HttpClient, private modalService: LvModalService, private viewRef: ViewContainerRef) { }

    ngOnInit() {
    }

    async search(userInput: any) {
        console.log(userInput.target.value);
        const params = new HttpParams().set('search', userInput.target.value);
        this.http.get(this.url, {params}).subscribe((data: any) => {
            this.results = data;
        });
    }  

}
