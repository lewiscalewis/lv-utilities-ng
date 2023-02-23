import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalType } from 'src/constants/lv-constans';
import { LvModalService } from 'src/services/lv-modal.service';

@Component({
    selector: 'app-lv-modal',
    templateUrl: './lv-modal.component.html',
    styleUrls: ['./lv-modal.component.scss']
})
export class LvModalComponent implements OnInit, OnDestroy {

    @Input() public modalType: ModalType = ModalType.INFORMATION;
    @Input() public headerMessage: string = '';
    @Input() public message: string = '';
    @Input() public show: boolean = false;
    @Output() public userResponse: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private modalService: LvModalService) { }

    ngOnDestroy(): void {
        
    }

    ngOnInit() {
    }

    closeModal(){
        this.ngOnDestroy();
        this.show = false;
    }

    accept(){
        this.userResponse.emit(true);
        this.closeModal();
        return true;
    }

    decline(){
        this.userResponse.emit(false);
        this.closeModal();
        return false;
    }

}
